import styles from '../donor.module.css'
import { VoucherCard } from './VoucherCard'
export default function VouchersContainer() {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>KHO VOUCHER CỦA BẠN</div>
            <VoucherCard />
            <VoucherCard />
            <VoucherCard />
        </div>
    )
}