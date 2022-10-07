import styles from '../donor.module.css'
import GoldShield from '../../../assets/awards/Gold-Shield.png'
import SilSol from '../../../assets/awards/Sil-Sol.png'
import CopCoin from '../../../assets/awards/Cop-Coin.png'
export default function Award() {
    //Reminder: Insert user awards based on points here
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div className={styles.leftContainer}>
            <div className={styles.leftSideText}>Thành tích</div>
            <div className={styles.awardImgContainer}>
                <img className={styles.awardImg1} src={GoldShield} alt='' />
                <img className={styles.awardImg2} src={SilSol} alt='' />
                <img className={styles.awardImg3} src={CopCoin} alt='' />
            </div>
        </div>
    )
}