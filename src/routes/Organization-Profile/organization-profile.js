import { Outlet, Navigate } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { SideBarforOrganization } from '../../components/SideBar/SideBarforOrganization'
import styles from './organization.module.css'
function OrganizationProfile() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
    if (user === null) {
        return <Navigate to={`/login`} />
    } else if (rolePath !== "/organization") {
        return <Navigate to={rolePath} />
    } else {
        return (
            <>
                <div class={styles.organizationSideBar}><SideBarforOrganization /></div>
                <div><Outlet /></div>
                <FooterSmall />
            </>
        )
    }
}

export default OrganizationProfile