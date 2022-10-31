import React from 'react';
import { Collapse } from 'antd';
import './QaA.css';

export default function CampaignDetail() {

    //panel for q&a
    const { Panel } = Collapse;


    return (
        <>
            <section className="campaignDetail-q-and-a">
                <h3>Q&A</h3>

                <Collapse className="campaignDetail-q-and-a-container">
                    <Panel header="Ai có thể tham gia hiến máu?" className="campaignDetail-q-and-a-card">
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
                <Collapse className="campaignDetail-q-and-a-container">
                    <Panel
                        header="Ai là người không nên hiến máu?"
                        className="campaignDetail-q-and-a-card"
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
                <Collapse className="campaignDetail-q-and-a-container">
                    <Panel
                        header="Máu của tôi sẽ được làm những xét nghiệm gì?"
                        className="campaignDetail-q-and-a-card"
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

                <Collapse className="campaignDetail-q-and-a-container">
                    <Panel header="Ai có thể tham gia hiến máu?" className="campaignDetail-q-and-a-card">
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
                <Collapse className="campaignDetail-q-and-a-container">
                    <Panel
                        header="Ai là người không nên hiến máu?"
                        className="campaignDetail-q-and-a-card"
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
                <Collapse className="campaignDetail-q-and-a-container">
                    <Panel
                        header="Máu của tôi sẽ được làm những xét nghiệm gì?"
                        className="campaignDetail-q-and-a-card"
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

            </section>
        </>
    )
}