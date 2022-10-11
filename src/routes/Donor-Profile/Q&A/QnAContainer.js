import styles from '../donor.module.css'
import { Collapse } from 'antd';
const { Panel } = Collapse;

const text = `Ai cũng ok, già trẻ đều có đủ, miễn hiến xong đừng xỉu mất công lại phải lấy lại máu mới hiến đó :))`;

export default function QnAContainer() {

    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>DANH SÁCH CÂU HỎI</div>
            {/* Create a mapping through every panel of this user using key */}
            <Collapse style={{ marginBottom: '15px' }}>
                <Panel className={styles.questionPanel} header="Ai có thể tham gia hiến máu" key="1">
                    <p>{text}</p>
                </Panel>
            </Collapse>
            <Collapse style={{ marginBottom: '15px' }}>
                <Panel className={styles.questionPanel} header="Ai có thể tham gia hiến máu" key="2">
                    <p>{text}</p>
                </Panel>
            </Collapse>
            <Collapse style={{ marginBottom: '15px' }}>
                <Panel className={styles.questionPanel} header="Ai có thể tham gia hiến máu" key="3">
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </div>
    )
}