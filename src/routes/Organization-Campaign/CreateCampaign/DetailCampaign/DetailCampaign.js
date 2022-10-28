import { React,  useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Breadcrumb,Button,Radio } from "antd";
import './DetailCampaign.css';
import moment from 'moment';
import packageInfo from '../../../../shared/ListOfCampaign.json'

function DetailCampaign() {


    // take the campaign
    const campaignTitle = useParams();

    const campaign = packageInfo.listOfCampaign.find(obj => {

        return obj.id == campaignTitle.id;
    });

    // check donor unregistered registerd
    const [registered, setRegistered] = useState(false);

     // check donor participated the campaign
     const [participated, setParticipated] = useState(false);

    //get state after register at UnRegisterButtons component
    function callbackFunction(isRegistered){
        setRegistered(isRegistered);
    }

  



    //  render blood types
    const listBloodType = campaign.blood.map((bloodType) =>
        <li className='blood-type-item'>{bloodType.slice(8, 10)}</li>
    );


    // setup date
    var startDate = new Date(campaign.startDate);


    return (

        <>

<div className="org-campaignDetail-header">
                <Breadcrumb className="manage-campaign-breadcrumb">
            <Breadcrumb.Item>Quản lý chiến dịch</Breadcrumb.Item>
            <Breadcrumb.Item>Thông tin chiến dịch</Breadcrumb.Item>
          </Breadcrumb>
          <Link to="/organization/manageCampaign"><ArrowLeftOutlined style={{ marginRight: "10px" }} />Thông tin chiến dịch</Link>
                </div>

                
            <div id='org-campaign-detail-container'>

               

                <div className='org-campaignDetail'>
                    <div className='org-campaignDetail-title'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={'/campaign'}>Chiến dịch</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>THÔNG BÁO</Breadcrumb.Item>
                        </Breadcrumb>

                        <h2 className='org-campaign-title' > THÔNG BÁO</h2>
                        <div>Ngày đăng:{startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()} |  {campaign.organization}  </div>
                    </div>

                    <div className='org-campaign-detail-img'>
                        <img src={campaign.image} alt={campaign.organization} />
                    </div>

                    <div className='org-campaign-content'>
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
                        {/* <RegisterCampaign campaign={campaign} registered={registered}></RegisterCampaign> */}
                    </div>

                </div>

              
            </div >

        </>



    )
}
export default DetailCampaign;