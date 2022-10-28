import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import KeyIcon from '@mui/icons-material/Key';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HomeIcon from '@mui/icons-material/Home';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FolderIcon from '@mui/icons-material/Folder';
import InfoIcon from '@mui/icons-material/Info';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import { notification } from "antd";

export const SideBarforOrganization = () => {
  const [click, setClick] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  function handleLogout() {
    sessionStorage.clear()
    notification.success({
      message: 'Đăng xuất Test',
      placement: "top"
  });
  }

  function handleSubMenu() {
    setShowSubMenu(!showSubMenu);
  }

  // Sub Menu
  let subMenu
  if (showSubMenu) {
    subMenu =
      < div >
        <NavLink to="/organization/profile" className="sidebar-subitem" title="Thay đổi thông tin">
          <InfoIcon className="sidebar-icon"></InfoIcon>
          <p>Thay đổi thông tin</p>
        </NavLink>

        <NavLink to="/organization/changePassword" className="sidebar-subitem" title="Thay đổi mật khẩu">
          <KeyIcon className="sidebar-icon"></KeyIcon>
          <p>Thay đổi mật khẩu</p>
        </NavLink>
      </div >
  }

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo">
          <p>MEDICHOR</p>
        </div>
        <div className={click ? "sidebar-links" : "unactive-sidebar-links"}>
          <NavLink end to="/organization" className="sidebar-item" title="Trang chủ">
            <HomeIcon className="sidebar-icon"></HomeIcon>
            <p>Trang chủ</p>
          </NavLink>

          <NavLink to="/organization/notification" className="sidebar-item">
            <ReportProblemIcon className="sidebar-icon"></ReportProblemIcon>
            <p>Quản lý thông báo khẩn cấp</p>
          </NavLink>

          <NavLink to="/sidebar_for_organization/change_pw" className="sidebar-item" title="Quản lý chiến dịch">
            <LocalHospitalIcon className="sidebar-icon"></LocalHospitalIcon>
            <p>Quản lý chiến dịch</p>
          </NavLink>

          <NavLink to="/sidebar_for_organization/change_pnb" className="sidebar-item" title="Quản lý hỏi đáp">
            <HelpCenterIcon className="sidebar-icon"></HelpCenterIcon>
            <p>Quản lý hỏi đáp</p>
          </NavLink>

          {/* <NavLink to="/sidebar_for_organization/voucher" className="sidebar-item">
              <LocalActivityIcon className="sidebar-icon"></LocalActivityIcon>
              <p>Tin nhắn</p>
            </NavLink> */}

          <Link className="sidebar-item" onClick={handleSubMenu} title="Thông tin tổ chức">
            <FolderIcon className="sidebar-icon"></FolderIcon>
            <p>Thông tin tổ chức</p>
          </Link>

          {subMenu}

          <NavLink to="/sidebar_for_organization/qna" className="sidebar-item" title="Hướng dẫn sử dụng">
            <SupportIcon className="sidebar-icon"></SupportIcon>
            <p>Hướng dẫn sử dụng</p>
          </NavLink>

          <Link to="/" onClick={handleLogout} className="sidebar-item" title="Đăng xuất">
            <LogoutIcon className="sidebar-icon"></LogoutIcon>
            <p>Đăng xuất</p>
          </Link>

          {/* <NavLink to="/qna">

              <HelpCenterIcon className="sidebar-icon"></HelpCenterIcon>
              <p>Nhắn tin</p>
            </NavLink> */}
        </div>

      </div>
    </>
  );
};
