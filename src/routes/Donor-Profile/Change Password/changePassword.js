import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
import Award from '../../../components/Avatar, Point, Reward/Award'
import ChangePasswordSide from './changePasswordSide'
import styles from '../donor.module.css'
export default function ChangePassword() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                <Award />
            </div>
            <div><ChangePasswordSide /></div>
        </div>
    )
}