import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Points from '../../../components/Avatar, Point, Reward/Points'
import Award from '../../../components/Avatar, Point, Reward/Award'
import VouchersContainer from './VouchersContainer'
import VouchersContainer2 from './VouchersCointainer2'
import styles from '../donor.module.css'
export default function Vouchers() {
    return (
        <div>
            <div className={styles.mainContainer} >
                <div className={styles.leftContainerMain}>
                    <AvatarContainer />
                    <Points />
                    {/* <Award /> */}
                </div>
                <VouchersContainer />
                <VouchersContainer2 />
            </div>
        </div>
    )
}