import React, { useState, useEffect } from "react";
import './CampaignContainer.css';
import { FormGroup } from "@mui/material";
import 'antd/dist/antd.min.css';
import { List, DatePicker, Checkbox, Card, Tooltip, notification } from "antd";
import { HeartFilled, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import moment from 'moment';
import { Link, useNavigate, useLocation } from "react-router-dom";


const { RangePicker } = DatePicker;



const campaign = [
    { blood: "A" },
    { blood: "B" },
    { blood: "AB" },
    { blood: "O" }
];

//disable rangepicker
const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
};

const CampaignContainer = () => {

    const [blood, setBlood] = useState([]);
    const [filteredBlood, setFilteredBlood] = useState([]);

    const handleChange = e => {
        if (e.target.checked) {
            setBlood([...blood, e.target.value]);

        } else {
            setBlood(blood.filter(id => id !== e.target.value));
        }
    };

  useEffect(() => {
    if (blood.length === 0) {
      setFilteredBlood(campaigns);
    } else {
      setFilteredBlood(
        campaigns.filter((campaign) =>
          blood.some((category) =>
            String([campaign.bloodTypes]).split("-").flat().includes(category)
          )
        )
      );
    }
  }, [blood]);


    //date for range picker
    const [date, setDate] = useState()

    // fetch data function
    const [campaigns, setCampaigns] = useState([])
    const [emergencyCampaigns, setEmergencyCampaigns] = useState([])


  function getCampFromAPI() {
    const asyncFn = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAll`
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });
      if (response.status === 200) {
        
        setCampaigns(
          response.body.filter((camp) => {
            if (
              camp.emergency === false &&
              new Date(camp.endDate) > new Date() &&
              camp.status === true
            ) {
              return true;
            }
          })
        );
        var i = 1;
        setEmergencyCampaigns(
          response.body.filter((camp) => {
            if (camp.emergency === true && i <= 3) {
              i++;
              return true;
            }
          })
        );
      }
    };
    asyncFn();
  }


    //call etch API function
    useEffect(() => {
        getCampFromAPI();
    }, []
    )

  // l???y date t??? datePicker filter
  const dateList =
    date === undefined
      ? ""
      : campaigns.filter((campaign) => {
          if (
            new Date(campaign.startDate) <= date[1] &&
            new Date(campaign.endDate) >= date[0]
          )
            return true;
        });

    // SEARCH fnction
    function removeVietnameseTones(str) {
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
        str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
        str = str.replace(/??|??|???|???|??/g, "i");
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
        str = str.replace(/???|??|???|???|???/g, "y");
        str = str.replace(/??/g, "d");
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
        str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
        str = str.replace(/??|??|???|???|??/g, "I");
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
        str = str.replace(/???|??|???|???|???/g, "Y");
        str = str.replace(/??/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ?? ?? ??  ??, ??, ??, ??, ??
        // Remove extra spaces
        // B??? c??c kho???ng tr???ng li???n nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // B??? d???u c??u, k?? t??? ?????c bi???t
        str = str.replace(
            /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
            " "
        );
        return str;
    }

    const search = (data) => {
        return data.filter((item) => (

            removeVietnameseTones(item.name + item.organization.name + item.addressDetails)
                .toLowerCase()
                .includes(removeVietnameseTones(query.toLowerCase()))

        )

        );
    };
    const [query, setQuery] = useState("");

    function take_duplicate_element(array, size) {
        let result = [];
        let count = 0;
        for (let i = 0; i < size - 1; ++i) {
            for (let j = i + 1; j < size; ++j) {
                if (array[i] === array[j]) {
                    /*T??m th???y ph???n t??? tr??ng th?? th??m v??o m???ng k???t qu???*/
                    result[count] = array[i];
                    ++count;
                }
            }
        }
        return result
    }

    function checkDataSrc(filter, dateList, campaigns) {
        if (dateList === "" && filter.length === 0)
            return search(campaigns)
        else if (dateList !== "" && filter.length === 0)
            return search(dateList)
        else if (filter.length !== 0 && dateList === "")
            return search(filter)
        else
            return search(take_duplicate_element(filter.concat(dateList), (filter.concat(dateList)).length))
    }

  // const data = checkDataSrc(filteredBlood, dateList, campaigns).map(
  //   (campaign, i) => ({
  //     images: campaign.images,
  //     name: campaign.name,
  //     id: campaign.id,
  //     organizationName: campaign.organization.name,
  //     description:"",
  //     registration: "", 
  //     bloodTypes: campaign.bloodTypes, 
  //     addressDetails: campaign.addressDetails ,
  //     totalLike: campaign.totalLike,
  //   })
  // );
  

  return (
    <div className="campaign-container" id="campaign-container">
      <div className="filter-campaign-list">
        <div className="filter-table">
          <FormGroup>
            <div className="filter-by-blood">
              <p>L???c theo nh??m m??u</p>
              {campaign.map((campaign) => (
                <div className="filter-item">
                  <Checkbox
                    onChange={handleChange}
                    value={campaign.blood}
                    id={campaign.id}
                  >
                    {" "}
                    Nh??m m??u {campaign.blood}{" "}
                  </Checkbox>
                </div>
              ))}
            </div>
          </FormGroup>
        </div>

        <div className="search-campaign">
          <div className="date-seach">
            <RangePicker
              disabledDate={disabledDate}
              onChange={(values) => {
                setDate(values);
              }}
              format={"DD-MM-YYYY"}
              allowClear={false}
              placeholder={["B???t ?????u", "K???t th??c"]}
            />
            <Input
              className="cam-search"
              suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
              id="cam-search"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="??i???n t??n chi???n d???ch, t??? ch???c, ?????a ??i???m b???n mu???n t??m..."
            />
          </div>

          <List
            className="donor-campaign-list"
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 6,
            }}
            grid={{
              gutter: 10,
              column: 1,
            }}
            dataSource={ checkDataSrc(filteredBlood, dateList, campaigns).reverse()}
            renderItem={(item) => (
              <>
                <List.Item
                  key={item.id}
                  extra={
                    <>
                      <Link
                        to={`/campaign/campaign-detail/${item.id}`}
                        style={{ color: "black" }}
                      >
                        <img alt="logo" src={item.images} />
                      </Link>
                    </>
                  }
                  style={{
                    background: "white",
                    padding: "20px 20px 0 20px",
                  }}
                //   actions={[
                //     <div><Tooltip title="Quan t??m"><HeartFilled style={{ marginRight: "5px" }} ></HeartFilled>{item.totalLike}</Tooltip></div>,
                //     <div><Tooltip title="????ng k??"><FormOutlined style={{ marginRight: "5px" }}></FormOutlined></Tooltip></div>,
                // ]}
                >
                  <Link
                    to={`/campaign/campaign-detail/${item.id}`}
                    style={{ color: "black" }}
                  >
                    <List.Item.Meta
                      title={
                        <div
                          className="campaign-name"
                          style={{ fontWeight: "600", overflow: "hidden" }}
                          href={item.href}
                        >
                          {item.name}
                        </div>
                      }
                      description={item.organization !== undefined? item.organization.name :""}
                     
                    />
                    <div className="camp-bloodTypes" >
                      <strong> Nh??m m??u c???n hi???n: </strong>
                      {String(item.bloodTypes).replace(/-/gi, ", ")}
                    </div>
                    <div className="camp-address">
                      <strong>?????a ch???:</strong>
                      {item.addressDetails}
                    </div>
                    <div className="camp-time">
                      T??? {moment(item.startDate).format("DD/MM/YYYY")} ?????n{" "}
                      {moment(item.endDate).format("DD/MM/YYYY")}
                    </div>
                   
                    
                  </Link>
                </List.Item>
              </>
            )}
          />
        </div>
      </div>

      <div id="donor-emergency-campaign">
        <p className="donor-emergency-campaign-title">Th??ng b??o kh???n c???p</p>
        <List
          itemLayout="horizontal"
          dataSource={emergencyCampaigns}
          className="donor-emergency-campaign-list"
          renderItem={(item) => (
            <Link to={`/campaign/campaign-detail/${item.id}`}>
              <List.Item>
                <Card
                  title={
                    <p>
                      C???n g???p nh??m m??u{" "}
                      {String(item.bloodTypes).replace(/-/gi, ",")}
                    </p>
                  }
                  headStyle={{ background: "#b6292a", color: "white" }}
                  hoverable
                  size="small"
                  style={{
                    width: 200,
                  }}
                >
                  <p className="donor-emergency-campaign-org">
                   
                    {item.organization.name}
                  </p>
                  <p> {item.addressDetails}</p>
                </Card>
              </List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  );
};

export default CampaignContainer;
