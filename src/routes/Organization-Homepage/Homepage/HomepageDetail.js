import { Avatar, List, PageHeader } from "antd";
import { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import "./homepagedetail.css";
import { FooterSmall } from "../../../components/Footer/FooterSmall";
import WelcomePage from "../WelcomePage/Welcomepage";
import { Link } from "react-router-dom";
import CampaignShortcut from "../Campaign Shortcut/CampaignShortcut";
const HomepageDetail = () => {
  const token = JSON.parse(sessionStorage.getItem("JWT_Key"));
  const [campaigns, setCampaigns] = useState({});
  const [bloodAmount, setBloodAmount] = useState(0);
  const [participated, setParticipated] = useState({});
  const [question, setQuestion] = useState();
  const [donorInfo, setDonorInfo] = useState();

  function getCampFromAPI() {
    const asyncFn = async () => {
      let json = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAllByOrganization`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        setCampaigns(response.body);
        if (response.body.length > 0) {
          getBloodAmountFromAPI(response.body[0].id);
          getParticipatedDonorAPI(response.body[0].id);
        }
      }
    };
    asyncFn();
  }
  function getBloodAmountFromAPI(id) {
    const asyncFn = async () => {
      let json = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getTotalBloodAmount/${id}`,
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
  function getParticipatedDonorAPI(id) {
    const asyncFn = async () => {
      let json = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getParticipatedDonor/${id}`,
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
        `${process.env.REACT_APP_BACK_END_HOST}/v1/question/get-by-organization`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        setQuestion(response.body);
      }
    };
    asyncFn();
  }
  function getDonorAPI(id) {
    const asyncFn = async () => {
      let json = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_HOST}/v1/donors/${id}`,
        json
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      if (response.success) {
        return response.body;
      }
    };
    asyncFn();
  }
  useEffect(() => {
    getCampFromAPI();
    getQuestionAPI();
  }, []);

  return (
    <section id="homepage-detail">
      <PageHeader className="site-page-header" title="Trang chủ" />
      <WelcomePage
        campaigns={campaigns}
        participated={participated}
        bloodAmount={bloodAmount}
      />
      {/* <WelcomePageWithNoCampaign /> */}
      <div className="homepage-col-2">
        <div className="qna-shortcut">
          <h3>Câu hỏi chưa trả lời</h3>
          <List
            className="qna-list"
            itemLayout="horizontal"
            dataSource={question}
            renderItem={(item, index) => index <= 3 && (
              <Link to="/organization/manageQuestion">
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-VG14panjEo1qF__HADeQwfJXrDenepswnLnilLw7DppJlVD3QCeGr6HWjWqWPFaY4zQ&usqp=CAU" />
                    }
                    title={item.question}
                    description={item.donorName}
                  />
                </List.Item>{" "}
              </Link>
            )}
          />
        </div>
        <div>
          <CampaignShortcut campaigns={campaigns}/>
        </div>
      </div>
      <FooterSmall />
    </section>
  );
};
export default HomepageDetail;
