import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import '../styles/navigation.css'
import ScrollingText from './ScrollingText/ScrollingText'
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


export const Navbar = () => {
    const [click, setClick] = useState(false);
    function handleClick() {
        setClick(!click);
        console.log(click);
    }

    return (<>
    <div className='navbar-container'>
        <div className="navbar ">
            <nav class="nav grid-container">
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


                    <NavLink to="/achivement">
                        <EmojiEventsIcon className='nav-icon'></EmojiEventsIcon>
                        <p>Thành tích</p>
                    </NavLink>

                    <NavLink to="/qa">
                        <HelpCenterIcon className='nav-icon'></HelpCenterIcon>
                        <p>Hỏi đáp</p>
                    </NavLink>

                </div>
                <div className={click ? 'nav-logs' : 'unactive-nav-logs'}>
                    <NavLink to="/login">
                        <ExitToAppIcon></ExitToAppIcon>
                        <p>Đăng nhập</p>
                    </NavLink>

                    <NavLink to="/register">
                        <PersonAddAltIcon></PersonAddAltIcon>
                        <p>Đăng ký</p>
                    </NavLink>
                </div>

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