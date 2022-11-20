import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
// import Award from '../../../components/Avatar, Point, Reward/Award'
import ChangePasswordSide from './changePasswordSide'
import styles from '../organization.module.css'
import { OrBread } from '../organization-breadcrumb'
export default function OrganizationChangePassword() {
    return (
        <>
            <div className={styles.breadcrumb}><OrBread layer1="Thông tin tổ chức" layer2="Thay đổi mật khẩu" name="Thay đổi mật khẩu" /></div>
            <div className={styles.mainContainer}>
                <div className={styles.leftContainerMain}>
                    <AvatarContainer />
                    {/* <Award /> */}
                </div>
                <ChangePasswordSide />
            </div>
        </>
    )
}