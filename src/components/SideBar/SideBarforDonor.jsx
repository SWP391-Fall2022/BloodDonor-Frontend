import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import KeyIcon from '@mui/icons-material/Key';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
export const SideBarforDonor = () => {
  const [click, setClick] = useState(false);
  function handleClick() {
    setClick(!click);
    console.log(click);
  }

  return (
    <>
      <div className="sidebar-container">
          {/* <div className="nav-logo">
            <p>MEDICHOR</p>
          </div> */}
          <div className={click ? "sidebar-links" : "unactive-sidebar-links"}>
            <NavLink end to="/donor" className="sidebar-item">
              <AccountBoxIcon className="sidebar-icon"></AccountBoxIcon>
              <p>Thông tin cá nhân</p>
            </NavLink>

            <NavLink to="/donor/history" className="sidebar-item">
              <LocalHospitalIcon className="sidebar-icon"></LocalHospitalIcon>
              <p>Lịch sử chiến dịch</p>
            </NavLink>

            <NavLink to="/donor/changePassword" className="sidebar-item">
              <KeyIcon className="sidebar-icon"></KeyIcon>
              <p>Thay đổi mật khẩu</p>
            </NavLink>

            <NavLink to="/donor/vouchers" className="sidebar-item">
              <LocalActivityIcon className="sidebar-icon"></LocalActivityIcon>
              <p>Kho voucher</p>
            </NavLink>

            <NavLink to="/donor/qna" className="sidebar-item">
              <HelpCenterIcon className="sidebar-icon"></HelpCenterIcon>
              <p>Hỏi đáp</p>
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
