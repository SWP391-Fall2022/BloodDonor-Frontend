import { Col, Row } from 'antd'
import styles from '../donor.module.css'
import { VoucherCard2 } from './VoucherCard'
export default function VouchersContainer2() {
    return (
        <div className={styles.infoContainer} style={{ width: '810px', marginTop: '20px', textAlign: 'center' }}>
            <div className={styles.title}>VOUCHER BẠN CÓ THỂ NHẬN</div>
            <Row>
                <Col span={12}><VoucherCard2 /></Col>
                <Col span={12}><VoucherCard2 /></Col>
            </Row>
            <Row>
                <Col span={12}><VoucherCard2 /></Col>
                <Col span={12}><VoucherCard2 /></Col>
            </Row>
        </div>
    )
}