import styles from '../donor.module.css'
import { Collapse } from 'antd';
import { useState } from 'react';
import empty from '../../../assets/empty-list.png'
const { Panel } = Collapse;

export default function QnAContainer() {
    const [emptyList, setEmptyList] = useState(true);
    if (!emptyList) {
        return (
            <div className={styles.infoContainer}>
                <div className={styles.title}>DANH SÁCH CÂU HỎI</div>
                {/* Create a mapping through every panel of this user using key */}
                <Collapse style={{ marginBottom: '15px' }}>
                    <Panel
                        className={styles.questionPanel}
                        header="Ai có thể tham gia hiến máu"
                        key="1">
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
                <Collapse style={{ marginBottom: '15px' }}>
                    <Panel
                        className={styles.questionPanel}
                        header="2. Ai là người không nên hiến máu?"
                        key="2"
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
                <Collapse style={{ marginBottom: '15px' }}>
                    <Panel
                        className={styles.questionPanel}
                        header="3. Máu của tôi sẽ được làm những xét nghiệm gì?"
                        key="3"
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
            </div>
        )
    } else {
        return (
            <div className={`${styles.infoContainer} ${styles.voucherContainer}`}>
                <div className={styles.title}>DANH SÁCH CÂU HỎI</div>
                <img className={styles.img} src={empty} alt="empty" />
                <div><strong>Bạn vẫn chưa có câu hỏi nào được giải đáp</strong></div>
            </div>
        )
    }
}