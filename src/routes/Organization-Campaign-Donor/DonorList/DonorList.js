import { Button, Divider, Input, Radio, Table, Tabs } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./donorlist.css";
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Họ và Tên",
    dataIndex: "fullName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "CMND",
    dataIndex: "cmnd",
  },
  {
    title: "Mã xác nhận",
    dataIndex: "code",
  },
  {
    title: "Thông tin sức khỏe",
    dataIndex: "inf",
    render: (_, user) => (
      <Link to={`/organization-campaign-health-inf`}>
        <a >Bấm để xem </a>
      </Link>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
  },
];
const data = [
  {
    stt: "1",
    key: "1",
    fullName: "Nguyễn Văn A",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Đăng ký",
  },
  {
    stt: "2",
    key: "2",
    fullName: "Phạm Minh Tiến",
    cmnd: "567",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Tham gia",
  },
  {
    stt: "3",
    key: "3",
    fullName: "Đào Duy Thanh",
    cmnd: "789",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Hủy",
  },
  {
    stt: "4",
    key: "4",
    fullName: "Lê Ngọc Bảo",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Đăng ký",
  },
  {
    stt: "5",
    key: "5",
    fullName: "Từ Minh Ngọc",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Đăng ký",
  },
  {
    stt: "6",
    key: "6",
    fullName: "Hải Văn Phong",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Tham gia",
  },
  {
    stt: "7",
    key: "7",
    fullName: "Nguyễn Văn Huy",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Hủy",
  },
  {
    stt: "8",
    key: "8",
    fullName: "Huỳnh Minh Đăng",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Đăng ký",
  },
  {
    stt: "9",
    key: "9",
    fullName: "Trần Đức Tài",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Đăng ký",
  },
  {
    stt: "10",
    key: "10",
    fullName: "Đoàn Nguyễn Đức Minh",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Tham gia",
  },
  {
    stt: "11",
    key: "11",
    fullName: "Phạm Long",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Hủy",
  },
  {
    stt: "12",
    key: "12",
    fullName: "John Brown",
    cmnd: "12412341234",
    code: "2345235",
    inf: "Phiếu sức khỏe",
    state: "Đăng ký",
  },
];

// rowSelection object indicates the need for row selection

const DonorList = () => {
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
  const keys = ["fullName", "cmnd", "code"];
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
  const filterState = (data, keys) => {
    return data.filter((item) => item.state.includes(keys));
  };
  return (
    <section id="organization-donor-list">
      <div className="donor-list-title">
        Danh sách TÌNH NGUYỆN viên HIẾN MÁU
      </div>
      <div className="donor-list-search">
        <Input.Group compact>
          <Input
            placeholder="Hãy điền thông tin mà bạn muốn tìm kiếm"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Input.Group>
      </div>
      <div className="donor-list-table">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tất cả" key="1">
            <Table columns={columns} dataSource={search(data)} size="middle" scroll={{ x: "100wh" }}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đăng ký" key="2">
            <Table
              columns={columns}
              dataSource={filterState(search(data), "Đăng ký")}
              size="middle"
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tham gia" key="3">
            <Table
              columns={columns}
              dataSource={filterState(search(data), "Tham gia")}
              size="middle"
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hủy" key="4">
            <Table
              columns={columns}
              dataSource={filterState(search(data), "Hủy")}
              size="middle"
            />
          </Tabs.TabPane>
          <Tabs></Tabs>
        </Tabs>
      </div>
    </section>
  );
};
export default DonorList;
