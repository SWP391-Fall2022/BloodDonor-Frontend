import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import PageFooterStyle from './PageFooterStyle.css';

export const PageFooter = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-container-top'>

        <div className='footer-logo'>
          <Link to="/"> <p>MEDICHOR</p> </Link>
          <p className='footer-logo-content'>Với sứ mệnh “Một giọt máu, triệu tấm lòng”, Medichor là trang website với mong muốn đưa việc hiến máu trở nên đơn giản và gần gũi với mọi người dân hơn bao giờ hết.</p>

        </div>

        <div className='footer-links'>
          <div className='link-pages'>
            <div className='link-pages-title'>
              <p>TRANG LIÊN KẾT</p>
            </div>

            <div className='link-pages-content'>
              <Link end to="/">
                <HomeIcon className='foot-icon'></HomeIcon>
              </Link>

              <Link to="/campaign">
                <AddBoxIcon className='foot-icon'></AddBoxIcon>
              </Link>

              <Link to="/news">
                <MenuBookIcon className='foot-icon'></MenuBookIcon>
              </Link>


              <Link to="/achivement">
                <EmojiEventsIcon className='foot-icon'></EmojiEventsIcon>
              </Link>

              <Link to="/qa">
                <HelpCenterIcon className='foot-icon'></HelpCenterIcon>
              </Link>
            </div>

          </div>

          <div className='info'>
            <div className='info-title'>
              <p>THÔNG TIN CƠ BẢN</p>
            </div>

            <div className='info-content'>
              <a href='https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+FPT+TP.+HCM,+L%C3%B4+E2a-7,+%C4%90%C6%B0%E1%BB%9Dng+D1,+%C4%90.+D1,+Long+Th%E1%BA%A1nh+M%E1%BB%B9,+Th%C3%A0nh+Ph%E1%BB%91+Th%E1%BB%A7+%C4%90%E1%BB%A9c,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000/data=!4m2!3m1!1s0x31752731176b07b1:0xb752b24b379bae5e?utm_source=mstt_1&entry=gps&g_ep=CAESCTExLjQ4LjgwMRgAIP___________wEqAA%3D%3D'>
                <MapIcon className='foot-icon'></MapIcon>
              </a>

              <a href='tel:028 7300 1866'>
                <PhoneIcon className='foot-icon'></PhoneIcon>
              </a>

              <a href='mailto:daihocfpt@fpt.edu.vn'>
                <MailIcon className='foot-icon'></MailIcon>
              </a>

              <a href='https://www.facebook.com/daihocfpt/'>
                <FacebookIcon className='foot-icon'></FacebookIcon>
              </a>
            </div>

          </div>

        </div>

        <div className='pages'>
          <p>CÁC TRANG CUNG CẤP THÔNG TIN</p>
          <p>Viện huyết học - Truyền máu trung ương</p>
          <p>Hội chữ thập đỏ TP Hồ Chí Minh - Trung tâm hiến máu nhân đạo</p>
          <p>Giọt máu vàng</p>
          <p>Trung Tâm Truyền Máu Chợ Rẫy - Khu vực phía Nam</p>
        </div>
      </div>
      <div className='foot-container-bot'>Copyright © 2022 Trang thông tin và đăng ký hiến máu Medichor</div>


    </footer>
  )
}