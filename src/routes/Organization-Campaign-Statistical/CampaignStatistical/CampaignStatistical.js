import "./campaignstatistical.css";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useState } from "react";
import { OrgBread } from "../../Organization-Campaign-Donor/OrganizationBreadcrumb";
import DoughnutChartBloodType from "./Chart/DoughnutChartBloodtype";
import DoughnutChartGender from "./Chart/DoughnutChartGender";
import DoughnutChartAge from "./Chart/DoughnutChartAge";
const CampaignStatistical = () => {
  const campaign = useParams();
  const breadName = (
    <>
      <Link>
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Thống kê chiến dịch
    </>
  );
  const layer1 = "Quản lý chiến dịch"
  const layer2 = "Chi tiết chiến dịch"

  const token = JSON.parse(sessionStorage.getItem("JWT_Key"));
  const [campaigns, setCampaigns] = useState({});
  const [bloodAmount, setBloodAmount] = useState(0);
  const [participated, setParticipated] = useState([]);
  const [question, setQuestion] = useState([]);
  const [donorInfo, setDonorInfo] = useState();
  const [render, setRender] = useState(false);

  function getBloodAmountFromAPI() {
    const asyncFn = async () => {
      let json = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getTotalBloodAmount/${campaign.id}`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });
      if (response.success) {
        setBloodAmount(response.body);
      }
    };
    asyncFn();
  }
  function getParticipatedDonorAPI() {
    const asyncFn = async () => {
      let json = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getParticipatedDonor/${campaign.id}`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });
      if (response.success) {
        setParticipated(response.body);
      }
    };
    asyncFn();
  }
  function getQuestionAPI() {
    const asyncFn = async () => {
      let json = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/question/get-by-campaign/${campaign.id}`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        setQuestion(response.body);
        console.log(response.success)
      }
    };
    asyncFn();
  }
  const [statistical, setStatistical] = useState();
  function getStatisticalAPI() {
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
        `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/statistic/${campaign.id}`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        console.log("DATE DONOR INFOR: ", response.body);
        setStatistical(response.body);
      }
    };
    asyncFn();
  }

  useEffect(() => {
    getBloodAmountFromAPI();
    getParticipatedDonorAPI();
    getQuestionAPI();
    getStatisticalAPI();
    setRender(true)
  }, []);
  const filterParticipatedStatus = (data, key) => {
    return data !== undefined ? data.filter((item) => item.donateRegistrationResponse.status === key).length : 0;
  };
  const filterQuestionStatus = (data, key) => {
    return data !== undefined ? data.filter((item) => item.status === key).length : 0;
  };
  return (
    <>
      {render ?
        <section id="campaign-statistical">
          <div className="edit-news-breadcrumb">
            <OrgBread
              layer1={layer1}
              layer2={layer2}
              layer3="Thống kê chiến dịch"
              name={breadName}
            />
          </div>
          <div className="statistical-col">
            <div className="statistical-left">
              <div className="statistical-title">Thống kê chiến dịch</div>
              {bloodAmount && participated && question && (
                <div className="statistical-list">
                  <div className="statistical-card">
                    <div className="card-col">
                      <div className="card-number">
                        <FavoriteIcon />
                        {participated.length}
                      </div>
                    </div>
                    <div className="card-content">Lượt đăng ký</div>
                  </div>
                  <div className="statistical-card">
                    <div className="card-col">
                      <div className="card-number">
                        <Diversity2Icon />
                        {filterParticipatedStatus(participated, "CHECKED_IN")}
                      </div>
                    </div>

                    <div className="card-content">Lượt tham gia</div>
                  </div>
                  <div className="statistical-card">
                    <div className="card-col">
                      <div className="card-number">
                        <BloodtypeIcon />
                        {(bloodAmount * 0.001).toFixed(2)}
                      </div>
                    </div>
                    <div className="card-content">Lít máu được hiến tặng</div>
                  </div>
                  <div className="statistical-card">
                    <div className="card-col">
                      <div className="card-number">
                        <HelpCenterIcon />
                        {filterQuestionStatus(question, true)}
                      </div>
                    </div>
                    <div className="card-content">Câu hỏi được giải đáp</div>
                  </div>
                </div>
              )}
            </div>
            <div className="statistical-right">
              {statistical && (
                <>
                  <div className="chart-card">
                    <div className="chart-title">Thống kê lượng máu từng loại</div>
                    <div
                      style={{
                        width: "85%",
                        marginLeft: "7.5%",
                        paddingTop: "3% ",
                      }}
                    >
                      <DoughnutChartBloodType dataS={statistical} />
                    </div>
                  </div>
                  <div className="chart-card">
                    <div className="chart-title">
                      Thống kê độ tuổi tham gia hiến máu
                    </div>
                    <div style={{ width: "100%", padding: "1% 5%" }}>
                      <DoughnutChartGender dataS={statistical} />
                    </div>
                  </div>
                  <div className="chart-card">
                    <div className="chart-title">
                      Thống kê giới tính tham gia hiến máu
                    </div>
                    <div style={{ width: "100%", padding: "1% 5%" }}>
                      <DoughnutChartAge dataS={statistical} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        :
        <></>
      }
    </>
  );
};
export default CampaignStatistical;
