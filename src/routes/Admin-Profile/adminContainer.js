import { Outlet } from 'react-router-dom';
import { SideBarforAdmin } from '../../components/SideBar/SideBarforAdmin'
import styles from './admin.module.css'

export default function AdminProfile() {
    return (
        <>
            <div class={styles.adminSideBar}><SideBarforAdmin /></div>
            <div ><Outlet /></div>
        </>
    )
}