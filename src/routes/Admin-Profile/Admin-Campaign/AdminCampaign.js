import {AdBread} from '../AdminBreadcrumbs'
import styles from '../admin.module.css'

export default function AdminManageCampaign() {
    return (
        <>
            <div className={styles.breadcrumb}><AdBread name="Quản lý chiến dịch" /></div>
        </>
    )
}