import "./welcomepagewithnocampaign.css";
import img_1 from "../../../../src/assets/homepage-organization-blood-bag-wink-1-eye.png";
const WelcomePageWithNoCampaign = () => {
  return (
    <section id="welcomePageWithNoCampaign">
      <div className="welcome-content">
        <h2>Chào mừng trở lại</h2>
        <h5 style={{width:"100%"}}>
          Hiện không có chiến dịch nào. Hãy kiểm tra xem còn công việc nào chưa xử lý nhé.
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
  );
};
export default WelcomePageWithNoCampaign;
