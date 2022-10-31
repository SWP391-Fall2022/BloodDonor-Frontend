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
export const SideBarforAdmin = () => {
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
          <div className={click ? "sidebar-links" : "unactive-sidebar-links"} title="Trang chủ">
            <NavLink end to="/sidebar_for_admin" className="sidebar-item">
              <HomeIcon className="sidebar-icon"></HomeIcon>
              <p>Trang chủ</p>
            </NavLink>

            <NavLink to="/sidebar_for_organization/campaign_history" className="sidebar-item" title="Quản lý thông báo khẩn cấp">
              <ReportProblemIcon className="sidebar-icon"></ReportProblemIcon>
              <p>Quản lý thông báo khẩn cấp</p>
            </NavLink>

            <NavLink to="/sidebar_for_organization/change_pw" className="sidebar-item" title="Quản lý chiến dịch">
              <LocalHospitalIcon className="sidebar-icon"></LocalHospitalIcon>
              <p>Quản lý chiến dịch</p>
            </NavLink>

            {/* <NavLink to="/sidebar_for_organization/voucher" className="sidebar-item">
              <LocalActivityIcon className="sidebar-icon"></LocalActivityIcon>
              <p>Tin nhắn</p>
            </NavLink> */}

            <NavLink to="/sidebar_for_organization/qna" className="sidebar-item" title="Quản lý tài khoản">
              <FolderIcon className="sidebar-icon"></FolderIcon>
              <p>Quản lý tài khoản</p>
            </NavLink>
            <div>
                <NavLink to="/sidebar_for_organization/qna" className="sidebar-subitem" title="Quản lý tin tức">
                    <InfoIcon className="sidebar-icon"></InfoIcon>
                    <p>Quản lý tin tức</p>
                </NavLink>

                <NavLink to="/sidebar_for_organization/qna" className="sidebar-subitem" title="Quản lý tổ chức">
                    <KeyIcon className="sidebar-icon"></KeyIcon>
                    <p>Quản lý tổ chức</p>
                </NavLink>
            </div>

            <NavLink to="/sidebar_for_organization/change_pnb" className="sidebar-item" title="Quản lý tin tức">
              <HelpCenterIcon className="sidebar-icon"></HelpCenterIcon>
              <p>Quản lý tin tức</p>
            </NavLink>

            <NavLink to="/sidebar_for_organization/qna" className="sidebar-item" title="Quản lý voucher">
                <SupportIcon className="sidebar-icon"></SupportIcon>
                <p>Quản lý voucher</p>
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
