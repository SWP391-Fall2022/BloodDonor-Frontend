import AvatarContainer from '../Left Side/Avatar'
import Points from '../Left Side/Points'
import Award from '../Left Side/Award'
import HistoryContainer from './historyContainer'
import styles from '../donor.module.css'
export default function History() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    return (
        <div className={styles.mainContainer} style={{width: '1000px', left: '30%'}}>
            <div className={styles.leftContainerMain} >
                <AvatarContainer />
                <Points />
                <Award />
            </div>
            <HistoryContainer />
        </div>
    )
}