import styles from '../donor.module.css'
import empty from '../../../assets/empty-list.png'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, List, Modal, notification } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const { confirm } = Modal;

export default function VouchersContainer2() {
    const [emptyList, setEmptyList] = useState(false);
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()

    //Load vouchers
    useEffect(() => {
        async function fetchAPI() {
            const data = [];
            const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
            let json = {
                headers: new Headers({
                    'Authorization': "Bearer " + token,
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/rewards/available`, json)
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
                    id: e.id, sponsor: e.sponsor, point: e.level, details: e.details, expiredDate: e.expiredDate
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

    //Claim Voucher
    const onClaim = (id) => {
        confirm({
            title: 'Dùng điểm của bạn để đổi voucher này?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Đổi',
            cancelText: 'Hủy',
            onOk() {
                onConfirm(id);
            },
        });
    }

    const onConfirm = async (id) => {
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            method: "PUT",
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/rewards/${id}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 400) {
            notification.error({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                placement: "top"
            });
            sessionStorage.clear()
            navigate("/");
        }
        if (response.status === 200) {
            notification.success({
                message: "Đổi voucher thành công",
                placement: "top"
            });
        }
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }

    if (!emptyList) {
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
                    dataSource={dataSource}
                    renderItem={(item) => (
                        <List.Item>
                            <Card headStyle={{ fontSize: '16px', fontWeight: '700', background: 'var(--blue-02)' }} style={{ marginBottom: '20px', boxShadow: 'var(--shadow-dp-01)' }}
                                title={item.sponsor}
                                extra={<Link style={{ color: 'var(--blue-01)' }} onClick={() => onClaim(item.id)}>Đổi</Link>}
                            >
                                <div className={styles.innerTitle}>{item.point} Điểm</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{item.details}</div>
                                <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Hạn sử dụng đến {item.expiredDate}</div>
                            </Card>
                        </List.Item>
                    )}
                    pagination={{ total: dataSource.length, pageSize: '4', hideOnSinglePage: true }}
                />
            </div>
        )
    } else {
        return (
            <div className={styles.voucherContainer}>
                <div className={styles.title}>VOUCHER BẠN CÓ THỂ NHẬN</div>
                <div style={{ textAlign: 'center' }}>
                    <img className={styles.img} src={empty} alt="empty" />
                    <div><strong>Không có voucher nào bạn có thể nhận được tìm thấy</strong></div>
                    <div><strong>Hãy tích thêm điểm thưởng để đổi voucher</strong></div>
                </div>
            </div>
        )
    }
}