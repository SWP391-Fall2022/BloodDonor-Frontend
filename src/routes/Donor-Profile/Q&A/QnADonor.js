import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
// import Award from '../../../components/Avatar, Point, Reward/Award'
import QnAContainer from './QnAContainer'
import styles from '../donor.module.css'
export default function QnADonor() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                {/* <Award /> */}
            </div>
            <QnAContainer />
        </div>
    )
}