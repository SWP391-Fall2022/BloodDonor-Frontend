//A Gate keeper to check if Google Logged in User has registered the app before
import { LoadingOutlined } from "@ant-design/icons";
import { notification, Spin } from "antd";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AuthGoogleRoutes() {
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        // Send JWT to backend to get user
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        async function fetchAPI() {
            // Check donor role
            const donorResponse = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            // Check organization role
            const organizationResponse = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/organization/getInfo`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })

            console.log(donorResponse)
            console.log(organizationResponse)

            //No JWT, kick back to home page
            if (donorResponse.status === 400 && organizationResponse.status === 400) {
                setAuthorized(true)
            }

            // First time login with google success (Have not registered before)
            if (donorResponse.status === 404 && organizationResponse.status === 500) {
                setAuthorized(false)
                notification.error({
                    message: "Email này chưa từng đăng kí app",
                    description: "Vui lòng nhập email này để đăng kí. Sau khi đăng kí bạn có thể đăng nhập bằng Google mà không cần tài khoản, mật khẩu.",
                    duration: 10,
                    placement: "top"
                });
                setRendered(true)
            }
            // Login Donor
            if (donorResponse.success) {
                setAuthorized(true)
                sessionStorage.setItem('userRole', JSON.stringify("/donor"))
            }
            // Login Organization
            if (organizationResponse.success) {
                setAuthorized(true)
                sessionStorage.setItem('userRole', JSON.stringify("/organization"))
            }
        }
        fetchAPI();
    }, [navigate]);

    if (authorized) {
        return <Navigate to={`/`} />
    } else {
        if (rendered) {
            return <Navigate to={`/register`} />
        } else {
            return <div style={{ textAlign: 'center' }}><Spin indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />} /></div>
        }
    }
}

