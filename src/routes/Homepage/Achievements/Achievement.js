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
            <div className="achievement-card place-5th">
              
              <div className="achievement-chart">
              <img
                src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                className="achievement-avatar"
                alt="chart"
              ></img>
                <div className="achievement-name">Nguyen Thi Huynh Hoang Nhi</div>
              </div>
            </div>
            <div className="achievement-card place-3rd">
             
              <div className="achievement-chart"> <img
                src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                className="achievement-avatar"
                alt="chart"
              ></img>
                <div className="achievement-name">Nguyễn Văn A</div>
              </div>
            </div>
            <div className="place-1st achievement-card">
              <div className="achievement-chart">
              <img
                src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                className="achievement-avatar"
                alt="chart"
              ></img>
                <div className="achievement-name">Nguyễn Văn A</div>
              </div>
            </div>
            <div className="achievement-card place-2nd">
              
              <div className="achievement-chart"><img
                src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                className="achievement-avatar"
                alt="chart"
              ></img>
                <div className="achievement-name">Nguyễn Văn A</div>
              </div>
            </div>
            <div className="achievement-card place-4th">
              
              <div className="achievement-chart"><img
                src="https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
                className="achievement-avatar"
                alt="chart"
              ></img>
                <div className="achievement-name">Nguyễn Văn A</div>
              </div>
            </div>
          </div>
          
        </div>
        
      </Carousel>
    </section>
  );
};

export default Achievements;
