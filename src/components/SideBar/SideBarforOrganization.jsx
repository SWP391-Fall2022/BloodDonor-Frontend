import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import KeyIcon from '@mui/icons-material/Key';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HomeIcon from '@mui/icons-material/Home';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FolderIcon from '@mui/icons-material/Folder';
import InfoIcon from '@mui/icons-material/Info';
import SupportIcon from '@mui/icons-material/Support';
export const SideBarforOrganization = () => {
  const [click, setClick] = useState(false);
  function handleClick() {
    setClick(!click);
    console.log(click);
  }

  return (
    <>
      <div className="sidebar-container">
          <div className="sidebar-logo">
            <p>MEDICHOR</p>
          </div>
          <div className={click ? "sidebar-links" : "unactive-sidebar-links"}>
            <NavLink end to="/sidebar_for_organization" className="sidebar-item">
              <HomeIcon className="sidebar-icon"></HomeIcon>
              <p>Trang chủ</p>
            </NavLink>

            <NavLink to="/sidebar_for_organization/campaign_history" className="sidebar-item">
              <ReportProblemIcon className="sidebar-icon"></ReportProblemIcon>
              <p>Quản lý thông báo khẩn cấp</p>
            </NavLink>

            <NavLink to="/organization/manageCampaign" className="sidebar-item">
              <LocalHospitalIcon className="sidebar-icon"></LocalHospitalIcon>
              <p>Quản lý chiến dịch</p>
            </NavLink>

            <NavLink to="/organization/manageQuestion" className="sidebar-item">
              <HelpCenterIcon className="sidebar-icon"></HelpCenterIcon>
              <p>Quản lý hỏi đáp</p>
            </NavLink>

            {/* <NavLink to="/sidebar_for_organization/voucher" className="sidebar-item">
              <LocalActivityIcon className="sidebar-icon"></LocalActivityIcon>
              <p>Tin nhắn</p>
            </NavLink> */}

            <NavLink to="/sidebar_for_organization/qna" className="sidebar-item">
              <FolderIcon className="sidebar-icon"></FolderIcon>
              <p>Thông tin tổ chức</p>
            </NavLink>
            <div>
                <NavLink to="/sidebar_for_organization/qna" className="sidebar-subitem">
                    <InfoIcon className="sidebar-icon"></InfoIcon>
                    <p>Thay đổi thông tin</p>
                </NavLink>

                <NavLink to="/sidebar_for_organization/qna" className="sidebar-subitem">
                    <KeyIcon className="sidebar-icon"></KeyIcon>
                    <p>Thay đổi mật khẩu</p>
                </NavLink>
            </div>

            <NavLink to="/sidebar_for_organization/qna" className="sidebar-item">
                <SupportIcon className="sidebar-icon"></SupportIcon>
                <p>Hướng dẫn sử dụng</p>
            </NavLink>

            {/* <NavLink to="/qna">
              <HelpCenterIcon className="sidebar-icon"></HelpCenterIcon>
              <p>Nhắn tin</p>
            </NavLink> */}
          </div>

      </div>
    </>
  );
};
