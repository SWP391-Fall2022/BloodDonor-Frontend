import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
// import Award from '../../../components/Avatar, Point, Reward/Award'
import BasicInfoContainer, { } from './BasicInfoContainer'
import styles from '../donor.module.css'
export default function Info() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                {/* <Award /> */}
            </div>
            <BasicInfoContainer />
        </div>
    )
}