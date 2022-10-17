import { Col, Row } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { Navbar } from '../../components/NavBar/navbar';
import { SideBarforDonor } from '../../components/SideBar/SideBarforDonor'
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
                <Row >
                    <Col span={6} style={{marginTop: '90px'}}><SideBarforDonor /></Col>
                    <Col span={18}><Outlet /></Col>
                </Row>
                <FooterSmall />
            </>
        )
    }
}

export default DonorProfile