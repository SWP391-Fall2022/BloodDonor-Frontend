import {
  AutoComplete,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import "./writehealthinf.css";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import React from "react";
import { useContext } from "react";
import { FormContext } from "./OrganizationCampaignHealthInfContext";
import { NavLink } from "react-router-dom";
const WriteHealthInf = () => {
  // const valueForm = {
  //   stt: "1",
  //   fullName: "Nguyễn Văn A",
  //   phone: "0982123456",
  //   email: "nguyenvana@gmail.com",
  //   cmnd: "12412341234",
  //   code: "2345235",
  //   place: "123 đường 494 quận Thủ Đức, TP Hồ Chí Minh",
  //   status: "",
  //   weight: "",
  //   bloodGroup:"",
  //   amountOfBlood: "",
  //   detail: ""
  // };
  const { valueForm, setForm } = useContext(FormContext);
  const [value, setValue] = useState();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setForm(value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    values.status = "true";
    setValue({
      ...valueForm,
      ...values,
    });
    showModal();
    console.log(values);
  };
  const validateMessages = {
    required: "Bạn đang để trống ${label}",
    types: {
      number: "${label} phải là số nguyên!",
    },
    number: {
      range: "${label} phải từ ${min}kg đến ${max}kg",
    },
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <section id="write-health-inf">
      <div className="health-form">
        <div className="health-form-title">ĐIỀN THÔNG TIN SỨC KHỎE</div>
        <div className="health-form-text">
          <b>Họ và Tên: </b> {valueForm.fullName}
        </div>
        <div className="health-form-text">
          <b>CMND/CCCD: </b>
          {valueForm.cmnd}
        </div>
        <div className="health-form-text">
          <b>Số điện thoại: </b>
          {valueForm.phone}
        </div>
        <div className="health-form-text">
          <b>Email: </b>
          {valueForm.email}
        </div>
        <div className="health-form-text">
          <b>Nơi thường trú: </b>
          {valueForm.place}
        </div>
        <div className="health-form-input">
          <Form
            form={form}
            className="health-form-input"
            name="basic"
            validateMessages={validateMessages}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
                name="weight"
                label="Cân nặng"
                rules={[
                  {
                    required: true,
                    type: "number",
                    min: 42,
                    max: 150,
                  },
                ]}
                initialValue={Number(valueForm.weight)}
              >
                <InputNumber addonAfter="kg" defaultValue={valueForm.weight} />
              </Form.Item>
              <div className="health-group-input">
                <Form.Item
                  name="bloodType"
                  label="Nhóm máu"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={valueForm.bloodType}
                >
                  <Select
                    placeholder="Nhóm máu của tình nguyện viện"
                    allowClear
                    defaultValue={valueForm.bloodType}
                    addonBefore="ml"
                  >
                    <Option value="O">O</Option>
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="AB">AB</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="Lượng máu (ml)"
                  defaultValue={valueForm.amount}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Lượng máu đã hiến" allowClear addonAfter="ml" >
                    <Option value="250">250</Option>
                    <Option value="300">300</Option>
                    <Option value="350">350</Option>
                    <Option value="400">400</Option>
                    <Option value="450">450</Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item
                label="Chi tiết sức khỏe"
                name="details"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={valueForm.details}
              >
                <Input.TextArea  defaultValue={valueForm.details}/>
              </Form.Item>

            <Form.Item>
              <Button htmlType="button" onClick={onReset}>
                Xóa thông tin
              </Button>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
              <Modal
                open={isModalOpen}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Xem lại
                  </Button>,
                  <NavLink end to="/organization-donor-health-inf">
                    <Button
                      key="submit"
                      type="primary"
                      onClick={handleOk}
                      refresh="true"
                    >
                      Lưu
                    </Button>
                    ,
                  </NavLink>,
                ]}
              >
                <p>
                  Bạn có muốn kiểm tra lại thông tin trước khi lưu thông tin sức
                  khỏe không?
                </p>
              </Modal>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default WriteHealthInf;
