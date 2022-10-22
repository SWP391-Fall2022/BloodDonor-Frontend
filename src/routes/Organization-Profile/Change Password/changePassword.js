import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Award from '../../../components/Avatar, Point, Reward/Award'
import ChangePasswordSide from './changePasswordSide'
import styles from '../organization.module.css'
export default function OrganizationChangePassword() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainerMain}>
                <AvatarContainer />
                <Award />
            </div>
            <div><ChangePasswordSide/></div>
        </div>
    )
}