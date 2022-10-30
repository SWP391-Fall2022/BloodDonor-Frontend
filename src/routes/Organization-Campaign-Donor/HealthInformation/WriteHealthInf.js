import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
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
    setValue({
      ...valueForm,
      ...values,
    });
    showModal();
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
        <div className="health-form-title">THÔNG TIN SỨC KHỎE</div>
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
              label="Tình trạng"
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

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
            >
              <InputNumber addonAfter="kg" />
            </Form.Item>
            <div className="health-group-input">
              <Form.Item
                name="bloodGroup"
                label="Nhóm máu"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Nhóm máu của tình nguyện viện" allowClear>
                  <Option value="O">Nhóm máu O</Option>
                  <Option value="A">Nhóm máu A</Option>
                  <Option value="B">Nhóm máu B</Option>
                  <Option value="AB">Nhóm máu AB</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="amountOfBlood"
                label="Lượng máu"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Lượng máu đã hiến" allowClear>
                  <Option value="250ml">250ml</Option>
                  <Option value="300ml">300ml</Option>
                  <Option value="350ml">350ml</Option>
                  <Option value="400ml">400ml</Option>
                  <Option value="450ml">450ml</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              label="Chi tiết sức khỏe"
              name="detail"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
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
                  <NavLink end to="/organization-campaign-health-inf">
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
