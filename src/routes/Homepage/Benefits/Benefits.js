import React from 'react'
import { Carousel } from 'antd';
import img_1 from "../../../assets/homepage-banner-1.png"
import img_2 from "../../../assets/homepage-banner-2.png"
import img_3 from "../../../assets/homepage-banner-3.png"
const Benefits = () => {
    return <section className="benefits">
    <Carousel autoplay draggable={true} touchThreshold={30} dots={false}>
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
};

export default Benefits;