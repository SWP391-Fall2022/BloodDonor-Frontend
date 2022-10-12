import { Col, Row } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { Navbar } from '../../components/NavBar/navbar';
function DonorProfile() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user === null) {
        return <Navigate to={`/login`} />
    } else
        return (
            <>
                <Navbar />
                <Row >
                    <Col span={6}></Col>
                    <Col span={18}><Outlet /></Col>
                </Row>
                <FooterSmall />
            </>
        )
}

export default DonorProfile