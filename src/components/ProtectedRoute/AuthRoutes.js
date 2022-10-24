//A Gate keeper to check if Google Logged in User has registered the app before
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGoogleRoutes() {
    const [role, setRole] = useState(null);
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

            console.log(donorResponse)
            console.log(organizationResponse)
            
            // First time login with google success (Have not registered before)
            if (donorResponse === undefined && organizationResponse === undefined) {
                setAuthorized(false)
                setRendered(true)
            }
            // Login Donor
            if (donorResponse.success) {
                setAuthorized(true)
                setRole("DONOR")
                setRendered(true)
                sessionStorage.setItem('user', JSON.stringify(donorResponse.body))
                sessionStorage.setItem('userRole', JSON.stringify("/donor"))
            }
            // Login Organization
            if (organizationResponse.success) {
                setAuthorized(true)
                setRole("ORGANIZATION")
                setRendered(true)
                sessionStorage.setItem('user', JSON.stringify(organizationResponse.body))
                sessionStorage.setItem('userRole', JSON.stringify("/organization"))
            }
        }
        fetchAPI();
    }, []);

    if (authorized) {
        if (role === "DONOR") {
            return <Navigate to={`/donor`} />
        }
        if (role === "ORGANIZATION") {
            return <Navigate to={`/organization`} />
        }
    } else {
        if (rendered) {
            return <Navigate to={`/register`} />
        } else {
            return <h2 style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>We are redirect, please wait for a bit</h2>
        }
    }
}

