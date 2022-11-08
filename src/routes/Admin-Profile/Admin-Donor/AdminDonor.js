import { AdBread } from '../AdminBreadcrumbs'
import { Button, Menu, Skeleton, Table, Tooltip } from "antd"
import { Input } from 'antd';
import { useState } from "react"
import styles from '../admin.module.css'
import stylesDonor from './adminDonorList.module.css'
import emptyListImg from '../../../assets/empty-list.png'
import { useEffect } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import AdminDonorDetail from './AdminDonorDetail';

const { Search } = Input;

export default function AdminManageDonor() {
    //Show list in 3 mode: All, Active, Ban
    const [listState, setListState] = useState('Tất cả')
    //Check empty list
    const [empty, setEmpty] = useState(true)
    //Data that will be displayed in table
    const [dataSource, setDataSource] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [detail, setDetail] = useState(false)
    const [user, setUser] = useState()

    const [rendered, setRendered] = useState(false)

    //Second render: Show the list from databse (This won't run in first render)
    //The list will change based on list state and search keyword
    useEffect(() => {
        async function fetchDonorList() {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors`)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            // console.log(response)
            const list = [];
            if (response.status === 200) {
                response.body.forEach(e => list.push({
                    key: e.userId, userId: e.userId, name: e.name, identityNum: e.identityNum,
                    email: e.user.email, phone: e.user.phone, avatar: e.avatar, districtId: e.user.districtId, listState: e.user.status ? "Hoạt động" : "Cấm"
                }))
            }

            // console.log(response)

            if (list.length === 0) {
                setEmpty(true)
            } else {
                const filterList = list.filter(items => {
                    return listState === "Tất cả" ? items.name.toLowerCase().includes(searchValue.toLowerCase()) :
                        items.listState === listState && items.name.toLowerCase().includes(searchValue.toLowerCase());
                })
                if (filterList.length === 0) {
                    setEmpty(true)
                } else {
                    setDataSource(filterList)
                    setEmpty(false)
                }
            }
        }
        fetchDonorList();
        setRendered(true)
    }, [listState, searchValue, detail])

    function onDetail(record) {
        setUser(record)
        // console.log(record)
        setDetail(true)
    }

    const handleMenuSelect = (value) => {
        setListState(value.key)
    }

    const onSearch = (value) => {
        setSearchValue(value)
    }

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            fixed: 'left'
        },
        {
            title: 'CMND',
            dataIndex: 'identityNum',
            key: 'identityNum',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'listState',
            key: 'listState',
            align: 'center',
            fixed: 'right'
        },
    ];
    const menuItems = [
        {
            key: "Tất cả",
            label: "Tất cả",
        },
        {
            key: "Hoạt động",
            label: "Hoạt động",
        },
        {
            key: "Cấm",
            label: "Cấm",
        },
    ]
    return (
        <>
            {!detail ?
                <>

                    <div className={styles.breadcrumb}><AdBread name="Quản lý tình nguyện" /></div>
                    <div className={styles.mainContainer}>
                        <div className={stylesDonor.listTitleContainer}>
                            <div className={stylesDonor.listTitle}><strong>DANH SÁCH TÌNH NGUYỆN VIÊN</strong></div>
                            <div className={stylesDonor.listContainer}>
                                {rendered ?
                                    <>
                                        <Menu mode="horizontal" items={menuItems} defaultSelectedKeys={['Tất cả']} onSelect={handleMenuSelect} />
                                        <div className={stylesDonor.searchBar}>
                                            <div>
                                                <Search enterButton style={{ width: '90%' }} onSearch={onSearch} />
                                                <Tooltip
                                                    title="Nhấn vào một hàng để xem thông tin chi tiết của tình nguyện viên"
                                                    arrowPointAtCenter
                                                    placement="right"
                                                >
                                                    <QuestionCircleOutlined style={{ position: 'relative', left: '20px', top: '5px' }} />
                                                </Tooltip>
                                            </div>
                                            <Button id={styles.btn3} onClick={() => setSearchValue('')}>Hiện tất cả</Button>
                                        </div>
                                        {!empty ?
                                            <>
                                                <Table
                                                    dataSource={dataSource}
                                                    columns={columns}
                                                    pagination={{ total: dataSource.length, pageSize: '5', hideOnSinglePage: true }}
                                                    className={stylesDonor.table}
                                                    onRow={(record, rowIndex) => ({
                                                        onClick: event => onDetail(record)
                                                    })}
                                                    scroll={{
                                                        x: 800,
                                                    }}
                                                />
                                            </> :
                                            <>
                                                <img className={styles.emptyImg} src={emptyListImg} alt="empty" />
                                                <div style={{ paddingBottom: '1rem', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}><strong>Không có thông tin của tình nguyện viên {listState === "Tất cả" ? "nào" : listState === "Hoạt động" ? "đang hoạt động" : "đã bị cấm"} được tìm thấy</strong></div>
                                            </>
                                        }
                                    </>
                                    :
                                    <Skeleton active />
                                }
                            </div>
                        </div>
                    </div>
                </>
                :
                <AdminDonorDetail setDetail={setDetail} user={user} />
            }
        </>
    )
}