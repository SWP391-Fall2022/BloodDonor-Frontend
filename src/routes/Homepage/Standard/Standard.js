import React from "react";
import "./standard.css";
import LiquorIcon from '@mui/icons-material/Liquor';
const Standard = () => {
  return (
    <section className="standard">
      <h2>TIÊU CHUẨN THAM GIA HIẾN MÁU</h2>
      <div className="container-standard">
        {/* ===1=== */}
        <div className="standard-card">
          <div className="standard-bullet">1</div>
          <p>Người khỏe mạnh trong độ tuổi từ đủ 18 đến 60 tuổi</p>
        </div>
        {/* ===2=== */}
        <div className="standard-card">
          <div className="standard-bullet">2</div>
          <p>Không nghiện ma túy, rượu bia và các chất kích thích</p>
        </div>
        {/* ===3=== */}
        <div className="standard-card">
          <div className="standard-bullet">3</div>
          <p>Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần</p>
        </div>
        {/* ===4=== */}
        <div className="standard-card">
          <div className="standard-bullet">4</div>
          <p>
            Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô
            hấp, dạ dày…
          </p>
        </div>
        {/* ===5=== */}
        <div className="standard-card">
          <div className="standard-bullet">5</div>
          <p>
            Chỉ số huyết sắc tố <br /> Hb ≥120g/l <br /> (Hb ≥125g/l nếu hiến từ
            350ml trở lên)
          </p>
        </div>
        {/* ===6=== */}
        <div className="standard-card">
          <div className="standard-bullet">6</div>
          <p>
            Không mắc hay có nguy cơ lây nhiễm HIV, không bị viêm gan B, viêm
            gan C, và các virus lây qua máu.
          </p>
        </div>
        {/* ===7=== */}
        <div className="standard-card">
          <div className="standard-bullet">7</div>
          <p>
            Cân nặng: <br /> Nam ≥ 45 kg <br /> Nữ ≥ 42 kg
          </p>
        </div>
        {/* ===8=== */}
        <div className="standard-card">
          <div className="standard-bullet">8</div>
          <p>
            Kết quả test nhanh âm tính với kháng nguyên bề mặt của siêu vi B
          </p>
        </div>
        {/* ===9=== */}
        <div className="standard-card">
          <div className="standard-bullet">9</div>
          <p>Mang theo chứng minh nhân dân/hộ chiếu.</p>
        </div>
      </div>
    </section>
  );
};

export default Standard;
