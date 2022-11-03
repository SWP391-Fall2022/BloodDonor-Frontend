import { Button, Menu, Table, Tooltip } from "antd"
import { Input } from 'antd';
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import styles from '../../organization.module.css'
import stylesNoti from './organizationNotificationList.module.css'
import emptyListImg from '../../../../assets/empty-list.png'
import { useEffect } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function OrganizationNotificationList() {
    //Show list in 3 mode: All, On Going or Done
    const [listState, setListState] = useState('Tất cả')
    //Check empty list
    const [empty, setEmpty] = useState(true)
    //Data that will be displayed in table
    const [dataSource, setDataSource] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate();

    //Second render: Show the list from databse (This won't run in first render)
    //The list will change based on list state and search keyword
    useEffect(() => {
        //TO-DO: Fetch data from database here
        const list = [
            {
                key: '1',
                STT: 1,
                title: "Bệnh viện trung ương cần gấp nhóm máu A, B, O",
                listState: 'Đang diễn ra',
            },
            {
                key: '2',
                STT: 2,
                title: "Bệnh viện trung ương cần gấp nhóm máu O",
                listState: 'Kết thúc',
            },
            {
                key: '3',
                STT: 3,
                title: "Bệnh viện trung ương cần gấp nhóm máu AB",
                listState: 'Kết thúc',
            },
            {
                key: '4',
                STT: 4,
                title: "Bệnh viện trung ương cần gấp nhóm máu B",
                listState: 'Kết thúc',
            },
            {
                key: '5',
                STT: 5,
                title: "Bệnh viện trung ương cần gấp nhóm máu AB",
                listState: 'Đang diễn ra',
            },
            {
                key: '6',
                STT: 6,
                title: "Bệnh viện trung ương cần gấp nhóm máu A",
                listState: 'Kết thúc',
            },
            {
                key: '7',
                STT: 7,
                title: "Bệnh viện trung ương cần gấp nhóm máu AB và O",
                listState: 'Kết thúc',
            },
            {
                key: '8',
                STT: 8,
                title: "Bệnh viện trung ương cần gấp nhóm máu A và B",
                listState: 'Đang diễn ra',
            },
        ];

        if (list.length === 0) {
            setEmpty(true)
        } else {
            const filterList = list.filter(items => {
                return listState === "Tất cả" ? items.title.toLowerCase().includes(searchValue.toLowerCase()) :
                    items.listState === listState && items.title.toLowerCase().includes(searchValue.toLowerCase());
            })
            if (filterList.length === 0) {
                setEmpty(true)
            } else {
                setDataSource(filterList)
                setEmpty(false)
            }
        }
    }, [listState, searchValue])

    const handleMenuSelect = (value) => {
        setListState(value.key)
    }

    const onSearch = (value) => {
        setSearchValue(value)
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
        },
        {
            title: 'Tựa đề thông báo khẩn cấp',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'listState',
            key: 'listState',
            align: 'center'
        },
    ];
    return (
        <>
            <div>
                <div className={stylesNoti.listTitleContainer}>
                    <div className={stylesNoti.listTitle}><strong>DANH SÁCH THÔNG BÁO KHẨN CẤP</strong></div>
                    <div className={stylesNoti.listContainer}>
                        <Menu mode="horizontal" defaultSelectedKeys={['Tất cả']} onSelect={handleMenuSelect}>
                            <Menu.Item key="Tất cả">
                                Tất cả
                            </Menu.Item>
                            <Menu.Item key="Đang diễn ra">
                                Đang diễn ra
                            </Menu.Item>
                            <Menu.Item key="Kết thúc">
                                Kết thúc
                            </Menu.Item>
                        </Menu>
                        <div className={stylesNoti.searchCreate}>
                            <div>
                                <Search enterButton style={{ width: '90%' }} onSearch={onSearch} />
                                <Tooltip
                                    title="Nhấn vào một dòng để xem thông tin chi tiết của thông báo"
                                    arrowPointAtCenter
                                    placement="right"
                                >
                                    <QuestionCircleOutlined style={{ position: 'relative', left: '20px', top: '5px' }} />
                                </Tooltip>
                            </div>
                            <div>
                                <Button id={styles.btn3} style={{ margin: '0 10px' }} onClick={() => setSearchValue('')}>Hiện tất cả</Button>
                                <Link to="/organization/notification/create">
                                    <Button id={styles.btn3}>Tạo mới</Button>
                                </Link>
                            </div>
                        </div>
                        {!empty ?
                            <>
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    pagination={{ total: dataSource.length, pageSize: '5' }}
                                    className={stylesNoti.table}
                                    onRow={() => ({
                                        onClick: (e) => navigate("/organization/notification/view")
                                    })}
                                />
                            </> :
                            <>
                                <img className={styles.emptyImg} src={emptyListImg} alt="empty" />
                                <div style={{ paddingBottom: '1rem' }}><strong>Không có thông tin của thông báo khẩn cấp {listState === "Tất cả" ? "nào" : listState.toLowerCase()} được ghi lại</strong></div>
                                <Link to="/organization/notification/create"><Button id={styles.btn3} style={{ marginBottom: '1rem' }}>Tạo thông báo</Button></Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}