import { notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
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
    const effectRan = useRef(false)
    // console.log(location.pathname)

    useEffect(() => {
        // Send JWT to backend to get user
        if (effectRan.current === true) {
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
                console.log(response);
                if (response.status === 400) {
                    notification.error({
                        message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                        placement: "top"
                    });
                    sessionStorage.clear()
                    navigate("/");
                } else if (rolePath === null || rolePath !== "/donor" || response.status === 404) {
                    sessionStorage.clear()
                    notification.error({
                        message: "Vui lòng đăng nhập người hiến máu",
                        placement: "top"
                    });
                    navigate("/");
                } else if (response.status === 200) {
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
        }
        return () => {
            effectRan.current = true
        }
    }, [rolePath]);

    if (rendered) {
        return (
            <>
                <Navbar />
                <div className={styles.donorSideBar}><SideBarforDonor /></div>
                <div ><Outlet context={[user, setUser]} /></div>
                <div className={styles.donorFooterSmall}><FooterSmall /></div>
            </>
        )
    } else {
        return <div>Đang cập nhật thông tin</div>
    }
}

export default DonorProfile