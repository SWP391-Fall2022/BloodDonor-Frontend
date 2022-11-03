import { PageHeader } from "antd"
import DonorList from "./DonorList/DonorList"
import "./adminnews.css"
import { SideBarforAdmin } from "../../components/SideBar/SideBarforAdmin"
const AdminNews = () =>{
    // const user = JSON.parse(sessionStorage.getItem('user'))
    // const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
    // if (user === null) {
    //     return <Navigate to={`/login`} />
    // } else if (rolePath !== "/organization") {
    //     return <Navigate to={rolePath} />
    // } else {
        return (
            <div className="organization-donorlist-col">
                    <div><SideBarforAdmin/></div>
                    <div>
                        <PageHeader className="site-page-header" title="Trang chủ" />
                        <DonorList/>
                    </div>
            </div>
        )
    // }
}
export default AdminNews 