import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { Navbar } from '../../components/NavBar/navbar';
import { SideBarforDonor } from '../../components/SideBar/SideBarforDonor'
import styles from './donor.module.css'
function DonorProfile() {

    const [rendered, setRendered] = useState(false)
    const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    // console.log(location.pathname)

    useEffect(() => {
        // Send JWT to backend to get user
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        async function fetchAPI() {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            // console.log(response);
            if (response.status === 400) {
                sessionStorage.clear()
                notification.error({
                    message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                    placement: "top"
                });
                navigate("/");
            }
            if (response.success) {
                //current pathname/route

                sessionStorage.setItem('avatar', JSON.stringify(response.body.avatar))
                sessionStorage.setItem('name', JSON.stringify(response.body.name))
                setUser({
                    "name": response.body.name,
                    "phone": response.body.user.phone,
                    "birthday": response.body.birthday,
                    "sex": response.body.sex,
                    "identityNum": response.body.identityNum,
                    "bloodType": response.body.bloodType,
                    "districtId": response.body.user.districtId,
                    "addressDetails": response.body.user.addressDetails,
                    "anamnesis": response.body.anamnesis,
                })
                setRendered(true)
            }
        }
        fetchAPI();
    }, []);

    if (rolePath === null || rolePath !== "/donor") {
        return <Navigate to={`/`} />
    } else if (rendered) {
        return (
            <>
                <Navbar />
                <div class={styles.donorSideBar}><SideBarforDonor /></div>
                <div ><Outlet context={[user, setUser]}/></div>
                <FooterSmall />
            </>
        )
    } else {
        return <div>Đang cập nhật thông tin</div>
    }
}

export default DonorProfile