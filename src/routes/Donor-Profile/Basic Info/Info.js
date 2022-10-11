import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
import Award from '../../../components/Avatar, Point, Reward/Award'
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