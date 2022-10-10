import AvatarContainer from '../Left Side/Avatar'
import Points from '../Left Side/Points'
import Award from '../Left Side/Award'
import BasicInfoContainer, { } from './BasicInfoContainer'
import styles from '../donor.module.css'
import { Col, Row } from 'antd'
export default function Info() {
    return (
        <Row justify="center" className={styles.mainContainer}>
            <Col span={7} className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                <Award />
            </Col>
            <Col span={7}><BasicInfoContainer /></Col>
        </Row>
    )
}