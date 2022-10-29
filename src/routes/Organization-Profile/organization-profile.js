import { Col, Row } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { Navbar } from '../../components/NavBar/navbar';
import {SideBarforOrganization} from"../../components/SideBar/SideBarforOrganization";
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
                
                <Row >
                    <Col span={6}><SideBarforOrganization/></Col>
                    <Col span={18}><Outlet /></Col>
                </Row>
                {/* <FooterSmall /> */}
            </>
        )
    }
}

export default OrganizationProfile