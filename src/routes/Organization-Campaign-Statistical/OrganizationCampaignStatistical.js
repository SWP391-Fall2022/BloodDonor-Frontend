import {SideBarforOrganization} from "../../components/SideBar/SideBarforOrganization"
import CampaignStatistical from "./CampaignStatistical/CampaignStatistical"
import "./organizationcampaignstatistical.css"
const OrganizationCampaignStatistical = () =>{
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
                    <div><CampaignStatistical/></div>
            </div>
        )
    // }
}
export default OrganizationCampaignStatistical