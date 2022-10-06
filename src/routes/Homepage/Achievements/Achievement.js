import { Carousel } from 'antd';
import React from 'react';
import "./achievement.css"
const Achievements = () => {
    return <section className="achievements">
    <h2>THÀNH TÍCH</h2>
    <Carousel autoplay draggable={true} touchThreshold={30}>
      <div>
        <h3></h3>
      </div>
      <div>
      </div>
      <div>
      </div>
    </Carousel>
  </section>
};

export default Achievements;