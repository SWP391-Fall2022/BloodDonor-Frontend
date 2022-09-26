import React, { Component } from "react";
import navigation from "../Navigation/navigation.css"
export default class Navigation extends Component {
  render() {
    return (
      <div className="navbar ">
      <nav class="nav grid-container">
        <div className="nav-logo">
        <a href="#home"> MEDICHOR</a>
        </div>
        {/* <p href="#logo">MEDICHOR</p> */}
        <div className="nav-links">
          <a href="#home">Trang Chủ</a>
          <a href="#campaign">Chiến Dịch</a>
          <a href="#news">News</a>
          <a href="#achievement">Thành Tích</a>
        </div>

        <div className="nav-logs">
          <a href="#signin" class="split">
            Đăng Nhập
          </a>
          <a href="#sign" class="split">
            Đăng Ký
          </a>
        </div>
      </nav>
    </div>
    );
  }
}
