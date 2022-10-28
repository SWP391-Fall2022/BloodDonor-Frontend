import React from "react";
import "antd/dist/antd.css";
import { SideBarforOrganization } from "../../components/SideBar/SideBarforOrganization";
import { Outlet, Navigate } from 'react-router-dom';
import './OrganizationQuestion.css'

function OrganizationQuestion() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
  // if (user === null) {
  //   return <Navigate to={`/login`} />
  // } else if (rolePath !== "/organization") {
  //   return <Navigate to={rolePath} />
  // } else {
    return (
      <>
        <div id="manage-question" >

          <div className="side-bar"><SideBarforOrganization></SideBarforOrganization></div>
          <div><Outlet/></div>


        </div>
      </>
    )

  // }
}
export default OrganizationQuestion