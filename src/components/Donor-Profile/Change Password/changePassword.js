import AvatarContainer from '../Left Side/Avatar'
import Points from '../Left Side/Points'
import Award from '../Left Side/Award'
import ChangePasswordSide from './changePasswordSide'
import styles from '../donor.module.css'
import { Col, Row } from 'antd'
export default function ChangePassword() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
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