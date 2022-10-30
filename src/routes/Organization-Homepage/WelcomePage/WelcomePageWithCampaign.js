import "./welcomepagewithcampaign.css"
const WelcomePageWithCampaign = () => {
  return (
    <section id="welcomePageWithCampaign">
      <h2>Chiến dịch 103 đang diễn ra</h2>
      <h3>Còn 3 ngày 10 tiếng</h3>
      <div className="welcome-box-container">
        <div className="welcome-box">
          <h4>Đăng ký</h4>
          <div className="amount">102</div>
        </div>
        <div className="welcome-box">
          <h4>Tham gia</h4>
          <div className="amount">102</div>
        </div>
        <div className="welcome-box">
          <h4>Lượng máu</h4>
          <div className="amount">102l</div>
        </div>
      </div>
    </section>
  );
};
export default WelcomePageWithCampaign;
