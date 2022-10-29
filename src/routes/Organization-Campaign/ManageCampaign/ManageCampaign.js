import React from "react";
import "antd/dist/antd.css";
import "./ManageCampaign.css";
import { Input, Table, Button, Tabs } from 'antd';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const { Search } = Input;

// check status of campaign to render on table
function checkCampStatus(camp) {
  const today = new Date();
  var start = new Date(camp.startDate);
  var end = new Date(camp.endDate);

  if ((start <= today && today <= end) || start > today)
    return "Đang diễn ra"
  else /*if(endDate < today)*/
    return "Kết thúc"
}


//Set columns for table
const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tên chiến dịch',
    dataIndex: 'camName',
    key: 'camName',

  },
  {
    title: 'Thời gian diễn ra',
    dataIndex: 'camTime',
    key: 'camTime',
  },
  {
    title: 'DS câu hỏi',
    dataIndex: 'questions',
    key: 'questions',
  },
  {
    title: 'DS tham gia hiến máu',
    dataIndex: 'donorList',
    key: 'donorList',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
];


export default function ManageCampaign() {
  const [tableRow, setTableRow] = useState([]);
  const [message, setMessage] = useState('')

  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState({})

  // fetch data function
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
      const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAllByOrganization`, json)
        .then((res) => res.json())
        .catch((error) => { console.log(error) })

      if (response.success) {
        console.log("response", response)
        setCampaigns(response)
        setTableRow(
          response.body.map(row => ({
            camName: row.name,
            camTime: row.startDate + " -> " + row.endDate,
            id: row.id,
            donorList: 'link',

            questions: 'link',
            status: checkCampStatus(row)
          })))
        console.log("camps", tableRow)
        // navigate("/organization/manageCampaign")
       
      }
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    asyncFn();
  }


  //call etch API function
  useEffect(() => {
    getCampFromAPI();
  }, []
  )

  // filter data for tabs with status
  const ongoingCamp = tableRow.filter(
    (camp) => { return camp.status.includes('Đang diễn ra') }
  )

  const endedCamp = tableRow.filter(
    (camp) => { return camp.status.includes('Kết thúc') }
  )

  return (

    <>
      <div id="manage-campaign-container">
        <div className="manage-campaign-header">
          <p >Quản lý chiến dịch</p>
        </div>

        <div className="manage-campaign-container">
          <p className="manage-campaign-title"> Danh sách các chiến dịch của tổ chức hiến máu</p>
          <Tabs
            className="manage-campaign-content"
            defaultActiveKey="1"
            items={[
              {
                label: `Tất cả`,
                key: '1',
                children: <>
                  <div className="search-buttons">
                    <Search className="cam-search-box" />
                    <div className="cre-del-buttons">
                      <Button type="primary" danger className="cre-button" href="/organization/manageCampaign/createCampaign">
                        Tạo mới
                      </Button>
                    </div>
                  </div>

                  <Table columns={columns} dataSource={tableRow}
                    pagination={{
                      pageSize: 5,
                    }}

                    onRow={record => ({
                      onClick: (e) => {

                        navigate(`/organization/manageCampaign/detailCampaign`, { state: { cam: campaigns, id: record.id } })
                      }

                    })}
                  />

                </>,
              },

              {
                label: `Đang diễn ra`,
                key: '2',
                children: <>
                  <div className="search-buttons">
                    <Search className="cam-search-box" />
                    <div className="cre-del-buttons">
                      <Button type="primary" danger className="cre-button" href="/organization/manageCampaign/createCampaign">
                        Tạo mới
                      </Button>
                    </div>
                  </div>

                  <Table columns={columns} dataSource={ongoingCamp}
                    pagination={{
                      pageSize: 5,
                    }}

                    onRow={record => ({
                      onClick: (e) => {

                        navigate(`/organization/manageCampaign/detailCampaign`, { state: { cam: campaigns, id: record.id } })
                      }

                    })}
                  />

                </>,
              },
              {
                label: `Kết thúc`,
                key: '3',
                children: <>
                  <div className="search-buttons">
                    <Search className="cam-search-box" />
                    <div className="cre-del-buttons">

                      <Button type="primary" danger className="cre-button" href="/organization/manageCampaign/createCampaign">
                        Tạo mới
                      </Button>
                    </div>
                  </div>

                  <Table columns={columns} dataSource={endedCamp}
                    pagination={{
                      pageSize: 5,
                    }}

                    onRow={record => ({
                      onClick: (e) => {

                        navigate(`/organization/manageCampaign/detailCampaign`, { state: { cam: campaigns, id: record.id } })
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
