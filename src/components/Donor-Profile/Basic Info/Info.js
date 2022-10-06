import AvatarContainer from '../Left Side/Avatar'
import Points from '../Left Side/Points'
import Award from '../Left Side/Award'
import BasicInfoContainer, { } from './BasicInfoContainer'
import styles from '../donor.module.css'
export default function Info() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainerMain}>
                <AvatarContainer />
                <Points />
                <Award />
            </div>
            <BasicInfoContainer />
        </div>
    )
}