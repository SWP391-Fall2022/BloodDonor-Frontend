import { Menu } from "antd"
import Search from "antd/lib/transfer/search"
import { useState } from "react"
import styles from '../../organization.module.css'

export default function OrganizationNotificationList() {
    //Show list in 3 mode: All, On Going or Done
    const [listState, setListState] = useState("All")
    return (
        <>
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1><strong>DANH SÁCH THÔNG BÁO KHẨN CẤP</strong></h1>
                    <div style={{ background: 'white' }}>
                        <Menu mode="horizontal" defaultSelectedKeys={['All']}>
                            <Menu.Item key="All">
                                Tất cả
                            </Menu.Item>
                            <Menu.Item key="On Going">
                                Đăng diễn ra
                            </Menu.Item>
                            <Menu.Item key="Done">
                                Kết thúc
                            </Menu.Item>
                        </Menu>
                        <Search className='search' placeholder="Nhập tên bài báo mà bạn muốn tìm" enterButton ></Search>
                        <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                    </div>
                </div>
            </div>
        </>
    )
}