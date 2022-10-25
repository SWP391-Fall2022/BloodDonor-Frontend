//A Gate keeper to check if Google Logged in User has registered the app before
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGoogleRoutes() {
    const [authorized, setAuthorized] = useState(false);
    // Need a render state because first render will not run useEffect until it has done the first return
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
            if (donorResponse.status === 400 && organizationResponse.status === 400) {
                setAuthorized(false)
                setRendered(true)
                console.log(rendered)
            }
            // Login Donor
            if (donorResponse.success) {
                setAuthorized(true)
                setRendered(true)
                sessionStorage.removeItem('GoogleEmail');
                sessionStorage.setItem('userRole', JSON.stringify("/donor"))
            }
            // Login Organization
            if (organizationResponse.success) {
                setAuthorized(true)
                setRendered(true)
                sessionStorage.removeItem('GoogleEmail');
                sessionStorage.setItem('userRole', JSON.stringify("/organization"))
            }
        }
        fetchAPI();
    }, [rendered]);

    if (authorized) {
        return <Navigate to={`/`} />
    } else {
        if (rendered) {
            return <Navigate to={`/register`} />
        } else {
            return <h2 style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>Đang chuyển hướng ...</h2>
        }
    }
}

