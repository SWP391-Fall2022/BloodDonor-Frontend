import React from "react";
import "antd/dist/antd.min.css";
import "./ManageCampaign.css";
import { Input, Table, Button, Tabs, notification } from 'antd';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";


const { Search } = Input;

// check status of campaign to render on table
function checkCampStatus(camp) {
  const today = new Date();
  var start = new Date(camp.startDate);
  var end = new Date(camp.endDate);
  if (camp.status === false) return "Đã xóa"

  if ((start <= today && today <= end) || start > today)
    return "Đang diễn ra"
  if (end < today || end < start)// if(endDate < today)
    return "Kết thúc"

}


//Set columns for table
const columns = [
  {
    title: 'STT',
    dataIndex: 'STT',
    key: 'STT',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Tên chiến dịch',
    dataIndex: 'camName',
    key: 'camName',
    width: '30%',



  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startDate',
    key: 'startDate',
    width: '15%',
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'endDate',
    key: 'endDate',
    width: '15%',

  },
  {
    title: 'DS câu hỏi',
    dataIndex: 'questions',
    key: 'questions',
    width: '12%',

  },
  {
    title: 'DS người tham gia',
    dataIndex: 'donorList',
    key: 'donorList',
    width: '12%',

  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: '10%'

  },
];


export default function ManageCampaign() {
  const [tableRow, setTableRow] = useState([]);

  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState({})

  // fetch data function
  function getCampFromAPI() {
    const asyncFn = async () => {
      const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
      // { console.log("Token", token) }
      let json = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': "Bearer " + token,
        })
      }
      const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAllByOrganization`, json)
        .then((res) => res.json())
        .catch((error) => { console.log(error) })
      console.log(response)
      if (response.status === 400) {
        notification.error({
          message: response.body,
          placement: "top"
        });
      }
      if (response.status === 200) {
        setCampaigns(response)
        setTableRow(
          response.body.filter((obj) => obj.emergency === false)
            .map(row => ({
              camName: row.name,
              startDate: moment(row.startDate).format("DD/MM/YYYY"),
              endDate: moment(row.endDate).format("DD/MM/YYYY"),
              id: row.id,

              donorList: <Link style={{ padding: "30px 0" }} to={`/organization/manageCampaign/campaign-donorlist/${row.id}`}
                onClick={(event) => {
                  event.stopPropagation(); // prevent event to propogate to parent to have row click which is default functionality
                }
                }>Chi tiết</Link>,

              questions: <Link style={{ padding: "30px 0" }} to={`/organization/manageQuestion/campaignQuestion/${row.id}`}
                onClick={(event) => {
                  event.stopPropagation(); // prevent event to propogate to parent to have row click which is default functionality
                }}
              >Chi tiết</Link>,
              status: checkCampStatus(row)
            })))

      }

    }
    asyncFn();
  }


  //call etch API function
  useEffect(() => {
    getCampFromAPI();
  }, []
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
    return data.filter((item) =>
      keys.some((key) =>
        removeVietnameseTones(item[key])
          .toLowerCase()
          .includes(removeVietnameseTones(query.toLowerCase()))
      )
    );
  };
  const [query, setQuery] = useState("");

  const filterStatus = (data, keys) => {
    return data.filter((item) => item.status.includes(keys));
  };

  return (

    <>
      <div className="manage-campaign-header">
        <p >Quản lý chiến dịch</p>
      </div>
      <div id="manage-campaign-container">


        <div className="manage-campaign-container">
          <p className="manage-campaign-title"> Danh sách các chiến dịch của tổ chức hiến máu</p>
          <div className="search-buttons">
            <Input
              className="cam-search-box"
              suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
              id="cam-search-box"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Điền tên chiến dịch bạn muốn tìm..."
            />
            <div className="cre-del-buttons">
              <Button type="primary" className="cre-button" href="/organization/manageCampaign/createCampaign">
                Tạo mới
              </Button>
            </div>
          </div>
          <Tabs
            className="manage-campaign-content"
            defaultActiveKey="1"
            items={[
              {
                label: `Tất cả`,
                key: '1',
                children: <>


                  <Table
                    columns={columns}
                    dataSource={search([...tableRow].reverse())}
                    pagination={{
                      pageSize: 5,
                    }}
                    scroll={{ x: "100wh" }}
                    // size="middle"
                    className={"org-campaign-table"}
                    onRow={record => ({
                      onClick: (e) => {

                        navigate(`/organization/manageCampaign/detailCampaign`, { state: { cam: campaigns, id: record.id, status: record.status } })
                      }

                    })}
                  />

                </>,
              },

              {
                label: `Đang diễn ra`,
                key: '2',
                children: <>


                  <Table columns={columns}
                    dataSource={filterStatus(search([...tableRow].reverse()), 'Đang diễn ra')}
                    pagination={{
                      pageSize: 5,
                    }}
                    scroll={{ x: "100wh" }}
                    className={"org-campaign-table"}

                    onRow={record => ({
                      onClick: (e) => {

                        navigate(`/organization/manageCampaign/detailCampaign`, { state: { cam: campaigns, id: record.id, status: record.status } })
                      }

                    })}
                  />

                </>,
              },
              {
                label: `Kết thúc`,
                key: '3',
                children: <>


                  <Table columns={columns} dataSource={filterStatus(search([...tableRow].reverse()), 'Kết thúc')}
                    pagination={{
                      pageSize: 5,
                    }}
                    scroll={{ x: "100wh" }}
                    className={"org-campaign-table"}

                    onRow={record => ({
                      onClick: (e) => {

                        navigate(`/organization/manageCampaign/detailCampaign`, { state: { cam: campaigns, id: record.id, status: record.status } })
                      }

                    })}

                  />

                </>,
              }, {
                label: `Đã xóa`,
                key: '4',
                children: <>


                  <Table columns={columns} dataSource={filterStatus(search([...tableRow].reverse()), 'Đã xóa')}
                    pagination={{
                      pageSize: 5,
                    }}
                    scroll={{ x: "100wh" }}
                    className={"org-campaign-table"}

                    onRow={record => ({
                      onClick: (e) => {

                        navigate(`/organization/manageCampaign/detailCampaign`, { state: { cam: campaigns, id: record.id, status: record.status } })
                      }

                    })}

                  />

                </>,
              }
            ]}
          />
        </div>
      </div>

    </>
  );
}