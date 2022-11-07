import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import LogoutIcon from '@mui/icons-material/Logout';
export const SideBarforAdmin = () => {
  const [click, setClick] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  function handleClick() {
    setClick(!click);
    // console.log(click);
  }

  function handleLogout() {
    sessionStorage.clear()
  }

  function handleSubMenu() {
    setShowSubMenu(!showSubMenu);
  }

  //Sub Menu
  let subMenu
  if (showSubMenu) {
    subMenu =
      <div>
        <NavLink to="/admin/manage_donor" className="sidebar-subitem" title="Quản lý tình nguyện">
          <InfoIcon className="sidebar-icon"></InfoIcon>
          <p>Quản lý tình nguyện</p>
        </NavLink>

        <NavLink to="/admin/manage_organization" className="sidebar-subitem" title="Quản lý tổ chức">
          <KeyIcon className="sidebar-icon"></KeyIcon>
          <p>Quản lý tổ chức</p>
        </NavLink>
      </div>
  }

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo">
          <Link to="/"><p style={{ color: 'white' }} title="Trang chủ">MEDICHOR</p></Link>
        </div>
        <div className={click ? "sidebar-links" : "unactive-sidebar-links"} title="Trang chủ">
          {/* <NavLink end to="/admin" className="sidebar-item">
              <HomeIcon className="sidebar-icon"></HomeIcon>
              <p>Trang chủ</p>
            </NavLink> */}

          {/* <NavLink to="/admin/manage_emergency" className="sidebar-item" title="Quản lý thông báo khẩn cấp">
              <ReportProblemIcon className="sidebar-icon"></ReportProblemIcon>
              <p>Quản lý thông báo khẩn cấp</p>
            </NavLink> */}

          <NavLink to="/admin/manage_campaign" className="sidebar-item" title="Quản lý chiến dịch">
            <LocalHospitalIcon className="sidebar-icon"></LocalHospitalIcon>
            <p>Quản lý chiến dịch</p>
          </NavLink>

          {/* <NavLink to="/sidebar_for_organization/voucher" className="sidebar-item">
              <LocalActivityIcon className="sidebar-icon"></LocalActivityIcon>
              <p>Tin nhắn</p>
            </NavLink> */}

          <Link className="sidebar-item" onClick={handleSubMenu} title="Quản lý tài khoản">
            <FolderIcon className="sidebar-icon"></FolderIcon>
            <p>Quản lý tài khoản</p>
          </Link>
          {subMenu}

          <NavLink to="/admin/news_list" className="sidebar-item" title="Quản lý tin tức">
            <HelpCenterIcon className="sidebar-icon"></HelpCenterIcon>
            <p>Quản lý tin tức</p>
          </NavLink>

          <NavLink to="/admin/manage_vouchers" className="sidebar-item" title="Quản lý voucher">
            <SupportIcon className="sidebar-icon"></SupportIcon>
            <p>Quản lý voucher</p>
          </NavLink>

          {/* <NavLink to="/qna">
              <HelpCenterIcon className="sidebar-icon"></HelpCenterIcon>
              <p>Nhắn tin</p>
            </NavLink> */}

          <Link to="/" onClick={handleLogout} className="sidebar-item" title="Đăng xuất">
            <LogoutIcon className="sidebar-icon"></LogoutIcon>
            <p>Đăng xuất</p>
          </Link>
        </div>

      </div>
    </>
  );
};
