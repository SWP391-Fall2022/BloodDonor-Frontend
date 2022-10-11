import { Col, Row } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar/navbar';
// import { PageFooterBottom } from '../components/Footer/PageFooterBottom';
function DonorProfile() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    if (user === null) {
        return <Navigate to={`/login`} />
    } else
        return (
            <>
                <Navbar />
                <Row>
                    <Col span={6}></Col>
                    <Col span={18}><Outlet /></Col>
                </Row>
                {/* <PageFooterBottom /> */}
            </>
        )
}

export default DonorProfile