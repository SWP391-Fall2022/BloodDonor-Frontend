import React from 'react'
import { Link } from "react-router-dom";

export const Navbar = () => {
    return <>
        <div>
            <p>MEDICORE</p>
            <Link to={"/home"}>Trang chủ</Link>
            <Link to={"/campaign"}>Chiến dịch</Link>
            <Link to={"/news"}>News</Link>
            <Link to={"/achivement"}>Thành tích</Link>
            <Link to={"/login"}>Đăng nhập</Link>
        </div>
    </>
};