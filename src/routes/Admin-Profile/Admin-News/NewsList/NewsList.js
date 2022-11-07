import { Button, Input, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./newslist.css";
const columns = [
  {
    title: "STT",
    dataIndex: "id",
  },
  {
    title: "Tên bài viết",
    dataIndex: "title",
    render: (text, record) => (
      <Link to={`/admin/view_news`} state={{ record: record }}>
        <a>{text}</a>
      </Link>
    ),
    width: "40%",
  },
  {
    title: "Tác giả",
    dataIndex: "author",
  },
  {
    title: "Ngày đăng",
    render: (_, record) => {
      return record.postingTime.substring(0, 10).split("-").reverse().join("/");
    },
  },
  {
    title: "Trạng thái",
    render: (_, record) => {
      if (record.status === true) return "Công khai";
      return "Ẩn";
    },
    width: "15%",
  },
];

const NewsList = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:8080/v1/posts", { method: "GET" })
      .then((response) => response.json())
      .then((dataApi) => {
        setData(dataApi.body.reverse());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function removeVietnameseTones(str) {
    // {console.log("Test:")}
    // {console.log(str)}
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
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
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

  const [query, setQuery] = useState("");
  const keys = ["title", "author"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) =>
        removeVietnameseTones(item[key])
          .toLowerCase()
          .includes(removeVietnameseTones(query.toLowerCase()))
      )
    );
  };

  const filterStatus = (data, status) => {
    return data.filter((item) => item.status === status);
  };
  return (
    <section id="admin-news-list">
      <div className="admin-list-title">Danh sách quản lý tin tức</div>
      <div className="admin-list-tools">
        <Input.Group className="admin-list-search" compact>
          <Input
            placeholder="Hãy điền thông tin mà bạn muốn tìm kiếm"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Input.Group>
        <Link to="/admin/create_news">
          <Button type="primary">Tạo mới</Button>
        </Link>
      </div>
      {data && (
        <div className="admin-list-table">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Tất cả" key="1">
              <Table
                columns={columns}
                dataSource={search(data)}
                size="middle"
                scroll={{ x: "100wh" }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Công khai" key="2">
              <Table
                columns={columns}
                dataSource={filterStatus(search(data), true)}
                size="middle"
                scroll={{ x: "100wh" }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Ẩn" key="3">
              <Table
                columns={columns}
                dataSource={filterStatus(search(data), false)}
                size="middle"
                scroll={{ x: "100wh" }}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </section>
  );
};
export default NewsList;
