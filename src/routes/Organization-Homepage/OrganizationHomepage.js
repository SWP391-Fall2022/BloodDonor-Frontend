import { Col, Row } from "antd"
import { Navigate, Outlet } from "react-router-dom"
import { FooterSmall } from "../../components/Footer/FooterSmall"
import { Navbar } from "../../components/NavBar/navbar"
import {SideBarforOrganization} from "../../components/SideBar/SideBarforOrganization"
import HomepageDetail from "./Homepage/HomepageDetail"
import "./OrganizationHomepage.css"
const OrganizationHomepage = () =>{
    // const user = JSON.parse(sessionStorage.getItem('user'))
    // const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
    // if (user === null) {
    //     return <Navigate to={`/login`} />
    // } else if (rolePath !== "/organization") {
    //     return <Navigate to={rolePath} />
    // } else {
        return (
            <div className="organization-homepage-col">
                    <div> <SideBarforOrganization/></div>
                    <div><HomepageDetail/></div>
            </div>
        )
    // }
}
export default OrganizationHomepage