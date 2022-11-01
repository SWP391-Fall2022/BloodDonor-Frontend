import {AdBread} from '../AdminBreadcrumbs'
import styles from '../admin.module.css'

export default function AdminManageVouchers() {
    return (
        <>
            <div className={styles.breadcrumb}><AdBread name="Quản lý vouchers" /></div>
        </>
    )
}