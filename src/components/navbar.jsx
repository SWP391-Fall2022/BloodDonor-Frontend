import React from 'react'
import { Link } from "react-router-dom";
import '../styles/navigation.css'

export const Navbar = () => {
    return (
        <div className="navbar ">
            <nav class="nav grid-container">
                <div className="nav-logo">
                    <p>MEDICHOR</p>
                </div>
                <div className="nav-links">
                    <Link to={"/"}>Trang chủ</Link>
                    <Link to={"/campaign"}>Chiến dịch</Link>
                    <Link to={"/news"}>News</Link>
                    <Link to={"/achivement"}>Thành tích</Link>
                </div>
                <div className="nav-logs">
                    <Link to={"/login"}>Đăng nhập</Link>
                    <Link to={"/register"}>Đăng ký</Link>
                </div>
            </nav>
        </div>
    )
};