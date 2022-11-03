import {AdBread} from '../AdminBreadcrumbs'
import styles from '../admin.module.css'

export default function AdminManageNews() {
    return (
        <>
            <div className={styles.breadcrumb}><AdBread name="Quản lý tin tức" /></div>
        </>
    )
}