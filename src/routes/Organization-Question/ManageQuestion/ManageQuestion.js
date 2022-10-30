import React, { useState } from "react";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";

import "./ManageQuestion.css";

import { Input, Table, Button, Tabs } from 'antd';

const { Search } = Input;

const onChange = (key) => {
  console.log(key);
};

const data = [
 

  {
    key: '1',
    id: '1',
    donorName: 'Nguyễn Văn A',

    camName: 'Chiến dịch 105',
    detail: <a href="/organization/manageQuestion/detailQuestion">Chi tiết</a>,
    status: 'Chưa trả lời'
  },
  {
    key: '2',
    id: '2',
    donorName: 'Nguyễn Văn B',

    camName: 'Chiến dịch 104',
    detail: 'link',
    status: 'Đã trả lời'
  },
  {
    key: '3',
    id: '3',
    donorName: 'Trần Thị M',

    camName: 'Chiến dịch 106',
    detail: 'link',
    status: 'Chưa trả lời'
  },
  {
    key: '4',
    id: '4',
    donorName: 'Lê Thị T',

    camName: 'Chiến dịch 101',
    detail: 'link',
    status: 'Chưa trả lời'
  },
  {
    key: '5',
    id: '5',
    donorName: 'Bùi Văn N',
    camName: 'Chiến dịch 109',
    detail: 'link',
    status: 'Đã trả lời'
  },
  {
    key: '6',
    id: '6',
    donorName: 'Nguyễn Văn A',

    camName: 'Chiến dịch 101',
    detail: 'link',
    status: 'Từ chối'
  },
];

// filter with status

const waiting = data.filter(
  (camp) => { return camp.status.includes('Chưa trả lời') }
)

const replied = data.filter(
  (camp) => { return camp.status.includes('Đã trả lời') }
)

const refuse = data.filter(
  (camp) => { return camp.status.includes('Từ chối') }
)

export default function ManageQuestion() {

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên người hỏi',
      dataIndex: 'donorName',
      key: 'donorName',
  
    },
    {
      title: 'Tên chiến dịch',
      dataIndex: 'camName',
      key: 'camName',
  
    },
    
    
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Chi tiết',
      dataIndex: 'detail',
      key: 'detail',
      render: (text, record, index) => < div className="btn-wrap" >
        < Button 
      
        onClick={
          (e) => {
            setQuestionStatus(record.status) 
            if(record.status==`Chưa trả lời`){
              navigate("/organization/manageQuestion/unReplyQuestion")
            }else{
              navigate("/organization/manageQuestion/repliedQuestion")
            }
            console.log("status:", questionStatus)
          }
        } >
          Chi tiết
        </Button>
      </div >
    },
  ];
  

  const navigate = useNavigate();

  const [questionStatus, setQuestionStatus]=useState()


  return (


    <>


      <div id="manage-question-container">
        <div className="manage-question-header">
          <p >Quản lý hỏi đáp</p>
        </div>

        <div className="manage-question-container">
          <p className="manage-question-title">Danh sách HỎI ĐÁP</p>
          <Tabs
            className="manage-question-content"
            defaultActiveKey="1"
            onChange={onChange}
            items={[
              {
                label: `Tất cả`,
                key: '1',
                children: <>
                  <div className="search-buttons">
                    <Search className="cam-search-box" />

                  </div>

                  <Table columns={columns} dataSource={data}
                    pagination={{

                      pageSize: 5,
                    }}

                    onRow={record => ({
                      onClick: (e) => console.log("e status: ", e)
                    })}


                  />

                </>,
              },
              {
                label: `Chưa trả lời`,
                key: '2',
                children: <>
                  <div className="search-buttons">
                    <Search className="cam-search-box" />

                  </div>

                  <Table columns={columns} dataSource={waiting}
                    pagination={{

                      pageSize: 5,
                    }}


                    onRow={record => ({
                      onClick: (e) => (questionStatus ==`Chưa trả lời` ? navigate("/organization/manageQuestion/detailQuestion"):navigate("/organization/manageQuestion"))
                    })}

                  />

                </>,
              },
              {
                label: `Đã trả lời`,
                key: '3',
                children: <>
                  <div className="search-buttons">
                    <Search className="cam-search-box" />

                  </div>

                  <Table columns={columns} dataSource={replied}
                    pagination={{

                      pageSize: 5,
                    }}


                    onRow={record => ({
                      onClick: (e) => navigate("/organization/manageQuestion/detailQuestion")
                    })}

                  />

                </>,
              },
              {
                label: `Từ chối`,
                key: '4',
                children: <>
                  <div className="search-buttons">
                    <Search className="cam-search-box" />

                  </div>

                  <Table columns={columns} dataSource={refuse}
                    pagination={{

                      pageSize: 5,
                    }}


                    onRow={record => ({
                      onClick: (e) => navigate("/organization/manageQuestion/detailQuestion")
                    })}

                  />

                </>,
              },

            ]}
          />
        </div>


      </div>

    </>
  );
}