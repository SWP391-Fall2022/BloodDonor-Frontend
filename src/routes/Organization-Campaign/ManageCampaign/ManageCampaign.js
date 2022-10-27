import React from "react";
import "antd/dist/antd.css";
import "./ManageCampaign.css";
import { Input, Table, Button, Tabs } from 'antd';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const { Search } = Input;

const onChange = (key) => {
  console.log(key);
};




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



const data = [
//   campaigns.map((camp)=>

//   )

  {
    key: '1',
    id: '1',
    camName: 'Chiến dịch 105',
    camTime: '20/9/2022 -> 20/10/2022',
    donorList: 'link',
    questions: 'link',
    status: 'Kết thúc'
  },
  {
    key: '2',
    id: '2',
    camName: 'Chiến dịch 104',
    camTime: '20/10/2022 -> 22/12/2022',
    donorList: 'link',

    questions: 'link',
    status: 'Sắp diễn ra'
  },
  {
    key: '3',
    id: '3',
    camName: 'Chiến dịch 102',
    camTime: '23/11/2022 -> 24/12/2022',
    donorList: 'link',

    questions: 'link',
    status: 'Đang diễn ra'
  },
  {
    key: '4',
    id: '4',
    camName: 'Chiến dịch 102',
    camTime: '23/11/2022 -> 24/12/2022',
    donorList: 'link',

    questions: 'link',
    status: 'Đang diễn ra'
  },
  {
    key: '5',
    id: '5',
    camName: 'Chiến dịch 102',
    camTime: '23/11/2022 -> 24/12/2022',
    donorList: 'link',

    questions: 'link',
    status: 'Đã hủy'
  },
  {
    key: '6',
    id: '6',
    camName: 'Chiến dịch 102',
    camTime: '23/11/2022 -> 24/12/2022',
    donorList: 'link',

    questions: 'link',
    status: 'Đang diễn ra'
  },
];

// filter with status

const waitingCampaign=data.filter(
  (camp) => {return camp.status.includes('Sắp diễn ra')}
)

const ongoingCamp=data.filter(
  (camp) => {return camp.status.includes('Đang diễn ra')}
)

const endedCamp=data.filter(
  (camp) => {return camp.status.includes('Kết thúc')}
)

const cancelCamp=data.filter(
  (camp) => {return camp.status.includes('Đã hủy')}
  // data.status == "Sắp diễn ra")
)
export default function ManageCampaign  (){


  // fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAll`)
  // .then(res => res.json())
  // .then(
  //   (result) => {
  //     setCampaigns(result.body);
  //     setCampaigns(
  //       result.body.map(row => ({
  //         camName: row.name,
  //         camTime: row.startDate ,
  //         donorList: "link",
  //         questions: "link",
  //         status:row.startDate
  //       }))
  //     );
     
  //   },
  //   // Note: it's important to handle errors here
  //   // instead of a catch() block so that we don't swallow
  //   // exceptions from actual bugs in components.
  //   (error) => {
     
  //     console.log(error)
  //   }
  // )

const [campaigns, setCampaigns]= useState([]);
const navigate = useNavigate();

  return(

    
  
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
          onChange={onChange}
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

                <Table columns={columns} dataSource={data}
                  pagination={{

                    pageSize: 5,
                  }}

                  onRow = {record =>({
                    onClick:(e)=>navigate("/organization/manageCampaign/detailCampaign/1")
                  })}

                />

              </>,
            },
            {
              label: `Sắp diễn ra`,
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

                <Table columns={columns} dataSource={waitingCampaign}
                  pagination={{

                    pageSize: 5,
                  }}

                  onRow = {record =>({
                    onClick:(e)=>navigate("/organization/manageCampaign/detailCampaign/2")
                  })}

                />

              </>,
            },
            {
              label: `Đang diễn ra`,
              key: '3',
              children:  <>
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

                onRow = {record =>({
                  onClick:(e)=>navigate("/organization/manageCampaign/detailCampaign/3")
                })}

              />

            </>,
            },
            {
              label: `Kết thúc`,
              key: '4',
              children:  <>
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

                onRow = {record =>({
                  onClick:(e)=>navigate("/organization/manageCampaign/detailCampaign/4")
                })}

              />

            </>,
            },
            {
              label: `Hủy`,
              key: '5',
              children:  <>
              <div className="search-buttons">
                <Search className="cam-search-box" />
                <div className="cre-del-buttons">
                  
                  <Button type="primary" danger className="cre-button" href="/organization/manageCampaign/createCampaign">
                    Tạo mới
                  </Button>


                </div>
              </div>

              <Table columns={columns} dataSource={cancelCamp}
                pagination={{

                  pageSize: 5,
                }}

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