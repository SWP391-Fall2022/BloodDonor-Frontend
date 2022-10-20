import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
import Award from '../../../components/Avatar, Point, Reward/Award'
import ChangePasswordSide from './changePasswordSide'
import styles from '../donor.module.css'
import { Col, Row } from 'antd'
export default function ChangePassword() {
    return (
        <Row justify="center" className={styles.mainContainer}>
            <Col span={7} className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                <Award />
            </Col>
            <Col span={7}><ChangePasswordSide /></Col>
        </Row>
    )
}