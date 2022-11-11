import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";
import "./ManageQuestion.css";
import { Table, Tabs, Input, notification } from 'antd';
import { SearchOutlined } from "@ant-design/icons";


function checkQuestionStatus(answer, status) {

  if (answer === "REFUSED" && status === false)
    return "Từ chối"
  else if (status === false)
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
      if (response.status === 400) {
        notification.error({
          message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
          placement: "top"
        });
        sessionStorage.clear()
        navigate("/");
      }
      if (response.status === 200) {
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

  ];


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
      <div id="manage-question-container">
        <div className="manage-question-header">
          <p >Quản lý hỏi đáp</p>
        </div>

        <div className="manage-question-container">
          <p className="manage-question-title">Danh sách HỎI ĐÁP</p>
          <div className="search-buttons">
            <Input className="question-search-box"
              suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
              id="question-search-box"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Điền tên chiến dịch bạn muốn tìm..."


            />

          </div>
          <Tabs
            className="manage-question-content"
            defaultActiveKey="1"

            items={[
              {
                label: `Tất cả`,
                key: '1',
                children: <>


                  <Table columns={columns} dataSource={search(tableRow)}
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


                  <Table columns={columns}
                    dataSource={filterStatus(search(tableRow), 'Chưa trả lời')}
                    pagination={{

                      pageSize: 5,
                    }}

                    onRow={record => ({
                      onClick: (e) => {
                        navigate("/organization/manageQuestion/unReplyQuestion", { state: { question: record.question, id: record.id } })

                      }

                    })}

                  />

                </>,
              },
              {
                label: `Đã trả lời`,
                key: '3',
                children: <>


                  <Table columns={columns}
                    dataSource={filterStatus(search(tableRow), 'Đã trả lời')}
                    pagination={{

                      pageSize: 5,
                    }}


                    onRow={record => ({
                      onClick: (e) => {
                        navigate("/organization/manageQuestion/repliedQuestion", { state: { question: record.question, answer: record.answer, id: record.id } })

                      }

                    })}

                  />

                </>,
              },
              {
                label: `Từ chối`,
                key: '4',
                children: <>

                  <Table columns={columns}
                    dataSource={filterStatus(search(tableRow), 'Từ chối')}
                    pagination={{

                      pageSize: 5,
                    }}


                    onRow={record => ({
                      onClick: (e) => {
                        navigate("/organization/manageQuestion/repliedQuestion", { state: { question: record.question, answer: record.answer, id: record.id } })

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