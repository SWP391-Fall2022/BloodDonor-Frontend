import { ArrowLeftOutlined } from "@ant-design/icons"
import styles from '../../organization.module.css'
import { OrBread } from '../../organization-breadcrumb'
import { Link } from "react-router-dom"
export default function OrganizationCreateNotification() {
    //Breadcrumb props
    const breadName = <><Link to="/organization/notification"><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Tạo thông báo khẩn cấp</>
    const layer1 = <Link to="/organization/notification">Quản lí thông báo khẩn cấp</Link>
    return (
        <>
            <div className={styles.breadcrumb}><OrBread layer1={layer1} layer2="Tạo thông báo khẩn cấp" name={breadName} /></div>
            <div className={styles.mainContainer}>
                <h1><strong>TẠO THÔNG BÁO KHẨN CẤP</strong></h1>

            </div>
        </>
    )
}