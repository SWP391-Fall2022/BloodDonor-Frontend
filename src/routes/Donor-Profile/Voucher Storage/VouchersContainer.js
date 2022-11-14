import { useState } from 'react';
import styles from '../donor.module.css'
import empty from '../../../assets/empty-list.png'
import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Card, List, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function VouchersContainer() {
    const [emptyList, setEmptyList] = useState(false);
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchAPI() {
            const data = [];
            const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
            let json = {
                headers: new Headers({
                    'Authorization': "Bearer " + token,
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/rewards`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            // console.log(response);
            if (response.status === 400) {
                notification.error({
                    message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                    placement: "top"
                });
                sessionStorage.clear()
                navigate("/");
            }
            if (response.status === 200) {
                response.body.forEach(e => data.push({
                    id: e.reward.id, sponsor: e.reward.sponsor, code: e.reward.code, details: e.reward.details, expiredDate: e.reward.expiredDate
                }))
            }
            // console.log(data)
            if (data.length === 0) {
                setEmptyList(true)
            } else {
                setDataSource(data)
                setEmptyList(false)
            }
        }

        fetchAPI();
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
                                title={item.sponsor}
                            // extra={<Link style={{ color: 'var(--primary-900)' }}>Chi tiết</Link>}
                            >
                                <div className={styles.innerTitle}>Mã: {item.code}</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{item.details}</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Hạn sử dụng đến {item.expiredDate}</div>
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