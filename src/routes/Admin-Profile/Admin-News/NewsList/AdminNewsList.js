
import styles from '../../admin.module.css'
import { AdBread } from '../../AdminBreadcrumbs'
import NewsList from './NewsList'

export default function AdminNewsList() {
    return (
        <>
            <div className={styles.mainContainer}>
                <NewsList/>
            </div>
        </>
    )
}