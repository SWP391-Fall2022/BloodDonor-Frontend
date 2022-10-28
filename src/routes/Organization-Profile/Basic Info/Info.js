import AvatarContainer from '../../../components/Avatar, Point, Reward/Avatar'
import Award from '../../../components/Avatar, Point, Reward/Award'
import BasicInfoContainer, { } from './BasicInfoContainer'
import styles from '../organization.module.css'
import {OrBread} from '../organization-breadcrumb'
export default function OrganizationInfo() {
    return (
        <>
            <div className={styles.breadcrumb}><OrBread layer1="Thông tin tổ chức" layer2="Thay đổi thông tin" name="Thay đổi thông tin" /></div>
            <div className={styles.mainContainer}>
                <div className={styles.leftContainerMain}>
                    <AvatarContainer />
                    <Award />
                </div>
                <div><BasicInfoContainer /></div>
            </div>
        </>
    )
}