import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import "./writehealthinf.css";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import React from "react";
import "./recheckhealthinf.css";
import { useContext } from "react";
import { HealthContext } from "./OrganizationCampaignHealthInfContext";
import { useEffect } from "react";
import { OrgBread } from "../OrganizationBreadcrumb";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
const RecheckHealthInf = () => {
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
  const edit = () => {
    setState("true");
  };
  function getHealthInforAPI() {
    const asyncFn = async () => {
      const token = JSON.parse(sessionStorage.getItem("JWT_Key"));

      let json = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/donors/${userInfor.idD}/donated`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        
        setHealthInfor(
          response.body.reverse().find(function (item) {
            return (
              item.donorId == userInfor.idD &&
              item.campaignId == userInfor.idC &&
              item.registeredDate == userInfor.date
            );
          })
        );
      }
    };
    asyncFn();
  }
  useEffect(() => {
    getHealthInforAPI();
  }, []);
  const breadName = (
    <>
      <Link
        to={`/organization/manageCampaign/campaign-donorlist/${userInfor.idC}`}
      >
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Xem th??ng tin phi???u s???c kh???e
    </>
  );
  const layer1 = (<Link to={`/organization/manageCampaign`}>Qu???n l?? chi???n d???ch</Link>);
  const layer2 = (<Link to={`/organization/manageCampaign/campaign-donorlist/${userInfor.idC}`}>Danh s??ch t??nh nguy???n vi??n </Link>);
  return (
    <section id="recheck-health-inf">
      <div className="edit-news-breadcrumb">
        <OrgBread
          layer1={layer1}
          layer2={layer2}
          layer3="Xem th??ng tin phi???u s???c kh???e"
          name={breadName}
        />
      </div>
      <div className="content-col">
        <div className="health-form">
          {valueHealthInfor && (
            <>
              <div>
                <div className="health-form-title">TH??NG TIN S???C KH???E</div>
                <div className="health-form-text">
                  <b>H??? v?? T??n: </b> {valueDonorInfor.name}
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
                  <b>S??? ??i???n tho???i: </b>
                  {valueDonorInfor.user.phone}
                </div>
                <div className="health-form-text">
                  <b>Email: </b>
                  {valueDonorInfor.user.email}
                </div>
                <div className="health-form-text">
                  <b>C??n n???ng: </b>
                  {valueHealthInfor.weight}kg
                </div>
                <div className="health-form-text">
                  <b>Nh??m m??u: </b>
                  {valueHealthInfor.bloodType}
                </div>
                <div className="health-form-text">
                  <b>L?????ng m??u: </b>
                  {valueHealthInfor.amount}ml
                </div>
                <div className="health-form-text">
                  <b>Chi ti???t s???c kh???e: </b>
                  {valueHealthInfor.details}
                </div>
                <Button htmlType="button" onClick={edit} type="primary">
                  Ch???nh s???a
                </Button>
              </div>
            </>
          )}
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
export default RecheckHealthInf;
