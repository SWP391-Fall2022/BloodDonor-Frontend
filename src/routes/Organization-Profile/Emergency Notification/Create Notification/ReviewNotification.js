import { ArrowLeftOutlined } from "@ant-design/icons"
import styles from '../../organization.module.css'
import { OrBread } from '../../organization-breadcrumb'
import { Link } from "react-router-dom"
export default function OrganizationReviewNotification() {
    //Breadcrumb props
    const breadName = <><Link to="/organization/notification/create"><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Xem trước</>
    const layer1 = <Link to="/organization/notification">Quản lí thông báo khẩn cấp</Link>
    const layer2 = <Link to="/organization/notification/create">Tạo thông báo khẩn cấp</Link>
    return (
        <>
            <div className={styles.breadcrumb}><OrBread layer1={layer1} layer2={layer2} layer3="Xem trước" name={breadName} /></div>
            <div className={styles.mainContainer}>
                <h1><strong>THÔNG BÁO NÀY LÀ TỰA ĐỀ</strong></h1>

            </div>
        </>
    )
}