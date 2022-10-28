import { useState } from 'react';
import styles from '../donor.module.css'
import { VoucherCard } from './VoucherCard'
import empty from '../../../assets/empty-list.png'

export default function VouchersContainer() {
    const [emptyList, setEmptyList] = useState(true);
    if (!emptyList) {
        return (
            <div className={styles.infoContainer}>
                <div className={styles.title}>KHO VOUCHER CỦA BẠN</div>
                <VoucherCard />
                <VoucherCard />
                <VoucherCard />
            </div>
        )
    } else {
        return (
            <div className={`${styles.infoContainer} ${styles.voucherContainer}`}>
                <div className={styles.title}>KHO VOUCHER CỦA BẠN</div>
                <img className={styles.img} src={empty} alt="empty" />
                <div><strong>Bạn vẫn chưa có voucher nào trong kho</strong></div>
                <div><strong>Hãy dùng điểm thưởng để đổi voucher</strong></div>
            </div>
        )
    }
}