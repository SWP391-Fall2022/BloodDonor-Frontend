import { Divider, Radio, Table, Tabs } from "antd";
import React, { useState } from "react";
import "./donorlist.css"
import DonorListAll from "./DonorListAll";
import DonorListCancel from "./DonorListCancel";
import DonorListJoined from "./DonorListJoined";
import DonorListRegister from "./DonorListRegister";
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
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Trạng thái",
    dataIdex: "state",
  },
];
const data = [
  {
    stt: "1",
    key: "1",
    fullName: "John Brown",
    cmnd: "12412341234",
    code: "2345235",
    inf: "New York No. 1 Lake Park",
    state:"1",
  },
  {
    stt: "1",
    key: "2",
    fullName: "John Brown",
    cmnd: "12412341234",
    code: "2345235",
    inf: "New York No. 1 Lake Park",
    state:"1",
  },
  {
    stt: "1",
    key: "3",
    fullName: "John Brown",
    cmnd: "12412341234",
    code: "2345235",
    inf: "New York No. 1 Lake Park",
    state:"1",
  },
  {
    stt: "1",
    key: "4",
    fullName: "John Brown",
    cmnd: "12412341234",
    code: "2345235",
    inf: "New York No. 1 Lake Park",
    state:"1",
  },
];

// rowSelection object indicates the need for row selection

const DonorList = () => {
  return (
    <section id="organization-donor-list">
      <div className="donor-list-title">
        Danh sách TÌNH NGUYỆN viên HIẾN MÁU
      </div>
      <div className="donor-list-table">
      <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Tất cả" key="1">
      <DonorListAll/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Đăng ký" key="2">
      <DonorListRegister/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tham gia" key="3">
      <DonorListJoined/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Hủy" key="4">
      <DonorListCancel/>
    </Tabs.TabPane>
  </Tabs>
      </div>
    </section>
  );
};
export default DonorList;
