import { PageHeader } from "antd";
import { SideBarforOrganization } from "../../../components/SideBar/SideBarforOrganization";
import { FormContext } from "./OrganizationCampaignHealthInfContext";
import "./organizationcampaignhealthinf.css";
import RecheckHealthInf from "./RecheckHealthInf";
import WriteHealthInf from "./WriteHealthInf";
import { useState } from "react";
import { useMemo } from "react";
import EditHealthInf from "./EditHealthInf";
const routes = [
  {
    path: "index",
    breadcrumbName: "Danh sách chiến dịch",
  },
  {
    path: "/organization-campaign-donorlist",
    breadcrumbName: "Danh sách quản lý tình nguyện viên",
  },
  {
    path: "/organization-campaign-health-inf",
    breadcrumbName: "Thông tin sức khỏe",
  },
];
const OrganizationCampaignHealthInf = () => {
  const user = [
    {
      stt: "1",
      fullName: "Nguyễn Văn A",
      phone: "0982123456",
      email: "nguyenvana@gmail.com",
      cmnd: "12412341234",
      code: "2345235",
      place: "123 đường 494 quận Thủ Đức, TP Hồ Chí Minh",
      weight: "70",
      bloodType: "O",
      amount: "250",
      details: "Tốt",
      status: "true",
    },
    {
      stt: "2",
      fullName: "Phạm Minh Tiến",
      phone: "0982123456",
      email: "phamminhtien@gmail.com",
      cmnd: "12412341234",
      place: "123 đường Võ Thị Sáu quận 2, TP Hồ Chí Minh",
      weight: "67",
      bloodType: "AB",
      amount: "300",
      details: "Tình nguyện viên có sức khỏe ổn định, không có bệnh nền. Không nhiễm viêm gan B.",
      status: "true",
    },
    {
      stt: "3",
      fullName: "Đào Duy Thanh",
      cmnd: "12412341234",
      email: "phamminhtien@gmail.com",
      place: "123 đường Võ Thị Sáu quận 2, TP Hồ Chí Minh",
      inf: "Phiếu sức khỏe",
      state: "Hủy",
      weight: "",
      bloodType: "",
      amount: "",
      details: "",
      status: "false",
    },
  ];
  const [valueForm, setForm] = useState(user[0]);
  const [valueState, setState] = useState("false");
  const value = useMemo(
    () => ({ valueForm, setForm, valueState, setState }),
    [valueForm, setForm, valueState, setState]
  );
  // const user = JSON.parse(sessionStorage.getItem('user'))
  // const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
  // if (user === null) {
  //     return <Navigate to={`/login`} />
  // } else if (rolePath !== "/organization") {
  //     return <Navigate to={rolePath} />
  // } else {
  return (
    <div id="organization-donorlist-col">
      <div>
        <SideBarforOrganization />
      </div>
      <div>
        <PageHeader
          breadcrumb={{ routes }}
          className="site-page-header"
          title="Thông tin sức khỏe"
        />
        <div className="content-col">
          <div>
            <FormContext.Provider value={value}>
              {valueForm.status === "false" ? (
                <WriteHealthInf />
              ) : valueState === "false" ? (
                <RecheckHealthInf />
              ) : (
                <EditHealthInf />
              )}
            </FormContext.Provider>
          </div>
          <div>
            <div className="donor-inf">
              <img src="https://i.cbc.ca/1.5359228.1577206958!/fileImage/httpImage/smudge-the-viral-cat.jpg" />
              <div className="donor-name">Nguyễn Văn A</div>
            </div>
            <div className="donor-achievement">
              <div className="donor-achievement-title">Thành tích</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // }
};
export default OrganizationCampaignHealthInf;
