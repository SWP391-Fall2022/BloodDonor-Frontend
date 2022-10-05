import React from "react";
import styles from "../styles/homepage.css";
import moment from "moment";
import { Navbar } from "../components/navbar";
import {
  DatePicker,
  Space,
  Button,
  Collapse,
  Carousel,
  Divider,
  List,
  Typography,
} from "antd";
import img_1 from "../assets/homepage-banner-1.png";
import img_2 from "../assets/homepage-banner-2.png";
import img_3 from "../assets/homepage-banner-3.png";
import logo_1 from "../assets/organization-logo-1.png";
const { Panel } = Collapse;
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const Home = () => {
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";

  return (
    <div>
      <Navbar />
      <section className="cover">
        <div className="container-content">
          <h1>
            Đặt lịch hẹn <br />
            Hiến máu cứu người
          </h1>
          <h3>
            Với mỗi lần hiến máu bạn có thể mang lại cơ hội cứu sống 3 người.
            <br />
            Hãy cứu lấy mạng người bằng máu của mình!
          </h3>
          <div className="container-search">
            <h4>Bạn muốn đặt lịch vào khoảng thời gian nào?</h4>
            <div className="row-search">
              <Space
                direction="vertical"
                size={20}
                style={{ marginRight: "2%" }}
              >
                <RangePicker
                  defaultValue={[
                    moment("02/10/2022", dateFormat),
                    moment("02/10/2022", dateFormat),
                  ]}
                  format={dateFormat}
                />
              </Space>
              <Button type="primary">Tìm kiếm</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <Carousel autoplay draggable={true} touchThreshold={30}>
          <div>
            <img src={img_1} alt="banner_1" style={{ width: "100%" }} />
          </div>
          <div>
            <img src={img_2} alt="banner_2" style={{ width: "100%" }} />
          </div>
          <div>
            <img src={img_3} alt="banner_3" style={{ width: "100%" }} />
          </div>
        </Carousel>
      </section>
      <section className="homepage-campaign">
        <h2>CÁC CHIẾN DỊCH ĐANG DIỄN RA</h2>
        <div className="container-homepage-campaign">
          <div className="homepage-campaign-card">
            <div className="homepage-campaign-header">
              <a className="homepage-campaign-organization-name" href="#organization">
                BV Truyền máu huyết học
              </a>
            </div>
            <div className="homepage-campaign-img-container">
              <img src={logo_1} alt="logo_1"></img>
            </div>
            <div className="homepage-campaign-card-content">
              <a href="#name" className="homepage-campaign-name">
                Chiến dịch 104
              </a>
              <a href="#address" className="homepage-campaign-address">
                118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
              </a>
              <div className="homepage-campaign-time">Từ 15/09/2022 đến 20/10/2022 </div>
            </div>
            <div className="homepage-campaign-card-footer">
              <div className="homepage-campaign-react">Tym</div>
              <a className="homepage-campaign-report" href="#report">
                Báo cáo
              </a>
            </div>
          </div>
          <div className="homepage-campaign-card">
            <div className="homepage-campaign-header">
              <a className="homepage-campaign-organization-name" href="#organization">
                BV Truyền máu huyết học
              </a>
            </div>
            <div className="homepage-campaign-img-container">
              <img src={logo_1} alt="logo_1"></img>
            </div>
            <div className="homepage-campaign-card-content">
              <a href="#name" className="homepage-campaign-name">
                Chiến dịch 104
              </a>
              <a href="#address" className="homepage-campaign-address">
                118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
              </a>
              <div className="homepage-campaign-time">Từ 15/09/2022 đến 20/10/2022 </div>
            </div>
            <div className="homepage-campaign-card-footer">
              <div className="homepage-campaign-react">Tym</div>
              <a className="homepage-campaign-report" href="#report">
                Báo cáo
              </a>
            </div>
          </div>
          <div className="homepage-campaign-card">
            <div className="homepage-campaign-header">
              <a className="homepage-campaign-organization-name" href="#organization">
                BV Truyền máu huyết học
              </a>
            </div>
            <div className="homepage-campaign-img-container">
              <img src={logo_1} alt="logo_1"></img>
            </div>
            <div className="homepage-campaign-card-content">
              <a href="#name" className="homepage-campaign-name">
                Chiến dịch 104
              </a>
              <a href="#address" className="homepage-campaign-address">
                118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
              </a>
              <div className="homepage-campaign-time">Từ 15/09/2022 đến 20/10/2022 </div>
            </div>
            <div className="homepage-campaign-card-footer">
              <div className="homepage-campaign-react">Tym</div>
              <a className="homepage-campaign-report" href="#report">
                Báo cáo
              </a>
            </div>
          </div>
          <div className="homepage-campaign-card">
            <div className="homepage-campaign-header">
              <a className="homepage-campaign-organization-name" href="#organization">
                BV Truyền máu huyết học
              </a>
            </div>
            <div className="homepage-campaign-img-container">
              <img src={logo_1} alt="logo_1"></img>
            </div>
            <div className="homepage-campaign-card-content">
              <a href="#name" className="homepage-campaign-name">
                Chiến dịch 104
              </a>
              <a href="#address" className="homepage-campaign-address">
                118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
              </a>
              <div className="homepage-campaign-time">Từ 15/09/2022 đến 20/10/2022 </div>
            </div>
            <div className="homepage-campaign-card-footer">
              <div className="homepage-campaign-react">Tym</div>
              <a className="homepage-campaign-report" href="#report">
                Báo cáo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="standard">
        <h2>TIÊU CHUẨN THAM GIA HIẾN MÁU</h2>
        <div className="container-standard">
          <div className="standard-card">
            <div className="standard-bullet">1</div>
            <p>Người khỏe mạnh trong độ tuổi từ đủ 18 đến 60 tuổi</p>
          </div>
          <div className="standard-card">
            <div className="standard-bullet">2</div>
            <p>Không nghiện ma túy, rượu bia và các chất kích thích</p>
          </div>
          <div className="standard-card">
            <div className="standard-bullet">3</div>
            <p>Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần</p>
          </div>
          <div className="standard-card">
            <div className="standard-bullet">4</div>
            <p>
              Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp,
              hô hấp, dạ dày…
            </p>
          </div>
          <div className="standard-card">
            <div className="standard-bullet">5</div>
            <p>
              Chỉ số huyết sắc tố <br /> Hb ≥120g/l <br /> (Hb ≥125g/l nếu hiến
              từ 350ml trở lên)
            </p>
          </div>
          <div className="standard-card">
            <div className="standard-bullet">6</div>
            <p>
              Không mắc hay có nguy cơ lây nhiễm HIV, không bị viêm gan B, viêm
              gan C, và các virus lây qua máu.
            </p>
          </div>
          <div className="standard-card">
            <div className="standard-bullet">7</div>
            <p>
              Cân nặng: <br /> Nam ≥ 45 kg <br /> Nữ ≥ 42 kg
            </p>
          </div>
          <div className="standard-card">
            <div className="standard-bullet">8</div>
            <p>
              Kết quả test nhanh âm tính với kháng nguyên bề mặt của siêu vi B
            </p>
          </div>
          <div className="standard-card">
            <div className="standard-bullet">9</div>
            <p>Mang theo chứng minh nhân dân/hộ chiếu.</p>
          </div>
        </div>
      </section>
      <section className="advice">
        <h2>Những lời khuyên trước và sau khi hiến máu</h2>
        <div className="advice-col">
          <div className="advice-card">
            <div className="advice-bullet">1</div>
            <p>Ăn nhẹ và uống nhiều nước (300-500ml) trước khi hiến máu</p>
          </div>
          <div className="advice-card">
            <div className="advice-bullet">2</div>
            <p>
              Đè chặt miếng bông gòn cầm máu nơi kim chích 10 phút, giữ băng keo
              cá nhân trong 4-6 giờ
            </p>
          </div>
          <div className="advice-card">
            <div className="advice-bullet">3</div>
            <p>Nằm và ngồi nghỉ tại chỗ 10 phút sau khi hiến máu</p>
          </div>
          <div className="advice-card">
            <div className="advice-bullet">4</div>
            <p>
              Nằm nghỉ đầu thấp, kê chân cao nếu thấy chóng mặt, mệt, buồn nôn
            </p>
          </div>
          <div className="advice-card">
            <div className="advice-bullet">5</div>
            <p>
              {" "}
              Dùng túi chườm chuyên dụng hoặc cho đá vào khăn, chườm vết chích
              nếu bị sưng, bầm tím
            </p>
          </div>
        </div>
      </section>
      <section className="homepage-news">
        <h2>TIN TỨC</h2>
        <div className="homepage-news-container">
          <div id="homepage-news-main">
            <div className="homepage-news-img-container">
              <img
                src="https://vienhuyethoc.vn/wp-content/uploads/2022/09/295A7634-e1662781962658.jpg"
                alt="homepage-news"
              ></img>
            </div>
            <div id="homepage-news-content">
              <a className="homepage-news-title">
                Ước mơ đêm Trung thu của bệnh nhi ung thư máu
              </a>
              <div className="homepage-news-summary">
                Đạt được học bổng là niềm tự hào của mỗi em trong độ tuổi đến
                trường. Vừa phải điều trị bệnh thường xuyên, gia đình có hoàn
                cảnh khó khăn nhưng các em vẫn cố gắng từng ngày theo đuổi con
                chữ, đó thực sự là nỗ lực đáng ghi nhận.
              </div>
            </div>
          </div>
          <div id="homepage-news-list">
            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
              )}
            />
          </div>
        </div>
      </section>
      <section className="achievements">
        <h2>THÀNH TÍCH</h2>
      </section>
      <section className="q-and-a">
        <h2>THẮC MẮC THƯỜNG GẶP</h2>

        <Collapse className="q-and-a-container">
          <Panel header="Ai có thể tham gia hiến máu?" className="q-and-a-card">
            <li>
              Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của
              mình để cứu chữa người bệnh.
            </li>
            <li>
              Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến
              mỗi lần không quá 9ml/kg cân nặng và không quá 500ml mỗi lần.
            </li>
            <li>
              Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh
              lây nhiễm qua đường truyền máu khác.
            </li>
            <li>
              Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.
            </li>
            <li>Có giấy tờ tùy thân.</li>
          </Panel>
        </Collapse>
        <Collapse className="q-and-a-container">
          <Panel
            header="Ai là người không nên hiến máu?"
            className="q-and-a-card"
          >
            <li>
              Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV,
              viêm gan B, viêm gan C, và các vius lây qua đường truyền máu.
            </li>
            <li>
              Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày…
            </li>
          </Panel>
        </Collapse>
        <Collapse className="q-and-a-container">
          <Panel
            header="Máu của tôi sẽ được làm những xét nghiệm gì?"
            className="q-and-a-card"
          >
            <li>
              Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu (hệ
              ABO, hệ Rh), HIV, virus viêm gan B, virus viêm gan C, giang mai,
              sốt rét.
            </li>
            <li>
              Bạn sẽ được thông báo kết quả, được giữ kín và được tư vấn (miễn
              phí) khi phát hiện ra các bệnh nhiễm trùng nói trên.
            </li>
          </Panel>
        </Collapse>
        <Button type="secondary" style={{ marginTop: "1.5%" }}>
          Xem thêm
        </Button>
      </section>
    </div>
  );
};

export default Home;
