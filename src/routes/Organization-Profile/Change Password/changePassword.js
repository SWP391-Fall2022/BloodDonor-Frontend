import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Award from '../../../components/Avatar, Point, Reward/Award'
import ChangePasswordSide from './changePasswordSide'
import styles from '../organization.module.css'
import { Col, Row } from 'antd'
export default function OrganizationChangePassword() {
    return (
        <Row justify="center" className={styles.mainContainer}>
            <Col span={7} className={styles.leftContainerMain}>
                <AvatarContainer />
                <Award />
            </Col>
            <Col span={7}><ChangePasswordSide /></Col>
        </Row>
    )
}