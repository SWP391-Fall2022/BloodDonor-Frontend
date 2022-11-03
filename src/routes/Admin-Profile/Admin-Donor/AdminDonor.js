import {AdBread} from '../AdminBreadcrumbs'
import styles from '../admin.module.css'

export default function AdminManageDonor() {
    return (
        <>
            <div className={styles.breadcrumb}><AdBread name="Quản lý tình nguyện" /></div>
        </>
    )
}