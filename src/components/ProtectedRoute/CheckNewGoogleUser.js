//A Gate keeper to check if Google Logged in User has registered the app before
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGoogleRoutes() {
    const [role, setRole] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        async function fetchAPI() {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            //This email has been registered before
            if (response === undefined) {
                setAuthorized(false)
                setRendered(true)
            }
            if (response !== undefined) {
                setAuthorized(true)
                setRole(response.body.user.role)
                setRendered(true)
                sessionStorage.setItem('user', JSON.stringify(response.body))
            }
        }
        fetchAPI();
    }, []);

    if (authorized) {
        // return <Navigate to={'/profile/2'}/>
        return <Navigate to={`/donor`} />
    } else {
        if (rendered) {
            return <Navigate to={`/register`} />
        } else {
            <div>We are redirect, please wait for a bit</div>
        }
    }
}

