import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
import Award from '../../../components/Avatar, Point, Reward/Award'
import HistoryContainer from './historyContainer'
import styles from '../donor.module.css'
export default function History() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                <Award />
            </div>
            <div><HistoryContainer /></div>
        </div>
    )
}