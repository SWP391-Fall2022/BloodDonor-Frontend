import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";

import "./ManageQuestion.css";

import {  Table, Tabs } from 'antd';

function checkQuestionStatus(answer, status) {

  if (status === false)
    return "Đã xóa"
  else if (answer === "" || answer === null)
    return "Chưa trả lời"
  else
    return "Đã trả lời"


}

export default function ManageQuestion() {

  const [tableRow, setTableRow] = useState([]);

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([{}])


  // fetch data function
  function getQuestionsFromAPI() {
    const asyncFn = async () => {
      const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
      let json = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': "Bearer " + token,
        })
      }
      const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/get-by-organization`, json)
        .then((res) => res.json())
        .catch((error) => { console.log(error) })

      if (response.success) {
        console.log("response", response)
        setQuestions(response)
        console.log("question after set", questions)
        setTableRow(
          response.body.map(row => ({
            donorName: row.donorName,
            camName: row.campaignName,
            id: row.questionId,
            status: checkQuestionStatus(row.answer, row.status),
            answer: row.answer,
            question: row.question
          })))

      }

    }
    asyncFn();
  }


  //call etch API function
  useEffect(() => {
    getQuestionsFromAPI();
  }, []
  )

  const waiting = tableRow.filter(
    (camp) => { return camp.status.includes('Chưa trả lời') }
  )

  const replied = tableRow.filter(
    (camp) => { return camp.status.includes('Đã trả lời') }
  )

  const refuse = tableRow.filter(
    (camp) => { return camp.status.includes('Từ chối') }
  )

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
    // {
    //   title: 'Chi tiết',
    //   dataIndex: 'detail',
    //   key: 'detail',
    //   render: (text, record, index) => < div className="btn-wrap" >
    //     < Button

    //       onClick={
    //         (e) => {
    //           setQuestionStatus(record.status)
    //           if (record.status == `Chưa trả lời`) {
    //             navigate("/organization/manageQuestion/unReplyQuestion")
    //           } else {
    //             navigate("/organization/manageQuestion/repliedQuestion")
    //           }
    //           console.log("status:", questionStatus)
    //         }
    //       } >
    //       Chi tiết
    //     </Button>
    //   </div >
    // },
  ];


  return (


    <>
      <div id="manage-question-container">
        <div className="manage-question-header">
          <p >Quản lý hỏi đáp</p>
        </div>

        <div className="manage-question-container">
          <p className="manage-question-title">Danh sách HỎI ĐÁP</p>
          {/* <div className="search-buttons">
            <Input className="question-search-box"
              suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
              id="question-search-box" 
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Điền tên chiến dịch bạn muốn tìm..." />


            />

          </div> */}
          <Tabs
            className="manage-question-content"
            defaultActiveKey="1"

            items={[
              {
                label: `Tất cả`,
                key: '1',
                children: <>


                  <Table columns={columns} dataSource={tableRow}
                    pagination={{

                      pageSize: 5,
                    }}

                    onRow={record => ({
                      onClick: (e) => {
                        if (record.status == `Chưa trả lời`) {
                          navigate("/organization/manageQuestion/unReplyQuestion", { state: { question: record.question, id: record.id } })
                        } else {
                          navigate("/organization/manageQuestion/repliedQuestion", { state: { question: record.question, answer: record.answer, id: record.id } })
                        }
                      }

                    })}


                  />

                </>,
              },
              {
                label: `Chưa trả lời`,
                key: '2',
                children: <>


                  <Table columns={columns} dataSource={waiting}
                    pagination={{

                      pageSize: 5,
                    }}

                    onRow={record => ({
                      onClick: (e) => {
                        if (record.status == `Chưa trả lời`) {
                          navigate("/organization/manageQuestion/unReplyQuestion", { state: { question: record.question, id: record.id } })
                        } else {
                          navigate("/organization/manageQuestion/repliedQuestion", { state: { question: record.question, answer: record.answer, id: record.id } })
                        }
                      }

                    })}

                  />

                </>,
              },
              {
                label: `Đã trả lời`,
                key: '3',
                children: <>


                  <Table columns={columns} dataSource={replied}
                    pagination={{

                      pageSize: 5,
                    }}


                    onRow={record => ({
                      onClick: (e) => {
                        if (record.status == `Chưa trả lời`) {
                          navigate("/organization/manageQuestion/unReplyQuestion", { state: { question: record.question, id: record.id } })
                        } else {
                          navigate("/organization/manageQuestion/repliedQuestion", { state: { question: record.question, answer: record.answer, id: record.id } })
                        }
                      }

                    })}

                  />

                </>,
              },
              {
                label: `Từ chối`,
                key: '4',
                children: <>

                  <Table columns={columns} dataSource={refuse}
                    pagination={{

                      pageSize: 5,
                    }}


                    onRow={record => ({
                      onClick: (e) => {
                        if (record.status == `Chưa trả lời`) {
                          navigate("/organization/manageQuestion/unReplyQuestion", { state: { question: record.question, id: record.id } })
                        } else {
                          navigate("/organization/manageQuestion/repliedQuestion", { state: { question: record.question, answer: record.answer, id: record.id } })
                        }
                      }

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