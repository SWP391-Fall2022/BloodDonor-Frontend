import AvatarContainer from '../Left Side/Avatar'
import Points from '../Left Side/Points'
import Award from '../Left Side/Award'
import VouchersContainer from './VouchersContainer'
import VouchersContainer2 from './VouchersCointainer2'
import styles from '../donor.module.css'
export default function Vouchers() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div style={{marginBottom: '1000px'}}>
            <div className={styles.mainContainer} style={{ height: '1400px' }}>
                <div className={styles.leftContainerMain}>
                    <AvatarContainer />
                    <Points />
                    <Award />
                </div>
                <VouchersContainer />
                <VouchersContainer2 />
            </div></div>
    )
}