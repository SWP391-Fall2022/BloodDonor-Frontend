import { Button, Divider, Input, Radio, Table, Tabs } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./adminnewslist.css";
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Tên bài viết",
    dataIndex: "fullName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tác giả",
    dataIndex: "cmnd",
  },
  {
    title: "Ngày đăng",
    dataIndex: "code",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
  },
];

//Hàm dùng cho hỗ trợ việc search không phân biệt dấu `.~
//*Không cần đổi thông tin gì ở đây
const AdminNewsList = () => {
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
  // Biến keys chứa các cột muốn search ra thông tin (vd: cột Họ và tên, cmnd..)
  //*Bỏ tên cột cần search dô
  const keys = ["fullName", "cmnd", "code"];

  //Hàm Lọc lấy những thông tin trùng khớp với keys
  //*Không cần đổi thông tin gì ở đây*
  const filterState = (data, keys) => {
    return data.filter((item) => item.state.includes(keys));
  };

  //Lấy thông tin từ input của search
  //*Không cần đổi thông tin gì ở đây
  const [query, setQuery] = useState("");

  //Hàm search FINAL khi trộn 77 49 trò vào
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) =>
        removeVietnameseTones(item[key])
          .toLowerCase()
          .includes(removeVietnameseTones(query.toLowerCase()))
      )
    );
  };

  return (
    <section id="admin-news-list">
      <div className="admin-list-title">
        Danh sách TÌNH NGUYỆN viên HIẾN MÁU
      </div>
      <div className="admin-list-search">
      {/*Chỗ lấy input nè, search là ra, không cần button bấm search*/}
        <Input.Group compact>
          <Input
            placeholder="Hãy điền thông tin mà bạn muốn tìm kiếm"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Input.Group>
      </div>
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
          <Tabs.TabPane tab="Đăng ký" key="2">
            <Table
              columns={columns}
              dataSource={filterState(search(data), "Đăng ký")}
              size="middle"
              scroll={{ x: "100wh" }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tham gia" key="3">
            <Table
              columns={columns}
              dataSource={filterState(search(data), "Tham gia")}
              size="middle"
              scroll={{ x: "100wh" }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hủy" key="4">
            <Table
              columns={columns}
              dataSource={filterState(search(data), "Hủy")}
              size="middle"
              scroll={{ x: "100wh" }}
            />
          </Tabs.TabPane>
          <Tabs></Tabs>
        </Tabs>
      </div>
    </section>
  );
};
export default AdminNewsList;


const data = [
  
];
