import {AdBread} from '../AdminBreadcrumbs'
import styles from '../admin.module.css'

export default function AdminManageOrganization() {
    return (
        <>
            <div className={styles.breadcrumb}><AdBread name="Quản lý tổ chức" /></div>
        </>
    )
}