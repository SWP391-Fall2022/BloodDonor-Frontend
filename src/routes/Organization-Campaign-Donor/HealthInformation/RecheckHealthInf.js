import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import "./writehealthinf.css";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import React from "react";
import "./recheckhealthinf.css"
import { useContext } from "react";
import { FormContext } from "./OrganizationCampaignHealthInfContext";
const RecheckHealthInf = () => {
  const {valueForm} = useContext(FormContext);
  return (
    <section id="recheck-health-inf">
      <div className="health-form">
        <div className="health-form-title">THÔNG TIN SỨC KHỎE</div>
        <div className="health-form-text">
          <b>Họ và Tên: </b> {valueForm.fullName}
        </div>
        <div className="health-form-text">
          <b>CMND/CCCD: </b>{valueForm.cmnd}
        </div>
        <div className="health-form-text">
          <b>Số điện thoại: </b>{valueForm.phone}
        </div>
        <div className="health-form-text">
          <b>Email: </b>{valueForm.email}
        </div>
        <div className="health-form-text">
          <b>Nơi thường trú: </b>{valueForm.place}
        </div>
        <div className="health-form-text">
          <b>Tình trạng: </b>{valueForm.status}
        </div>
        <div className="health-form-text">
          <b>Cân nặng: </b>{valueForm.weight} kg
        </div>
        <div className="health-form-text">
          <b>Nhóm máu: </b>{valueForm.bloodGroup}
        </div>
        <div className="health-form-text">
          <b>Lượng máu: </b>{valueForm.amountOfBlood}
        </div>
        <div className="health-form-text">
          <b>Chi tiết sức khỏe: </b>{valueForm.detail}
        </div>
        <Button
                      key="submit"
                      type="primary"
                      refresh="true"
                    >
                      Chỉnh sửa
                    </Button>
      </div>
    </section>
  );
};
export default RecheckHealthInf;
