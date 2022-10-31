import "./campaignstatistical.css";
import LineChart from "./Chart/LineChart";
import DoughnutChart from "./Chart/DoughnutChart";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
const CampaignStatistical = () => {
  return (
    <section id="campaign-statistical">
      <h1>header</h1>
      <div className="statistical-col">
        <div className="statistical-left">
          <div className="statistical-title">Tổng kết chiến dịch</div>
          <div className="statistical-list">
            <div className="statistical-card">
              <div className="card-col">
                <div className="card-number">
                  <Diversity2Icon />
                  200
                </div>
              </div>

              <div className="card-content">
                Tình nguyện viên tham gia hiến máu
              </div>
            </div>
            <div className="statistical-card">
              <div className="card-col">
                <div className="card-number">
                  <BloodtypeIcon />
                  200
                </div>
              </div>
              <div className="card-content">Lít máu đã được hiến tặng</div>
            </div>
            <div className="statistical-card">
              <div className="card-col">
                <div className="card-number">
                  <HelpCenterIcon />
                  200
                </div>
              </div>
              <div className="card-content">
                Câu hỏi đã được giải đáp thắc mắc
              </div>
            </div>
            <div className="statistical-card">
              <div className="card-col">
                <div className="card-number">
                  <FavoriteIcon />
                  200
                </div>
              </div>
              <div className="card-content">
                Lượt yêu thích
              </div>
            </div>
          </div>
        </div>
        <div className="statistical-right">
          <div className="chart-card">
            <div className="chart-title">Thống kê số tình nguyện viên</div>
            <div style={{ width: "100%", padding: "1% 5%" }}>
              <LineChart />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-title">
              Thống kê lượng máu từng loại
            </div>
            <div
              style={{ width: "85%", marginLeft: "7.5%", paddingTop: "3% " }}
            >
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CampaignStatistical;
