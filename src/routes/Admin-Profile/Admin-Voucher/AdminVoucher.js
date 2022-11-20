import { AdBread } from '../AdminBreadcrumbs'
import { Button, Skeleton, Table } from "antd"
import { Input } from 'antd';
import { useState } from "react"
import styles from '../admin.module.css'
import stylesVoucher from './adminVoucherList.module.css'
import emptyListImg from '../../../assets/empty-list.png'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

export default function AdminManageVouchers() {
    //Check empty list
    const [empty, setEmpty] = useState(true)
    //Data that will be displayed in table
    const [dataSource, setDataSource] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const [rendered, setRendered] = useState(false)
    const navigate = useNavigate();
    //Second render: Show the list from databse (This won't run in first render)
    //The list will change based on list state and search keyword
    useEffect(() => {
        async function fetchVoucherList() {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/rewards`)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })

            const list = [];
            if (response.status === 200) {
                response.body.forEach(e => list.push({
                    key: e.id, expiredDate: e.expiredDate, level: e.level, sponsor: e.sponsor,
                    code: e.code, amount: e.amount, details: e.details
                }))
            }

            // console.log(response)

            if (list.length === 0) {
                setEmpty(true)
            } else {
                const filterList = list.filter(items => {
                    return items.sponsor.toLowerCase().includes(searchValue.toLowerCase());
                })
                if (filterList.length === 0) {
                    setEmpty(true)
                } else {
                    setDataSource(filterList)
                    setEmpty(false)
                }
            }
        }
        fetchVoucherList();
        setRendered(true)
    }, [searchValue])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Nhà tài trợ',
            dataIndex: 'sponsor',
            key: 'sponsor',
            align: 'center'
        },
        {
            title: 'Thông tin voucher',
            dataIndex: 'details',
            key: 'details',
            align: 'center'
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'expiredDate',
            key: 'expiredDate',
            align: 'center'
        },
        {
            title: '(Tổng) Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
        },
    ];
    return (
        <>
            <div className={styles.breadcrumb}><AdBread name="Quản lý vouchers" /></div>
            <div className={styles.mainContainer}>
                <div className={stylesVoucher.listTitleContainer}>
                    <div className={stylesVoucher.listTitle}><strong>DANH SÁCH QUẢN LÝ VOUCHERS</strong></div>
                    <div className={stylesVoucher.searchBar}>
                        <div>
                            <Input
                                className="cam-search-box"
                                suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Điền tên voucher bạn muốn tìm..."
                                style={{
                                    width: 400,
                                }}
                            />
                        </div>
                        <div>
                            <Button id={styles.btn3} style={{ marginLeft: '1rem' }} onClick={() => { navigate("/admin/manage_vouchers/create") }}>Tạo mới</Button>
                        </div>
                    </div>
                    <div className={stylesVoucher.listContainer}>
                        {rendered ?
                            <>
                                {!empty ?
                                    <>
                                        <Table
                                            dataSource={dataSource}
                                            columns={columns}
                                            pagination={{ total: dataSource.length, pageSize: '5', hideOnSinglePage: true }}
                                            className={stylesVoucher.table}
                                            scroll={{
                                                x: 800,
                                            }}
                                        />
                                    </> :
                                    <>
                                        <img className={styles.emptyImg} src={emptyListImg} alt="empty" />
                                        <div style={{ paddingBottom: '1rem', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}><strong>Không có voucher nào được tìm thấy</strong></div>
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
    )
}