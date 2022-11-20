import React from "react";
import "antd/dist/antd.min.css";
import { SideBarforOrganization } from "../../components/SideBar/SideBarforOrganization";
import { Outlet} from 'react-router-dom';
import './OrganizationCampaign.css'

function OrganizationCampaign() {
  // const user = JSON.parse(sessionStorage.getItem('user'))
  // const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
  // if (user === null) {
  //   return <Navigate to={`/login`} />
  // } else if (rolePath !== "/organization") {
  //   return <Navigate to={rolePath} />
  // } else {
    return (
      <>
        <div className="manage-campaign" >

          <div className="side-bar"><SideBarforOrganization></SideBarforOrganization></div>
          <div><Outlet/></div>


        </div>
      </>
    )

  // }
}
export default OrganizationCampaign