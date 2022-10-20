import "./campaign.css";
import logo_1 from "../../../assets/organization-logo-1.png";
import logo_2 from "../../../assets/organization-logo-2.png";
import React, { useEffect } from "react";
import { Carousel } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos"
const Campaign = () => {
  useEffect(() => {
    Aos.init({duration: 1500});
  }, []);
  return (
    <section className="campaign">
       <Carousel autoplay draggable={true} touchThreshold={30} dots={false}>
        {/* SLIDE 2 */}
        <div>
          <h2 data-aos="slide-up">CÁC CHIẾN DỊCH ĐANG DIỄN RA Ở TP HỒ CHÍ MINH</h2>
          <div data-aos="slide-up" className="container-campaign">
            {/* ===1=== */}
            <div className="campaign-card">
              <div className="campaign-header">
                <a className="campaign-organization-name" href="#organization">
                  BV Truyền máu huyết học
                </a>
              </div>
              <div className="campaign-img-container">
                <img src={logo_1} alt="logo_1"></img>
              </div>
              <div className="campaign-card-content">
                <a href="#name" className="campaign-name">
                  Chiến dịch 104
                </a>
                <a href="#address" className="campaign-address">
                  118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
                </a>
                <div className="campaign-time">
                  Từ 15/09/2022 đến 20/10/2022{" "}
                </div>
              </div>
              <div className="campaign-card-footer">
                <div className="campaign-react">Tym</div>
                <a className="campaign-report" href="#report">
                  Báo cáo
                </a>
              </div>
            </div>
            {/* ===2=== */}
            <div className="campaign-card campaign-card-2nd">
              <div className="campaign-header">
                <a className="campaign-organization-name" href="#organization">
                  BV Truyền máu huyết học
                </a>
              </div>
              <div className="campaign-img-container">
                <img src={logo_1} alt="logo_1"></img>
              </div>
              <div className="campaign-card-content">
                <a href="#name" className="campaign-name">
                  Chiến dịch 104
                </a>
                <a href="#address" className="campaign-address">
                  118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
                </a>
                <div className="campaign-time">
                  Từ 15/09/2022 đến 20/10/2022{" "}
                </div>
              </div>
              <div className="campaign-card-footer">
                <div className="campaign-react">Tym</div>
                <a className="campaign-report" href="#report">
                  Báo cáo
                </a>
              </div>
            </div>
            {/* ===3=== */}
            <div className="campaign-card campaign-card-3rd">
              <div className="campaign-header">
                <a className="campaign-organization-name" href="#organization">
                  BV Truyền máu huyết học
                </a>
              </div>
              <div className="campaign-img-container">
                <img src={logo_1} alt="logo_1"></img>
              </div>
              <div className="campaign-card-content">
                <a href="#name" className="campaign-name">
                  Chiến dịch 104
                </a>
                <a href="#address" className="campaign-address">
                  118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
                </a>
                <div className="campaign-time">
                  Từ 15/09/2022 đến 20/10/2022{" "}
                </div>
              </div>
              <div className="campaign-card-footer">
                <div className="campaign-react">Tym</div>
                <a className="campaign-report" href="#report">
                  Báo cáo
                </a>
              </div>
            </div>
            {/* ===4=== */}
            <div className="campaign-card campaign-card-4th">
              <div className="campaign-header">
                <a className="campaign-organization-name" href="#organization">
                  BV Truyền máu huyết học
                </a>
              </div>
              <div className="campaign-img-container">
                <img src={logo_1} alt="logo_1"></img>
              </div>
              <div className="campaign-card-content">
                <a href="#name" className="campaign-name">
                  Chiến dịch 104
                </a>
                <a href="#address" className="campaign-address">
                  118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
                </a>
                <div className="campaign-time">
                  Từ 15/09/2022 đến 20/10/2022{" "}
                </div>
              </div>
              <div className="campaign-card-footer">
                <div className="campaign-react">Tym</div>
                <a className="campaign-report" href="#report">
                  Báo cáo
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* SLIDE 2 */}
        <div>
        
        <h2 data-aos="slide-up">CÁC CHIẾN DỊCH ĐANG DIỄN RA Ở HÀ NỘI</h2>
          <div data-aos="slide-up" className="container-campaign">
            {/* ===1=== */}
            <div className="campaign-card">
              <div className="campaign-header">
                <a className="campaign-organization-name" href="#organization">
                  BV Truyền máu huyết học
                </a>
              </div>
              <div className="campaign-img-container">
                <img src={logo_2} alt="logo_1"></img>
              </div>
              <div className="campaign-card-content">
                <a href="#name" className="campaign-name">
                  Chiến dịch 104
                </a>
                <a href="#address" className="campaign-address">
                  118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
                </a>
                <div className="campaign-time">
                  Từ 15/09/2022 đến 20/10/2022{" "}
                </div>
              </div>
              <div className="campaign-card-footer">
                <div className="campaign-react">Tym</div>
                <a className="campaign-report" href="#report">
                  Báo cáo
                </a>
              </div>
            </div>
            {/* ===2=== */}
            <div className="campaign-card campaign-card-2nd">
              <div className="campaign-header">
                <a className="campaign-organization-name" href="#organization">
                  BV Truyền máu huyết học
                </a>
              </div>
              <div className="campaign-img-container">
                <img src={logo_2} alt="logo_1"></img>
              </div>
              <div className="campaign-card-content">
                <a href="#name" className="campaign-name">
                  Chiến dịch 104
                </a>
                <a href="#address" className="campaign-address">
                  118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
                </a>
                <div className="campaign-time">
                  Từ 15/09/2022 đến 20/10/2022{" "}
                </div>
              </div>
              <div className="campaign-card-footer">
                <div className="campaign-react">Tym</div>
                <a className="campaign-report" href="#report">
                  Báo cáo
                </a>
              </div>
            </div>
            {/* ===3=== */}
            <div className="campaign-card campaign-card-3rd">
              <div className="campaign-header">
                <a className="campaign-organization-name" href="#organization">
                  BV Truyền máu huyết học
                </a>
              </div>
              <div className="campaign-img-container">
                <img src={logo_2} alt="logo_1"></img>
              </div>
              <div className="campaign-card-content">
                <a href="#name" className="campaign-name">
                  Chiến dịch 104
                </a>
                <a href="#address" className="campaign-address">
                  118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
                </a>
                <div className="campaign-time">
                  Từ 15/09/2022 đến 20/10/2022{" "}
                </div>
              </div>
              <div className="campaign-card-footer">
                <div className="campaign-react">Tym</div>
                <a className="campaign-report" href="#report">
                  Báo cáo
                </a>
              </div>
            </div>
            {/* ===4=== */}
            <div className="campaign-card  campaign-card-4th">
              <div className="campaign-header">
                <a className="campaign-organization-name" href="#organization">
                  BV Truyền máu huyết học
                </a>
              </div>
              <div className="campaign-img-container">
                <img src={logo_2} alt="logo_1"></img>
              </div>
              <div className="campaign-card-content">
                <a href="#name" className="campaign-name">
                  Chiến dịch 104
                </a>
                <a href="#address" className="campaign-address">
                  118 Hồng Bàng, Phường 12, Quận 5, TP.HCM
                </a>
                <div className="campaign-time">
                  Từ 15/09/2022 đến 20/10/2022{" "}
                </div>
              </div>
              <div className="campaign-card-footer">
                <div className="campaign-react">Tym</div>
                <a className="campaign-report" href="#report">
                  Báo cáo
                </a>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Campaign;
