import { useEffect, useState } from "react";
import "./welcomepage.css";
import img_1 from "../../../../src/assets/homepage-organization-blood-bag-wink-1-eye.png";
const WelcomePage = ({ campaigns, participated, bloodAmount }) => {
    const [now, setNow] = useState()
    const getRealTime = () => {
        setNow(new Date().getTime());
    }
    useEffect(() => {
        setInterval(() => getRealTime(), 1000);
    }, []);
  // fetch data function
  const filterStatus = (data, key) => {
    return data.filter((item) => item.donateRegistrationResponse.status === key)
      .length;
  };
  const countDown = () => {
    // Get today's date and time
    const endDate = new Date(campaigns[0].endDate).getTime() - now;
    // console.log("TEST: ", endDate)
    // console.log("Now: ", now)

    // Time calculations for days, hours, minutes and seconds
    // const weeks = Math.floor(endDate / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(endDate/ (1000 * 60 * 60 * 24));
    const hours = Math.floor((endDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((endDate % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((endDate % (1000 * 60)) / 1000);
    return <h3>Còn {days} ngày - {hours} giờ : {minutes} phút : {seconds} giây</h3>
    //   days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
  };
  const [time, setTime] = useState("");
  return (
    <>
      {campaigns.length > 0 && participated.length >= 0 ? (
        <section id="welcomePageWithCampaign">
          <div>
            <h2>{campaigns[0].name} đang diễn ra</h2>
            {countDown()}
            <div className="welcome-box-container">
              <div className="welcome-box">
                <h4>Đăng ký</h4>
                <div className="amount">
                  {filterStatus(participated, "CHECKED_IN")}
                </div>
              </div>
              <div className="welcome-box">
                <h4>Tham gia</h4>
                <div className="amount">
                  {filterStatus(participated, "NOT_CHECKED_IN")}
                </div>
              </div>
              <div className="welcome-box">
                <h4>Lượng máu</h4>
                <div className="amount">{bloodAmount * 0.001}l</div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section id="welcomePageWithNoCampaign">
          <div className="welcome-content">
            <h2>Chào mừng trở lại</h2>
            <h5 style={{ width: "100%" }}>
              Hiện không có chiến dịch nào. Hãy kiểm tra xem còn công việc nào
              chưa xử lý nhé.
            </h5>
            <div className="welcome-box-container">
              <div className="welcome-box">
                <h4>Hỏi đáp</h4>
                <div className="amount">102</div>
              </div>
              <div className="welcome-box">
                <h4>Tin nhắn</h4>
                <div className="amount">102</div>
              </div>
            </div>
          </div>
          <div className="welcome-img">
            <img src={img_1} alt="BloodBagWink"></img>
          </div>
        </section>
      )}
    </>
  );
};
export default WelcomePage;
