import { Outlet, Navigate } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { Navbar } from '../../components/NavBar/navbar';
import { SideBarforDonor } from '../../components/SideBar/SideBarforDonor'
import styles from './donor.module.css'
function DonorProfile() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
    if (user === null) {
        return <Navigate to={`/login`} />
    } else if (rolePath !== "/donor") {
        return <Navigate to={rolePath} />
    } else {
        return (
            <>
                <Navbar />
                <div class={styles.donorSideBar}><SideBarforDonor /></div>
                <div ><Outlet /></div>
                <FooterSmall />
            </>
        )
    }
}

export default DonorProfile