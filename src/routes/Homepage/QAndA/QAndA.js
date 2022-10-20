import { Button, Collapse } from 'antd';
import React from 'react';
import "./qanda.css"
const { Panel } = Collapse;
const QAndA = () => {
    return <section className="q-and-a">
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
    <Button type="secondary" style={{ marginTop: "1.5%" }} href="/QnA">
      Xem thêm
    </Button>
  </section>
};

export default QAndA;