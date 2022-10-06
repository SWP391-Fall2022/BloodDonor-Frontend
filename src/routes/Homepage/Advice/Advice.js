import React from 'react'
import "./advice.css"
const Advice = () => {
    return <section className="advice">
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
};

export default Advice;