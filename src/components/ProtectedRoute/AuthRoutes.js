//A Gate keeper to check if Google Logged in User has registered the app before
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AuthGoogleRoutes() {
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        // Send JWT to backend to get user
        const userRole = JSON.parse(sessionStorage.getItem('userRole'))
        // Login Donor
        if (userRole === "DONOR") {
            setAuthorized(true)
            sessionStorage.setItem('userRole', JSON.stringify("/donor"))
        }

        // Login Organization
        if (userRole === "ORGANIZATION") {
            setAuthorized(true)
            sessionStorage.setItem('userRole', JSON.stringify("/organization"))
        }

        //Login Admin
        if (userRole === "ADMIN") {
            setAuthorized(true)
            sessionStorage.setItem('userRole', JSON.stringify("/admin"))
        }

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

