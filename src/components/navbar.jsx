import React from 'react'
import { NavLink } from "react-router-dom";
import '../styles/navigation.css'
import ScrollingText from './ScrollingText/ScrollingText'
<<<<<<< Updated upstream
=======
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LiquorIcon from '@mui/icons-material/Liquor';
>>>>>>> Stashed changes

export const Navbar = () => {
    return (<>
        <div className="navbar ">
            <nav class="nav grid-container">
                <div className="nav-logo">
                    <p>MEDICHOR</p>
                </div>
<<<<<<< Updated upstream
                <div className="nav-links">
                    <NavLink end to="/">Trang chủ</NavLink>
                    <NavLink to="/campaign">Chiến dịch</NavLink>
                    <NavLink to="/news">News</NavLink>
                    <NavLink to="/achivement">Thành tích</NavLink>
=======
                <div className={click ? 'nav-links' : 'unactive-nav-links'}>
                    <NavLink end to="/">
                        <LiquorIcon className='nav-icon'></LiquorIcon>
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

>>>>>>> Stashed changes
                </div>
                <div className="nav-logs">
                    <NavLink to="/login">Đăng nhập</NavLink>
                    <NavLink to="/register">Đăng ký</NavLink>
                </div>
            </nav>
        </div>
        <ScrollingText />
    </>
    )
};