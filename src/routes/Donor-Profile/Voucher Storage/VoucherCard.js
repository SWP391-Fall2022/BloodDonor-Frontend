import styles from '../donor.module.css'
import { Card } from 'antd';
import { Link } from 'react-router-dom';

//Load User Data here

export function VoucherCard() {
    return (
        <Card headStyle={{ fontSize: '16px', fontWeight: '700', background: 'var(--primary-050)' }} style={{ marginBottom: '20px', boxShadow: 'var(--shadow-dp-01)' }}
            title="Cửa hàng tiện lợi 7-Eleven"
            extra={<Link style={{ color: 'var(--primary-900)' }}>Chi tiết</Link>}>
            <div className={styles.innerTitle}>AB12GH45</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Voucher giảm 5k với hóa đơn từ 20k</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Hạn sử dụng đến 30/11/2022</div>
        </Card>
    )
}

export function VoucherCard2() {
    return (
        <Card headStyle={{ fontSize: '16px', fontWeight: '700', background: 'var(--blue-02)' }} style={{ marginBottom: '20px', boxShadow: 'var(--shadow-dp-01)', width: '360px' }}
            title="Cửa hàng tiện lợi 7-Eleven"
            extra={<Link style={{ color: 'var(--blue-01)' }}>Đổi</Link>}>
            <div className={styles.innerTitle}>100 điểm</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Voucher giảm 5k với hóa đơn từ 20k</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Hạn sử dụng đến 30/11/2022</div>
        </Card>
    )
}