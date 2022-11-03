import { Skeleton } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './leftside.module.css'
export default function Points() {
    const [rendered, setRendered] = useState(false)
    const [points, setpoints] = useState(0)
    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        async function fetchAPI() {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/points`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            // console.log(response);
            if (response.status === 200) {
                setpoints(response.body)
            }
        }
        fetchAPI();
        setRendered(true)
    }, [])

    return (<>
        {rendered ?
            <div className={styles.leftContainer}>
                <div className={styles.leftSideText}>Bạn đã tích được</div>
                <div className={styles.leftSideText}>{points} điểm</div>
            </div>
            :
            <div className={styles.leftContainer}>
                <Skeleton active />
            </div>
        }
    </>
    )
}