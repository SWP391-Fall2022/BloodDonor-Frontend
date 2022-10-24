import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { SideBarforOrganization } from '../../components/SideBar/SideBarforOrganization'
function OrganizationProfile() {

    const [rendered, setRendered] = useState(false)
    const location = useLocation();
    const rolePath = JSON.parse(sessionStorage.getItem('userRole'))

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
            console.log(response);
            if (response.success) {
                //current pathname/route
                if (location.pathname === "/organization/changePassword") {
                    sessionStorage.setItem('avatar', JSON.stringify(response.body.avatar))
                    sessionStorage.setItem('name', JSON.stringify(response.body.name))                    
                    sessionStorage.removeItem('user')
                }
                if (location.pathname === "/organization") {
                    sessionStorage.setItem('avatar', JSON.stringify(response.body.avatar))
                    sessionStorage.setItem('name', JSON.stringify(response.body.name))
                    const user = {
                        "name": response.body.name,
                        "phone": response.body.phone,
                        "taxCode": response.body.taxCode,
                        "email": response.body.email,
                        "districtId": response.body.districtId,
                        "addressDetails": response.body.addressDetails,
                        "introduction": response.body.introduction,
                    }
                    sessionStorage.setItem('user', JSON.stringify(user))
                }
                setRendered(true)
            } else {

            }
        }
        fetchAPI();
    }, []);

    if (rolePath === null || rolePath !== "/organization") {
        return <Navigate to={`/`} />
    } else if (rendered) {
        return (
            <>
                <Row >
                    <Col span={6}><SideBarforOrganization /></Col>
                    <Col span={18}><Outlet /></Col>
                </Row>
                <FooterSmall />
            </>
        )
    } else {
        return (
            <>
                <div>Đang cập nhật thông tin</div>
            </>
        )
    }
}

export default OrganizationProfile