import AvatarContainer from '../Left Side/Avatar'
import Points from '../Left Side/Points'
import Award from '../Left Side/Award'
import BasicInfoContainer, { } from './BasicInfoContainer'
import styles from '../donor.module.css'
import { Col, Row } from 'antd'
export default function Info() {
    return (
        <Row justify="space-evenly" className={styles.mainContainer}>
            <Col l={7} className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                <Award />
            </Col>
            <Col l={7}><BasicInfoContainer /></Col>
        </Row>
    )
}