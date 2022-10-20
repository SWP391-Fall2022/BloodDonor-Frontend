import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
import Award from '../../../components/Avatar, Point, Reward/Award'
import QnAContainer from './QnAContainer'
import styles from '../donor.module.css'
import { Row, Col } from 'antd'
export default function QnADonor() {
    return (
        <Row justify="center" className={styles.mainContainer}>
            <Col span={7} className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                <Award />
            </Col>
            <Col span={7} ><QnAContainer /></Col>
        </Row>
    )
}