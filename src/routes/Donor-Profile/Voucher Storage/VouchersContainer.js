import { useState } from 'react';
import styles from '../donor.module.css'
import empty from '../../../assets/empty-list.png'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, List } from 'antd';

export default function VouchersContainer() {
    const [emptyList, setEmptyList] = useState(false);
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        const data = [
            {
                title: 'Cửa hàng tiện lợi 7-Eleven',
                code: 'AB12GH45',
            },
            {
                title: 'Cửa hàng tiện lợi 7-Eleven',
                code: 'AB123H45',
            },
            {
                title: 'Cửa hàng tiện lợi 7-Eleven',
                code: 'AER2GH45',
            },
            {
                title: 'Cửa hàng tiện lợi 7-Eleven',
                code: 'AB125F45',
            },
            {
                title: 'Cửa hàng tiện lợi 7-Twelve',
                code: 'AD22F545',
            },
            {
                title: 'Cửa hàng tiện lợi 8-Ten',
                code: 'AC3Z2GHD',
            },
        ];
        if (data.length === 0) {
            setEmptyList(true)
        } else {
            setDataSource(data)
            setEmptyList(false)
        }
    }, [emptyList])

    if (!emptyList) {
        return (
            <div className={styles.infoContainer}>
                <div className={styles.title}>KHO VOUCHER CỦA BẠN</div>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 1,
                    }}
                    dataSource={dataSource}
                    renderItem={(item) => (
                        <List.Item>
                            <Card headStyle={{ fontSize: '16px', fontWeight: '700', background: 'var(--primary-050)' }} style={{ marginBottom: '20px', boxShadow: 'var(--shadow-dp-01)' }}
                                title={item.title}
                                extra={<Link style={{ color: 'var(--primary-900)' }}>Chi tiết</Link>}>
                                <div className={styles.innerTitle}>{item.code}</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Voucher giảm 5k với hóa đơn từ 20k</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Hạn sử dụng đến 30/11/2022</div>
                            </Card>
                        </List.Item>
                    )}
                    pagination={{ total: dataSource.length, pageSize: '2', hideOnSinglePage: true }}
                />
            </div>
        )
    } else {
        return (
            <div className={styles.infoContainer}>
                <div className={styles.title}>KHO VOUCHER CỦA BẠN</div>
                <div style={{ textAlign: 'center' }}>
                    <img className={styles.img} src={empty} alt="empty" />
                    <div><strong>Bạn vẫn chưa có voucher nào trong kho</strong></div>
                    <div><strong>Hãy dùng điểm thưởng để đổi voucher</strong></div>
                </div>
            </div>
        )
    }
}