import React from 'react';
import {  Link,  useLocation } from 'react-router-dom';
import { Breadcrumb} from 'antd';

export default function Preview() {

    const name = JSON.parse(sessionStorage.getItem('name'))
  //  render blood types
//   const slpitBlood = selectedCampaign.bloodTypes.split("-");
//   const listBloodType = slpitBlood.map((bloodType) =>
//     <li className='blood-type-item'>{bloodType}</li>
//   );

  return (
    <>
            <div className='preview-campaign-detail-container'>

                <div className='preview-campaignDetail-left'>
                    <div className='preview-campaignDetail-left-title'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={'/campaign'}>Chiến dịch</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>THÔNG BÁO</Breadcrumb.Item>
                        </Breadcrumb>

                        <h2 className='preview-campaign-title' > THÔNG BÁO</h2>
                        {/* <div>Ngày đăng:{startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()} |  {campaign.organization}  </div> */}
                    </div>
{/* 
                    <div className='preview-campaign-detail-left-img'>
                        <img src={campaign.image} alt={campaign.organization} />
                    </div>

                    <div className='preview-campaign-content'>
                        <p className='sub-title'>{campaign.organization} xin thông báo:</p>
                        <p>Điểm hiến máu cố định tại khu vực Bình tân từ ngày 17/09/2022 đến ngày 18/09/2022.
                            Quí tình nguyện viên tham gia hiến máu vui lòng đăng kí vào trang thông tin này
                            để thuận lợi hơn khi làm thủ thục chuẩn bị hiến máu.</p>

                        <p className='sub-title'>Thời gian:</p>
                        <p>Buổi sáng bắt đầu lúc 08h00 đến 11h00 <br></br>
                            Buổi chiều bắt đầu lúc 13h30 đến 17h00
                        </p>


                        <p className='sub-title'>Địa chỉ</p>
                        <p>{campaign.AddressDetail}</p>

                        <p className='sub-title'>Nhóm máu cần</p>
                        <div className='blood-type'>
                            <ul >{listBloodType}</ul>
                        </div>

                        <p className='sub-title'>Xin lưu ý</p>
                        <p>Khi đi hiến máu nhớ mang theo CMND hoặc CCCD (hoặc có hình ảnh kèm theo).</p>
                        <p>Xin trân trọng thông báo!!!</p>
                        {buttons}
                    </div> */}

                </div>

              
            </div >

        </>
  )
}
