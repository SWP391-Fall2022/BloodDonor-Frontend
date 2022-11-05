import styles from '../donor.module.css'
import { Card, List } from 'antd'
import { Link } from 'react-router-dom';

export default function VouchersContainer2() {
    const data = [
        {
            title: 'Cửa hàng tiện lợi 7-Eleven',
            point: '100 điểm',
        },
        {
            title: 'Cửa hàng tiện lợi 7-Eleven',
            point: '60 điểm',
        },
        {
            title: 'Cửa hàng tiện lợi 7-Eleven',
            point: '20 điểm',
        },
        {
            title: 'Cửa hàng tiện lợi 7-Eleven',
            point: '200 điểm',
        }, 
        {
            title: 'Cửa hàng tiện lợi 7-Twelve',
            point: '150 điểm',
        }, 
        {
            title: 'Cửa hàng tiện lợi 8-Ten',
            point: '20 điểm',
        },
    ];
    return (
        <div className={styles.voucherContainer}>
            <div className={styles.title}>VOUCHER BẠN CÓ THỂ NHẬN</div>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 1,
                    xl: 2,
                    xxl: 2,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card headStyle={{ fontSize: '16px', fontWeight: '700', background: 'var(--blue-02)' }} style={{ marginBottom: '20px', boxShadow: 'var(--shadow-dp-01)' }}
                            title={item.title}
                            extra={<Link style={{ color: 'var(--blue-01)' }}>Đổi</Link>}>
                            <div className={styles.innerTitle}>{item.point}</div>
                            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Voucher giảm 5k với hóa đơn từ 20k</div>
                            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Hạn sử dụng đến 30/11/2022</div>
                        </Card>
                    </List.Item>
                )}
                pagination={{ total: data.length, pageSize: '4', hideOnSinglePage: true }}
            />
        </div>
    )
}