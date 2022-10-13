import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Award from '../../../components/Avatar, Point, Reward/Award'
import BasicInfoContainer, { } from './BasicInfoContainer'
import styles from '../organization.module.css'
import { Col, Row } from 'antd'
export default function OrganizationInfo() {
    return (
        <Row justify="space-evenly" className={styles.mainContainer}>
            <Col l={7} className={styles.leftContainerMain}>
                <AvatarContainer />
                <Award />
            </Col>
            <Col l={7}><BasicInfoContainer /></Col>
        </Row>
    )
}