import { PageHeader } from "antd";
import { SideBarforOrganization } from "../../../components/SideBar/SideBarforOrganization";
import { FormContext } from "./OrganizationCampaignHealthInfContext";
import "./organizationcampaignhealthinf.css";
import RecheckHealthInf from "./RecheckHealthInf";
import WriteHealthInf from "./WriteHealthInf";
import { useState } from "react";
import { useMemo } from "react";
import EditHealthInf from "./EditHealthInf";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
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
  const donorID = useParams();
  const [user, setUser] = useState([]);
  // fetch data function
  function getDonorHealthInfFromAPI() {
    const asyncFn = async () => {
      const token = JSON.parse(sessionStorage.getItem("JWT_Key"));
      console.log("Token: ", token);

      let json = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/donors/${Number(donorID)}/donated/latest`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        console.log("TEST NEK: ",response.body)
        setUser(response.body);
       }
    };
    asyncFn();
  }
  useEffect(() => {
    getDonorHealthInfFromAPI();
     }, []);
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
            {/*status: Already filled out a health form(true) or not(false) */}
            {/*valueState: need to edit(true) or watch(false); */}
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
