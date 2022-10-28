import { Divider, Radio, Table, Tabs } from "antd";
import React, { useState } from "react";
import "./donorlist.css"
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

const DonorListCancel = () => {
  return (
    <section>
      <div >
      
      <Table columns={columns} dataSource={data}  size="middle"/>
      </div>
    </section>
  );
};
export default DonorListCancel;
