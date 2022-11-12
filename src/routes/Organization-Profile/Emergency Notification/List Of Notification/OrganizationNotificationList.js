import { Button, Table } from "antd"
import { Input } from 'antd';
import { useState } from "react"
import { Link } from "react-router-dom";
import styles from '../../organization.module.css'
import stylesNoti from './organizationNotificationList.module.css'
import emptyListImg from '../../../../assets/empty-list.png'
import { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function OrganizationNotificationList() {
    //Check empty list
    const [empty, setEmpty] = useState(true)
    //Data that will be displayed in table
    const [dataSource, setDataSource] = useState([])
    const [searchValue, setSearchValue] = useState('')

    //Second render: Show the list from databse (This won't run in first render)
    //The list will change based on search keyword
    useEffect(() => {
        async function fetchList() {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAll`)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            // console.log(response)
            const list = []
            if (response.status === 200) {
                response.body.forEach(e => {
                    if (e.emergency) {
                        list.push({
                            key: e.id, title: e.name, bloodTypes: e.bloodTypes,
                        })
                    }
                })
            }

            if (list.length === 0) {
                setEmpty(true)
            } else {
                const filterList = list.filter(items => {
                    return items.title.toLowerCase().includes(searchValue.toLowerCase())
                })
                if (filterList.length === 0) {
                    setEmpty(true)
                } else {
                    setDataSource(filterList)
                    setEmpty(false)
                }
            }
        }
        fetchList()
    }, [searchValue])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            width: '10%',
            fixed: 'left',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tựa đề thông báo khẩn cấp',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: 'Nhóm máu cần',
            dataIndex: 'bloodTypes',
            key: 'bloodTypes',
            align: 'center',
            width: '20%',
        },
        {
            title: '',
            key: 'detail',
            dataIndex: 'detail',
            align: 'center',
            fixed: 'right',
            width: '10%',
            render: (text, record, index) => <Link to="/organization/notification/view" state={{ id: record.key }} title="Chi tiết">Chi tiết</Link>
        },
    ];
    return (
        <>
            <div>
                <div className={stylesNoti.listTitleContainer}>
                    <div className={stylesNoti.listTitle}><strong>DANH SÁCH THÔNG BÁO KHẨN CẤP</strong></div>
                    <div className={stylesNoti.searchCreate}>
                        <div style={{ marginBottom: '1rem' }}>
                            <Input
                                className="cam-search-box"
                                suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Điền tên thông báo bạn muốn tìm..."
                                style={{
                                    width: 500,
                                }}
                            />
                        </div>
                        <div>                            
                            <Link to="/organization/notification/create">
                                <Button id={styles.btn3}>Tạo mới</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={stylesNoti.listContainer}>
                        {!empty ?
                            <>
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    pagination={{ total: dataSource.length, pageSize: '5', hideOnSinglePage: true }}
                                    className={stylesNoti.table}
                                    scroll={{
                                        x: 800,
                                    }}
                                />
                            </> :
                            <>
                                <img className={styles.emptyImg} src={emptyListImg} alt="empty" />
                                <div style={{ paddingBottom: '1rem' }}><strong>Không có thông tin của thông báo khẩn cấp nào được ghi lại</strong></div>
                                <Link to="/organization/notification/create"><Button id={styles.btn3} style={{ marginBottom: '1rem' }}>Tạo thông báo</Button></Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}