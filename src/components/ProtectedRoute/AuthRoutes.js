//A Gate keeper to check if Google Logged in User has registered the app before
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from '../../others/UserRoleContext'

export default function AuthGoogleRoutes() {
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();
    const [rendered, setRendered] = useState(false)
    const [userRole, setUserRole] = useState(JSON.parse(sessionStorage.getItem('userRole')))
    const { setAdmin, setDonor, setOrg } = useContext(UserContext)

    useEffect(() => {
        // Login Donor
        if (userRole === "DONOR") {
            setAuthorized(true)
            setDonor()
            sessionStorage.setItem('userRole', JSON.stringify("/donor"))
        }

        // Login Organization
        if (userRole === "ORGANIZATION") {
            setAuthorized(true)
            setOrg()
            sessionStorage.setItem('userRole', JSON.stringify("/organization"))
        }

        //Login Admin
        if (userRole === "ADMIN") {
            setAuthorized(true)
            setAdmin()
            sessionStorage.setItem('userRole', JSON.stringify("/admin"))
        }

    }, [navigate]);

    if (authorized) {
        if (userRole === "DONOR") {
            return <Navigate to={`/`} />
        } else if (userRole === "ORGANIZATION") {
            return <Navigate to={`/organization`} />
        } else if (userRole === "ADMIN") {
            return <Navigate to={`/admin`} />
        }
    } else {
        if (rendered) {
            return <Navigate to={`/register`} />
        } else {
            return <div style={{ textAlign: 'center' }}><Spin indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />} /></div>
        }
    }
}

