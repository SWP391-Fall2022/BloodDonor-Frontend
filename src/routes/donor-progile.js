import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/NavBar/navbar';
// import { PageFooterBottom } from '../components/Footer/PageFooterBottom';
function DonorProfile() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user === null) {
        return <Navigate to={`/login`} />
    } else
        return (
            <>
                <Navbar />
                <Outlet />
                {/* <PageFooterBottom /> */}
            </>
        )
}

export default DonorProfile