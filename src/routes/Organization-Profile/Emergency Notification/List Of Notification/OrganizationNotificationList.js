import { Button, Menu, Table } from "antd"
import { Input } from 'antd';
import { useState } from "react"
import { Link } from "react-router-dom";
import styles from '../../organization.module.css'
import stylesNoti from './organizationNotificationList.module.css'
import emptyListImg from '../../../../assets/empty-list.png'

const { Search } = Input;

export default function OrganizationNotificationList() {
    //Show list in 3 mode: All, On Going or Done
    const [listState, setListState] = useState("All")
    const [empty, setEmpty] = useState(false);
    //Demo data set, must fetch from database
    const dataSource = [
        {
            key: '1',
            STT: 1,
            title: "Bệnh viện trung ương cần gấp nhớm máu AB",
            listState: 'Đang diễn ra',
        },
        {
            key: '2',
            STT: 2,
            title: "Bệnh viện trung ương cần gấp nhớm máu O",
            listState: 'Kết thúc',
        },
        {
            key: '3',
            STT: 3,
            title: "Bệnh viện trung ương cần gấp nhớm máu AB",
            listState: 'Đang diễn ra',
        },
        {
            key: '4',
            STT: 4,
            title: "Bệnh viện trung ương cần gấp nhớm máu O",
            listState: 'Kết thúc',
        },
        {
            key: '5',
            STT: 5,
            title: "Bệnh viện trung ương cần gấp nhớm máu AB",
            listState: 'Đang diễn ra',
        },
        {
            key: '6',
            STT: 6,
            title: "Bệnh viện trung ương cần gấp nhớm máu O",
            listState: 'Kết thúc',
        },
        {
            key: '7',
            STT: 7,
            title: "Bệnh viện trung ương cần gấp nhớm máu AB",
            listState: 'Đang diễn ra',
        },
        {
            key: '8',
            STT: 8,
            title: "Bệnh viện trung ương cần gấp nhớm máu O",
            listState: 'Kết thúc',
        },
    ];
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
            {!empty ?
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <h1><strong>DANH SÁCH THÔNG BÁO KHẨN CẤP</strong></h1>
                        <div className={stylesNoti.listContainer}>
                            <Menu mode="horizontal" defaultSelectedKeys={['All']}>
                                <Menu.Item key="All">
                                    Tất cả
                                </Menu.Item>
                                <Menu.Item key="On Going">
                                    Đang diễn ra
                                </Menu.Item>
                                <Menu.Item key="Done">
                                    Kết thúc
                                </Menu.Item>
                            </Menu>
                            <div className={stylesNoti.searchCreate}><Search enterButton /><Link to="/organization/notification/create"><Button className={styles.btn3}>Tạo mới</Button></Link></div>
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                pagination={{ total: dataSource.length, pageSize: '5' }}
                                className={stylesNoti.table}
                            />
                        </div>
                    </div>
                </div> :
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <h1><strong>DANH SÁCH THÔNG BÁO KHẨN CẤP</strong></h1>
                        <div className={stylesNoti.listContainer}>
                            <Menu mode="horizontal" defaultSelectedKeys={['All']}>
                                <Menu.Item key="All">
                                    Tất cả
                                </Menu.Item>
                                <Menu.Item key="On Going">
                                    Đang diễn ra
                                </Menu.Item>
                                <Menu.Item key="Done">
                                    Kết thúc
                                </Menu.Item>
                            </Menu>
                            <img className={styles.emptyImg} src={emptyListImg} alt="empty" />
                            <div style={{ paddingBottom: '1rem' }}><strong>Chưa có thông báo khẩn cấp nào được ghi lại</strong></div>
                            <Link to="/organization/notification/create"><Button className={styles.btn3} style={{ marginBottom: '1rem' }}>Tạo thông báo</Button></Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}