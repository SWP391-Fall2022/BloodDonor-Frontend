import styles from '../donor.module.css'
import { Empty, Modal, Skeleton, Table, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HistoryContainer() {

    const [dataSource, setDataSource] = useState([])
    const [rendered, setRendered] = useState(false)
    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === true) {
            setDataSource([]);
            fetchCampaignList()
            setRendered(true)
        }
        return () => {
            effectRan.current = true
        }
    }, [])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Chiến dịch',
            dataIndex: 'campaignName',
            key: 'campaignName',
            align: 'center',
            render: (text, record) => <Link to={'/organization/' + record.key} title="Chi tiết chiến dịch">{text}</Link>
        },
        {
            title: 'Thông tin sức khỏe',
            key: 'detail',
            dataIndex: 'detail',
            align: 'center',
            render: (text, record, index) => <Link onClick={event => { info(record) }} title="Chi tiết chiến dịch">Chi tiết</Link>
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            align: 'right',
        },
    ];

    async function fetchCampaignList() {
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/registered`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            if (response.body.length !== 0) {
                response.body.forEach(body => {
                    fetchCampaignName(body.campaignId, body)
                })
            }
        }
    }

    async function fetchCampaignName(id, body) {
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/readOne/${id}`)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            const info = { key: id, campaignName: response.body.name, status: body.status === "NOT_CHECKED_IN" ? "Đã đăng ký" : body.status === "CHECKED_IN" ? "Đã tham gia" : "Đã hủy" }
            setDataSource(curr => [...curr, info])
        }
    }

    async function info(record) {
        // console.log(record)
        let weight = ""
        let bloodType = ""
        let amount = ""
        let detail = ""

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/donated`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            response.body.forEach(e => {
                if (e.campaignId === record.key) {
                    weight = e.weight
                    bloodType = e.bloodType
                    amount = e.amount
                    detail = e.details
                }
            })
        }
        Modal.info({
            title: <h2><strong>THÔNG TIN SỨC KHỎE</strong></h2>,
            content: (
                <div>
                    <div><strong>Cân nặng: </strong>{weight}kg</div>
                    <div><strong>Nhóm máu: </strong>{bloodType}</div>
                    <div><strong>Lượng máu: </strong>{amount}cc</div>
                    <div><strong>Chi tiết sức khỏe: </strong>{detail}</div>
                </div>
            ),
            closable: true,
            okText: 'Đóng',
            width: '600px'
        });
    }

    return (
        <div className={styles.infoContainerHistory}>
            {rendered ?
                <>
                    <div className={styles.title}>LỊCH SỬ CHIẾN DỊCH
                        <Tooltip
                            title="Nhấn vào một dòng để xem thông tin sức khỏe của bạn"
                            arrowPointAtCenter
                            placement="right"
                        >
                            <QuestionCircleOutlined style={{ position: 'relative', left: '20px' }} />
                        </Tooltip>
                    </div>
                    <Table
                        locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Lịch sử rỗng" /> }}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{ total: dataSource.length, pageSize: '5', hideOnSinglePage: true }}
                        style={{ textAlign: 'center' }}
                    />
                </>
                :
                <Skeleton active />
            }
        </div>
    )
}