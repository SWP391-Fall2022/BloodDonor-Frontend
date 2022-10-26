//A Gate keeper to check if Google Logged in User has registered the app before
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function AuthGoogleRoutes() {
    const [authorized, setAuthorized] = useState(false);
    const { state } = useLocation();
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

            // console.log(donorResponse)
            // console.log(organizationResponse)

            // First time login with google success (Have not registered before)
            if ((donorResponse.status === 400 || donorResponse.status === 404) && (organizationResponse.status === 500 || organizationResponse.status === 400)) {
                setAuthorized(false)
                setRendered(true)
                if (state !== null) {
                    navigate("/register", { state: { googleEmail: state.googleEmail } })
                }
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
            if (state === null) {
                return <Navigate to={`/`} />
            }
        } else {
            return <h2 style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>Đang chuyển hướng ...</h2>
        }
    }
}

