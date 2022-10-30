import { OrBread } from "../organization-breadcrumb";
import styles from '../organization.module.css'

export default function OrganizationGuide() {
    return (
        <>
            <div className={styles.breadcrumb}><OrBread name="Quản lý hỏi đáp" /></div>
            <h1 className={styles.mainContainer}><strong>Tính năng hiện đang được cập nhật</strong></h1>
        </>
    )
}