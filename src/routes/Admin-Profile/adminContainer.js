import { notification } from 'antd';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { SideBarforAdmin } from '../../components/SideBar/SideBarforAdmin'
import { UserContext } from '../../others/UserRoleContext'
import styles from './admin.module.css'

export default function AdminProfile() {
    const [render, setRender] = useState(false)
    const [access, setAccess] = useState(false)
    const navigate = useNavigate()
    const { role } = useContext(UserContext)
    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === true) {
            if (role !== "ADMIN") {
                notification.error({
                    message: 'Chỉ admin mới được phép truy cập',
                    placement: 'top'
                })
                navigate("/");
            } else {
                setAccess(true)
            }
            setRender(true)
        }
        return () => {
            effectRan.current = true
        }
    }, [])

    if (render) {
        if (access) {
            return (
                <>
                    <div className={styles.adminSideBar}><SideBarforAdmin /></div>
                    <div ><Outlet /></div>
                </>
            )
        } else {
            <Navigate to="/" />
        }
    } else {
        return <div>Đang cập nhật thông tin</div>
    }
}