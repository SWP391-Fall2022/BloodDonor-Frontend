import styles from '../donor.module.css'
export default function Points() {
    //Reminder: Insert user points here
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div className={styles.leftContainer}>
            <div className={styles.leftSideText}>Bạn đã tích được</div>
            <div className={styles.leftSideText}>9E10 điểm</div>
        </div>
    )
}