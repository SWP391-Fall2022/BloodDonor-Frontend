import AvatarContainer from '../Left Side/Avatar'
import Points from '../Left Side/Points'
import Award from '../Left Side/Award'
import QnAContainer from './QnAContainer'
import styles from '../donor.module.css'
export default function QnADonor() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                <Award />
            </div>
            <QnAContainer />
        </div>
    )
}