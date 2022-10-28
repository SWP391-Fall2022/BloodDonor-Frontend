import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { SideBarforOrganization } from '../../components/SideBar/SideBarforOrganization'
import styles from './organization.module.css'
// The main container for logged in Organization
// Everything inside organization will show up here
function OrganizationProfile() {

    const [rendered, setRendered] = useState(false)
    const [user, setUser] = useState(null)
    const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
    const navigate = useNavigate();

    useEffect(() => {
        // Send JWT to backend to get user
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        async function fetchAPI() {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/organization/getInfo`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            // console.log(response);
            //Bad request/ JWT expired
            if (response.status === 400) {
                sessionStorage.clear()
                notification.error({
                    message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                    placement: "top"
                });
                navigate("/");
            }
            if (response.success) {
                sessionStorage.setItem('avatar', JSON.stringify(response.body.avatar))
                sessionStorage.setItem('name', JSON.stringify(response.body.name))
                setUser({
                    "name": response.body.name,
                    "phone": response.body.phone,
                    "taxCode": response.body.taxCode,
                    "email": response.body.email,
                    "districtId": response.body.districtId,
                    "addressDetails": response.body.addressDetails,
                    "introduction": response.body.introduction,
                })
                setRendered(true)
            }
        }
        fetchAPI();
    }, []);

    if (rolePath === null || rolePath !== "/organization") {
        return <Navigate to={`/`} />
    } else if (rendered) {
        return (
            <>
                <div className={styles.organizationSideBar}><SideBarforOrganization /></div>
                <div><Outlet context={[user, setUser]} /></div>
                <FooterSmall />
            </>
        )
    } else {
        return <div>Đang cập nhật thông tin</div>
    }
}

export default OrganizationProfile