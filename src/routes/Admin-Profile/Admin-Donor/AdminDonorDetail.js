import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { AdBread } from '../AdminBreadcrumbs'
import styles from '../admin.module.css'
import stylesDonor from './adminDonorList.module.css'
import { Avatar, Button, Modal, notification, Skeleton, Table } from 'antd'
import packageInfo from "../../../shared/ProvinceDistrict.json";
import { useEffect, useRef, useState } from 'react'

export default function AdminDonorDetail({ setDetail, user }) {
    const breadName = <><Link onClick={() => setDetail(false)}><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Thông tin chi tiết</>
    const layer1 = <Link onClick={() => setDetail(false)}>Quản lý tình nguyện viên</Link>
    const [open, setOpen] = useState(false)
    const [rendered, setRendered] = useState(false)
    const [provinceName, setProvinceName] = useState('')
    const [districtName, setdistrictName] = useState('')
    const [dataSource, setDataSource] = useState([])
    const [randomColor, setRandomColor] = useState('#000000');
    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === true) {
            setDataSource([]);
            for (var i = 0; i < 6; i++) {
                setRandomColor("#" + Math.floor(Math.random() * 10));
            }

            for (var j = 0; j < packageInfo.provinces.length; j++) {
                for (var k = 0; k < packageInfo.provinces[j].district.length; k++) {
                    if (packageInfo.provinces[j].district[k].id === user.districtId) {
                        setProvinceName(packageInfo.provinces[j].name)
                        setdistrictName(packageInfo.provinces[j].district[k].name)
                    }
                }
            }
            fetchDonorCampaignList()
            setRendered(true)
        }
        return () => {
            effectRan.current = true
        }
    }, [])

    async function fetchDonorCampaignList() {
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/${user.userId}/donated`)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            if (response.body.length !== 0) {
                response.body.forEach(e => {
                    fetchCampaignName(e.campaignId, e.registeredDate)
                })
            }
        }
    }

    async function fetchCampaignName(id, registeredDate) {
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/readOne/${id}`)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            const info = { campaignName: response.body.name, date: registeredDate }
            setDataSource(curr => [...curr, info])
        }
    }

    const columns = [
        {
            title: 'Chiến dịch',
            dataIndex: 'campaignName',
            key: 'campaignName',
            align: 'center',
        },
        {
            title: 'Thời gian đăng kí hiến máu',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
    ];

    const lockAccount = async () => {
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Authorization': "Bearer " + token,
            }),
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/admin/lock/${user.userId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            notification.success({
                message: "Đã khóa tài khoản",
                placement: "top"
            });
        }
        if (response.status === 400) {
            notification.error({
                message: response.body,
                placement: "top"
            });
        }
        setOpen(false)
    }

    return (
        <>
            <div className={styles.breadcrumb}><AdBread layer1={layer1} layer2="Thông tin chi tiết" name={breadName} /></div>
            <div className={styles.mainContainer}>
                <div className={stylesDonor.donorDetailContainer}>
                    {rendered ?
                        <>
                            <div className={stylesDonor.donorInfoContainer}>
                                <div className={stylesDonor.listTitle} style={{ textAlign: 'center' }}><strong>THÔNG TIN TÌNH NGUYỆN VIÊN</strong></div>
                                <div style={{ margin: '1rem 1rem' }}><strong>Họ và tên: </strong>{user.name}</div>
                                <div style={{ margin: '1rem 1rem' }}><strong>CMND: </strong>{user.identityNum}</div>
                                <div style={{ margin: '1rem 1rem' }}><strong>Số điện thoại: </strong>{user.phone}</div>
                                <div style={{ margin: '1rem 1rem' }}><strong>Email: </strong>{user.email}</div>
                                <div style={{ margin: '1rem 1rem' }}><strong>Nơi thường trú: </strong>{districtName}, {provinceName}</div>
                                <Table
                                    columns={columns}
                                    pagination={{ pageSize: '5', hideOnSinglePage: true }}
                                    className={stylesDonor.table}
                                    dataSource={dataSource}
                                />
                                <div style={{ textAlign: 'center' }}>
                                    {user.listState === "Cấm" ?
                                        <Button id={styles.btnDisable} style={{ margin: '1rem 0' }} disabled>Cấm tài khoản</Button>
                                        :
                                        <Button id={styles.btn3} style={{ margin: '1rem 0' }} onClick={() => setOpen(true)}>Cấm tài khoản</Button>
                                    }
                                    <Modal
                                        closable={false}
                                        open={open}
                                        onCancel={() => setOpen(false)}
                                        onOk={lockAccount}
                                        cancelText="Hủy"
                                        okText="Xác nhận"
                                    >
                                        <p><strong>Khóa tài khoản này ?</strong></p>
                                    </Modal>
                                </div>
                            </div>
                            <div className={stylesDonor.avaContainer}>
                                <Avatar className={stylesDonor.donorAva} size={160} src={user.avatar} style={{ backgroundColor: randomColor, fontSize: "60px" }} >{user.name.charAt(0)}</Avatar>
                                <div>{user.name}</div>
                            </div>
                        </>
                        :
                        <>
                            <div className={stylesDonor.donorInfoContainer} style={{ padding: '1.5rem' }}>
                                <div><Skeleton active /></div>
                                <div style={{ width: '20%', marginLeft: 'auto', marginRight: 'auto' }}><Skeleton.Button active block /></div>
                            </div>
                            <div className={stylesDonor.avaContainer}>
                                <Skeleton.Avatar size={160} active />
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}