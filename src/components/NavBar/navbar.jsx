import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import './navigation.css'
import ScrollingText from './ScrollingText'
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';


export const Navbar = () => {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    function handleClick() {
        setClick(!click);
        // console.log("click",click);
    }
    const role = JSON.parse(sessionStorage.getItem('userRole'))
    let loginState;
    if (role === null) {
        loginState = <div className={click ? 'nav-logs' : 'unactive-nav-logs'}>
            <NavLink to="/login">
                <ExitToAppIcon className='nav-icon'></ExitToAppIcon>
                <p>Đăng nhập</p>
            </NavLink>

            <NavLink to="/register">
                <PersonAddAltIcon className='nav-icon'></PersonAddAltIcon>
                <p>Đăng ký</p>
            </NavLink>
        </div>
    }
    if (role !== null) {
        loginState = <div className={click ? 'nav-logs' : 'unactive-nav-logs'}>
            <Link to={role}>
                <AccountCircleIcon className='nav-icon'></AccountCircleIcon>
                <p>Hồ sơ</p>
            </Link>

            <Link to="/" onClick={handleLogout}>
                <LogoutIcon className='nav-icon'></LogoutIcon>
                <p>Đăng xuất</p>
            </Link>
        </div>
    }

    function handleLogout() {
        sessionStorage.clear()
        navigate("/")
    }

    return (<>
        <div className='navbar-container'>
            <div className="navbar ">
                <nav className="nav grid-container">
                    <div className="nav-logo">
                        <p>MEDICHOR</p>
                    </div>
                    <div className={click ? 'nav-links' : 'unactive-nav-links'}>
                        <NavLink end to="/">
                            <HomeIcon className='nav-icon'></HomeIcon>
                            <p>Trang chủ</p>
                        </NavLink>

                        <NavLink to="/campaign">
                            <AddBoxIcon className='nav-icon'></AddBoxIcon>
                            <p>Chiến dịch</p>
                        </NavLink>

                        <NavLink to="/news">
                            <MenuBookIcon className='nav-icon'></MenuBookIcon>
                            <p>Tin tức</p>
                        </NavLink>


                        <NavLink to="/achievement" onClick={() => window.onscroll({top: 0})}>
                            <EmojiEventsIcon className='nav-icon'></EmojiEventsIcon>
                            <p>Thành tích</p>
                        </NavLink>

                        <NavLink to="/qna">
                            <HelpCenterIcon className='nav-icon'></HelpCenterIcon>
                            <p>Hỏi đáp</p>
                        </NavLink>

                    </div>
                    {loginState}

                    <div className='menu-button'>
                        <NavLink className={click ? 'active' : 'unactive'} >
                            <MenuIcon onClick={handleClick} className='nav-icon'></MenuIcon>

                        </NavLink>
                    </div>


                </nav>
            </div>
            <ScrollingText />
        </div>
    </>
    )
};