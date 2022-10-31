import { Carousel } from "antd";
import React from "react";
import "./achievement.css";
const height_col1 = 20;
const height_col2 = 60;
const height_col3 = 100;
const height_col4 = 80;
const height_col5 = 40;
const Achievements = () => {
  return (
    <section className="achievements">
      <Carousel
        className="achievement-carousel"
        autoplay
        draggable={true}
        touchThreshold={30}
        dots={false}
      >
        <div>
          <h2>Tình nguyện viên hiến máu nhiều lần nhất</h2>
          <div className="achievement-list">
            <div className="achievement-card place-1st">
              <div className="achievement-chart">
                <img
                  src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">
                  Nguyen Thi Huynh Hoang Nhi
                </div>
              </div>
            </div>
            <div className="achievement-card place-2nd">
              <div className="achievement-chart">
                {" "}
                <img
                  src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Nguyễn Văn A</div>
              </div>
            </div>
            <div className="achievement-card place-3rd">
              <div className="achievement-chart">
                <img
                  src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Nguyễn Văn A</div>
              </div>
            </div>
            <div className="achievement-card place-4th">
              <div className="achievement-chart">
                <img
                  src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Nguyễn Văn A</div>
              </div>
            </div>
            <div className="achievement-card place-5th">
              <div className="achievement-chart">
                <img
                  src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Nguyễn Văn A</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>Tỉnh thành có tình nguyện viên tham gia nhiều nhất</h2>
          <div className="achievement-list">
            <div className="achievement-card place-1st">
              <div className="achievement-chart">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">
                  TP Hồ Chí Minh
                </div>
              </div>
            </div>
            <div className="achievement-card place-2nd">
              <div className="achievement-chart">
                {" "}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Hà Nội</div>
              </div>
            </div>
            <div className="achievement-card place-3rd">
              <div className="achievement-chart">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Đà Nẳng</div>
              </div>
            </div>
            <div className="achievement-card place-4th">
              <div className="achievement-chart">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Cần Thơ</div>
              </div>
            </div>
            <div className="achievement-card place-5th">
              <div className="achievement-chart">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Quy Nhơn</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>Bệnh viện có tỉ lệ tình nguyện viên tham gia nhiều nhất</h2>
          <div className="achievement-list">
            <div className="achievement-card place-1st">
              <div className="achievement-chart">
                <img
                  src="https://yt3.ggpht.com/ytc/AMLnZu8RlIUD9HkJCociWdwToKC-Rj1mKfC1drCVprFFTg=s900-c-k-c0x00ffffff-no-rj"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">
                  Viện huyết học truyền máu trung ưng
                </div>
              </div>
            </div>
            <div className="achievement-card place-2nd">
              <div className="achievement-chart">
                {" "}
                <img
                  src="http://bthh.org.vn/uploads/2019/11-18/65.4621992239087logo15v-(2).png"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Bệnh viện truyền máu huyết học</div>
              </div>
            </div>
            <div className="achievement-card place-3rd">
              <div className="achievement-chart">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NGE7qZE4tQ7jz5eHYDfX9HBUlUMcmgOx3CJhMoqjInjvfEsc2UnrGxGf7V7vvgGhA80&usqp=CAU"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Trung tâm truyền máu chợ trẫy</div>
              </div>
            </div>
            <div className="achievement-card place-4th">
              <div className="achievement-chart">
                <img
                  src="http://file.hstatic.net/1000115152/article/logo_trung_tam__34b67151b43f486e9139b01dbaaf868b_large.png"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Trung tâm hiến máu nhân đạo</div>
              </div>
            </div>
            <div className="achievement-card place-4th">
              <div className="achievement-chart">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5f/H%E1%BB%99i_Ch%E1%BB%AF_th%E1%BA%ADp_%C4%91%E1%BB%8F_Vi%E1%BB%87t_Nam.svg/1200px-H%E1%BB%99i_Ch%E1%BB%AF_th%E1%BA%ADp_%C4%91%E1%BB%8F_Vi%E1%BB%87t_Nam.svg.png"
                  className="achievement-avatar"
                  alt="chart"
                ></img>
                <div className="achievement-name">Hội chữ thập đỏ</div>
              </div>
            </div>
           
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Achievements;
