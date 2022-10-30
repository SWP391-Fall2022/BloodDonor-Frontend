import OrganizationNotificationList from './OrganizationNotificationList'
import styles from '../../organization.module.css'
import { OrBread } from '../../organization-breadcrumb'
export default function OrganizationNotificationListContainer() {
    return (
        <>
            <div className={styles.breadcrumb}><OrBread name="Quản lí thông báo khẩn cấp" /></div>
            <div className={styles.mainContainer}>                
                <OrganizationNotificationList />
            </div>
        </>
    )
}