import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Award from '../../../components/Avatar, Point, Reward/Award'
import BasicInfoContainer, { } from './BasicInfoContainer'
import styles from '../organization.module.css'
export default function OrganizationInfo() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainerMain}>
                <AvatarContainer />
                <Award />
            </div>
            <div><BasicInfoContainer /></div>
        </div>
    )
}