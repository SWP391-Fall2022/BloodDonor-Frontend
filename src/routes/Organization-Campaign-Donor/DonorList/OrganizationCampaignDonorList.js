import { PageHeader } from "antd"
import {SideBarforOrganization} from "../../../components/SideBar/SideBarforOrganization"
import DonorList from "./DonorList"
import "./organizationcampaigndonorlist.css"
const OrganizationCampaignDonorList = () =>{
    // const user = JSON.parse(sessionStorage.getItem('user'))
    // const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
    // if (user === null) {
    //     return <Navigate to={`/login`} />
    // } else if (rolePath !== "/organization") {
    //     return <Navigate to={rolePath} />
    // } else {
        return (
            <div className="organization-donorlist-col">
                    <div><SideBarforOrganization/></div>
                    <div>
                        <PageHeader className="site-page-header" title="Danh sách tình nguyện viên" />
                        <DonorList/>
                    </div>
            </div>
        )
    // }
}
export default OrganizationCampaignDonorList 