import React from 'react'
import { NavLink } from "react-router-dom";
import '../styles/navigation.css'
import '../index.css'

export const Navbar = () => {
    return (
        <div className="navbar ">
            <nav class="nav grid-container">
                <div className="nav-logo">
                    <p>MEDICHOR</p>
                </div>
                <div className="nav-links">
                    <NavLink exact to={"/"}>Trang chủ</NavLink>
                    <NavLink to={"/campaign"}>Chiến dịch</NavLink>
                    <NavLink to={"/news"}>News</NavLink>
                    <NavLink to={"/achivement"}>Thành tích</NavLink>
                </div>
                <div className="nav-logs">
                    <NavLink to={"/login"}>Đăng nhập</NavLink>
                    <NavLink to={"/register"}>Đăng ký</NavLink>
                </div>
            </nav>
        </div>
    )
};