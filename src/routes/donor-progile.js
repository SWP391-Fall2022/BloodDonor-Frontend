import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
function DonorProfile() {

    // const user = JSON.parse(sessionStorage.getItem('user'))
    // console.log(user)
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default DonorProfile