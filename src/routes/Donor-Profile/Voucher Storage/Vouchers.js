import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
import Award from '../../../components/Avatar, Point, Reward/Award'
import VouchersContainer from './VouchersContainer'
import VouchersContainer2 from './VouchersCointainer2'
import styles from '../donor.module.css'
import { Col, Row } from 'antd'
export default function Vouchers() {
    return (
        <div>
            <Row justify="center" className={styles.mainContainer} style={{ height: 'fit-content', marginBottom: '50px' }}>
                <Col span={7} className={styles.leftContainerMain}>
                    <AvatarContainer />
                    <Points />
                    <Award />
                </Col>
                <Col span={7}><VouchersContainer /></Col>
                <Col span={14}><VouchersContainer2 /></Col>
            </Row>
        </div>
    )
}