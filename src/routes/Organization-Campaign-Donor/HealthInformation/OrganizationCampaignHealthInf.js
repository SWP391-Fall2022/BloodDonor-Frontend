import { PageHeader } from "antd";
import { SideBarforOrganization } from "../../../components/SideBar/SideBarforOrganization";
import { HealthContext } from "./OrganizationCampaignHealthInfContext";
import "./organizationcampaignhealthinf.css";
import RecheckHealthInf from "./RecheckHealthInf";
import WriteHealthInf from "./WriteHealthInf";
import { useState } from "react";
import { useMemo } from "react";
import EditHealthInf from "./EditHealthInf";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const OrganizationCampaignHealthInf = () => {
  const [valueState, setState] = useState("false");

  const userInfor = useParams();
  console.log("DONOR ID: ", userInfor.idD);
  console.log("ORG ID: ", userInfor.idC);
  console.log("DATE: ", userInfor.date);
  const [valueStatus, setStatus] = useState();
  const [valueDonorInfor, setDonorInfor] = useState();
  const [valueHealthInfor, setHealthInfor] = useState();
  const [valueTempHealth, setTempInfor] = useState();
  const [data, setData] = useState();
  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  // fetch data function
  function getDonorInforAPI() {
    const asyncFn = async () => {
      const token = JSON.parse(sessionStorage.getItem("JWT_Key"));
      console.log("Token: ", token);

      let json = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/donors/${userInfor.idD}`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        console.log("DATE DONOR INFOR: ", response.body);
        setDonorInfor(response.body);
      }
    };
    asyncFn();
  }
  function getDonorStatusAPI() {
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
        `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getParticipatedDonor/${userInfor.idC}`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        console.log("DATA DONOR STATUS: ", response.body.reverse());
        setStatus(
          response.body.reverse().find(function (item) {
            console.log("ITEM: ", item);
            return (
              item.donateRegistrationResponse.donorId == userInfor.idD &&
              item.donateRegistrationResponse.campaignId == userInfor.idC &&
              item.donateRegistrationResponse.registeredDate == userInfor.date
            );
          })
        );
      }
    };
    asyncFn();
  }
  useEffect(() => {
    getDonorStatusAPI();
    getDonorInforAPI();
  }, []);
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
        {valueStatus && valueDonorInfor && (
            <div>
              <HealthContext.Provider value={value}>
              {console.log(valueStatus)}
                {valueStatus.donateRegistrationResponse.status ===
                "NOT_CHECKED_IN" ? (
                  <WriteHealthInf />
                ) : valueState === "false" ? (
                  <RecheckHealthInf />
                ) : (
                  <EditHealthInf />
                )}
              </HealthContext.Provider>
            </div>
        )}
      </div>
    </div>
  );
  // }
};
export default OrganizationCampaignHealthInf;
