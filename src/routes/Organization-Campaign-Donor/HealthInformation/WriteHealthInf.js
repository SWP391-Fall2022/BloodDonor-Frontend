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
import { HealthContext } from "./OrganizationCampaignHealthInfContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { OrgBread } from "../OrganizationBreadcrumb";
const WriteHealthInf = () => {
  //Biến lưu thông qua các component
  const {
    valueStatus,
    setStatus,
    valueDonorInfor,
    setDonorInfor,
    valueHealthInfor,
    setHealthInfor,
    valueTempHealth,
    setTempInfor,
    valueState,
    setState,
    userInfor,
  } = useContext(HealthContext);
  //Lưu tạm, biến trung gian
  const [value, setValue] = useState();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setState("false");
    valueStatus.donateRegistrationResponse.status = "CHECKED_IN";
    onSubmit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
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
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const onSubmit = async (values) => {
    const formData = form.getFieldsValue(true);

    const requestData = {
      donorId: userInfor.idD,
      campaignId: userInfor.idC,
      registeredDate: userInfor.date,
      details: formData.details,
      status: true,
      bloodType: formData.bloodType,
      amount: formData.amount,
      weight: formData.weight,
    };
    
    const token = JSON.parse(sessionStorage.getItem("JWT_Key"));

    let json = {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/updateMedicalDocument`,
      json
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
      
    if (response.success) {
      navigate(
        `/organization/manageCampaign/campaign-health-inf/${userInfor.idC}/${userInfor.idD}/${userInfor.date}`
      );
      setMessage("Ghi phiếu sức khỏe thành công");
    } else {
      setMessage(response.body);
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const breadName = (
    <>
      <Link>
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Ghi phiếu sức khỏe
    </>
  );
  const layer1 = (
    <Link to={`/organization/manageCampaign`}>Quản lý chiến dịch</Link>
  );
  const layer2 = (
    <Link
      to={`/organization/manageCampaign/campaign-donorlist/${userInfor.idC}`}
    >
      Danh sách tình nguyện viên{" "}
    </Link>
  );
  return (
    <section id="write-health-inf">
      <div className="edit-news-breadcrumb">
        <OrgBread
          layer1={layer1}
          layer2={layer2}
          layer3="Ghi phiếu sức khỏe"
          name={breadName}
        />
      </div>
      <div className="content-col">
      <div className="health-form">
        <div className="health-form-title">ĐIỀN THÔNG TIN SỨC KHỎE</div>
        <div className="health-form-text">
          <b>Họ và Tên: </b> {valueDonorInfor.name}
        </div>
        <div className="health-form-text">
          <b>CMND/CCCD: </b>
          {valueDonorInfor.identityNum}
        </div>
        <div className="health-form-text">
          <b>Code: </b>
          {valueStatus.donateRegistrationResponse.code}
        </div>
        <div className="health-form-text">
          <b>Số điện thoại: </b>
          {valueDonorInfor.user.phone}
        </div>
        <div className="health-form-text">
          <b>Email: </b>
          {valueDonorInfor.user.email}
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
              // initialValue={valueTempHealth.weight}
            >
              <InputNumber
                addonAfter="kg"
                // defaultValue={valueTempHealth.weight}
              />
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
                // initialValue={valueTempHealth.bloodType}
              >
                <Select
                  placeholder="Nhóm máu của tình nguyện viện"
                  allowClear
                  // defaultValue={valueTempHealth.bloodType}
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
                rules={[
                  {
                    required: true,
                  },
                ]}
                // initialValue={valueTempHealth.amount}
              >
                <Select
                  placeholder="Lượng máu đã hiến"
                  allowClear
                  // defaultValue={valueTempHealth.amount}
                >
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
              // initialValue={valueTempHealth.details}
            >
              <Input.TextArea
              // defaultValue={valueTempHealth.details}
              />
            </Form.Item>
            <Form.Item>
              <Link to={`/organization/manageCampaign/campaign-donorlist/${userInfor.idC}`} style={{marginRight: "10px"}}>
                <Button htmlType="button">Hủy chỉnh sửa</Button>
              </Link>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Xem lại
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                    refresh="true"
                  >
                    Lưu
                  </Button>,
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
      <div>
          <div className="donor-inf">
            <img src={valueDonorInfor.avatar} />
            <div className="donor-name">{valueDonorInfor.name}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WriteHealthInf;
