import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function AuthRoutes() {
    const [role, setRole] = useState(null);
    const [authorized, setAuthorized] = useState(false);

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
            setAuthorized(response.success)
            setRole(response.body.user.role)
            sessionStorage.setItem('user', JSON.stringify(response.body))
        }
        fetchAPI();
    }, []);
    if (authorized) {
        // return <Navigate to={'/profile/2'}/>
        return <Navigate to={`/donor`}/>
    } else {
        return <>Failed</>
    }
}

