import React, { useState, useEffect } from "react";
import './CampaignContainer.css';
import { FormGroup } from "@mui/material";
import 'antd/dist/antd.min.css';
import { List, DatePicker, Checkbox, Avatar, Card, Tooltip } from "antd";
import { HeartFilled, FormOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import moment from 'moment';
import { Link } from "react-router-dom";


const { RangePicker } = DatePicker;



const campaign = [
    { blood: "A" },
    { blood: "B" },
    { blood: "AB" },
    { blood: "O" }
];

const locationCampaign = [
    { province: "TP.HCM" },
    { province: "Quy Nhơn" },
    { province: "Hà Nội" },
    { province: "Đà Nẵng" },
    { province: "Cần Thơ" }
];

//disable rangepicker
const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
};



const CampaignContainer = () => {

    const [blood, setBlood] = useState([]);
    const [filteredBlood, setFilteredBlood] = useState([]);
    // console.log("filter", filteredBlood.length===0)
    console.log("filter::", filteredBlood)
    // console.log("filter type", typeof(filteredBlood))

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
                campaigns.filter(campaign =>
                    //    console.log("split",  blood.some(category => [campaign.bloodTypes].splice("-").flat())),
                    blood.some(category => String([campaign.bloodTypes]).split("-").flat().includes(category))
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
            const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
            let json = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': "Bearer " + token,
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAll`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })

            if (response.success) {
                setCampaigns(response.body.filter((camp) => {

                    if (camp.emergency === false && new Date(camp.endDate) > new Date()) {
                        return true
                    }

                }))
                var i = 1;
                setEmergencyCampaigns(response.body.filter((camp) => {

                    if (camp.emergency === true && i <= 3) {
                        i++
                        return true
                    }

                })
                )

            }

        }
        asyncFn();
    }


    //call etch API function
    useEffect(() => {
        getCampFromAPI();
    }, []
    )

    const dateList = date === undefined ? "" :
        (
            campaigns.filter(

                (campaign) => {
                    if (new Date(campaign.startDate) <= date[1] && new Date(campaign.endDate) >= date[0])
                        return true;
                }
            )
        )

    // SEARCH fnction
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(
            /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
            " "
        );
        return str;
    }
    const keys = ["camName"];
    const search = (data) => {
        return data.filter((item) => (

            removeVietnameseTones(item.name + item.organizationName)
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
                    /*Tìm thấy phần tử trùng thì thêm vào mảng kết quả*/
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


    return (

        <div className="campaign-container" id="campaign-container">
            <div className="filter-campaign-list" >

                <div className="filter-table">
                    <FormGroup>
                        <div className="filter-by-blood">
                            <p>Lọc theo nhóm máu</p>
                            {campaign.map(campaign => (
                                <div className="filter-item">
                                    <Checkbox onChange={handleChange} value={campaign.blood} id={campaign.id}> Nhóm máu {campaign.blood} </Checkbox>
                                </div>
                            ))}
                        </div>

                        <div className="filter-by-province">
                            <p>Lọc theo vị trí</p>
                            {locationCampaign.map(campaign => (
                                <div className="filter-item">
                                    <Checkbox value={campaign.province} id={campaign.id}> {campaign.province} </Checkbox>
                                </div>
                            ))}
                        </div>


                    </FormGroup>
                </div>


                <div className="search-campaign" >
                    <div className="date-seach">
                        <RangePicker
                            disabledDate={disabledDate}
                            onChange={(values) => {
                                setDate(values)
                            }}
                            format={"DD-MM-YYYY"}
                            allowClear={false}
                        />
                        <Input
                            className="cam-search"
                            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                            id="cam-search"
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Điền tên chiến dịch hoặc tổ chức bạn muốn tìm..."
                        />
                    </div>

                    <List
                        className="donor-campaign-list"
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 6,
                        }}
                        grid={{
                            gutter: 10,
                            column: 1,
                        }}
                        // dataSource={dateList === "" ? search(campaigns) : search(dateList)}
                        // dataSource={filteredBlood.length === 0 ? campaigns : filteredBlood}
                        dataSource={checkDataSrc(filteredBlood, dateList, campaigns)}

                        renderItem={(item) => (
                            <Link to={`/campaign/campaign-detail/${item.id}`}>
                                <List.Item
                                    key={item.id}

                                    extra={
                                        <img
                                            // width={272}
                                            alt="logo"
                                            src={item.images}
                                        />
                                    }
                                    actions={[
                                        <div><Tooltip title="Yêu Thích"><HeartFilled style={{ marginRight: "5px" }}></HeartFilled>100</Tooltip></div>,
                                        <div><Tooltip title="Số lượt đăng ký"><FormOutlined style={{ marginRight: "5px" }}></FormOutlined>90</Tooltip></div>,
                                        <div><Tooltip title="Số lượt tham gia"><EditOutlined style={{ marginRight: "5px" }}></EditOutlined>110</Tooltip></div>
                                    ]}

                                    style={{ background: "white", padding: "20px", paddingBottom: "10px" }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<div className="campaign-name" style={{ fontWeight: "600", overflow: "hidden" }} href={item.href}>{item.name}</div>}
                                        description={item.organizationName}
                                    />

                                    <div style={{ marginBottom: "7px" }}><strong> Nhóm máu cần hiến: </strong>{String(item.bloodTypes).replace(/-/gi, ", ")}</div>

                                    <div className="camp-address" ><strong>Địa chỉ:</strong>{item.addressDetails}</div>
                                    <div className="camp-time">Từ {moment(item.startDate).format("DD/MM/YYYY")} đến {moment(item.endDate).format("DD/MM/YYYY")}</div>
                                </List.Item>
                            </Link>



                        )}
                    />
                </div>

            </div>

            <div id="donor-emergency-campaign">
                <p className="donor-emergency-campaign-title">Thông báo khẩn cấp</p>
                <List
                    itemLayout="horizontal"

                    dataSource={emergencyCampaigns}
                    className="donor-emergency-campaign-list"

                    renderItem={(item) => (

                        <List.Item>
                            <Card title={<p>Cần gấp nhóm máu {String(item.bloodTypes).replace(/-/gi, ",")}</p>}
                                headStyle={{ background: "#b6292a", color: "white" }}
                                hoverable
                                size="small"
                                style={{
                                    width: 200,
                                }}

                            >
                                <p className="donor-emergency-campaign-org"> {item.organizationName}</p>
                                <p> {item.addressDetails}</p>

                            </Card>
                        </List.Item>

                    )}
                />

            </div>
        </div>
    );
};

export default CampaignContainer;