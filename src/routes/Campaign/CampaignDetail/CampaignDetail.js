import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import packageInfo from '../../../shared/ListOfCampaign.json';
import { Breadcrumb} from 'antd';
import './CampaignDetail.css';
import GoldShield from '../../../assets/awards/Gold-Shield.png';
import SilSol from '../../../assets/awards/Sil-Sol.png';
import CopCoin from '../../../assets/awards/Cop-Coin.png';
import QaA from '../QaA/QaA';
import RegisterButtons from '../Buttons/RegisteredButtons';
import UnRegisterButtons from '../Buttons/UnRegisteredButtons';
import ParticipatedButtons from '../Buttons/ParticipatedButtons';


export default function CampaignDetail() {



    // take the campaign
    const campaignTitle = useParams();

    const campaign = packageInfo.listOfCampaign.find(obj => {

        return obj.id == campaignTitle.id;
    });

    // check donor unregistered registerd
    const [registered, setRegistered] = useState(true);

     // check donor participated the campaign
     const [participated, setParticipated] = useState(false);

    //get state after register at UnRegisterButtons component
    function callbackFunction(isRegistered){
        setRegistered(isRegistered);
    }

    let buttons;

    if (participated) {
        buttons = <ParticipatedButtons registered={registered} campaign={campaign} />;
    } else if(!participated && !registered){
        buttons = <UnRegisterButtons registered={registered} campaign={campaign} callback={callbackFunction} />;
    }else if(!participated && registered){
        buttons = <RegisterButtons registered={registered} campaign={campaign} callback={callbackFunction}/>;
    }
    console.log(buttons);




    //  render blood types
    const listBloodType = campaign.blood.map((bloodType) =>
        <li className='blood-type-item'>{bloodType.slice(8, 10)}</li>
    );


    // setup date
    var startDate = new Date(campaign.startDate);


    return (

        <>
            <div className='campaign-detail-container'>

                <div className='campaignDetail-left'>
                    <div className='campaignDetail-left-title'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={'/campaign'}>Chiến dịch</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>THÔNG BÁO</Breadcrumb.Item>
                        </Breadcrumb>

                        <h2 className='campaign-title' > THÔNG BÁO</h2>
                        <div>Ngày đăng:{startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()} |  {campaign.organization}  </div>
                    </div>

                    <div className='campaign-detail-left-img'>
                        <img src={campaign.image} alt={campaign.organization} />
                    </div>

                    <div className='campaign-content'>
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
                        {buttons}
                    </div>

                </div>

                <div className='campaignDetail-right'>
                    <div className='medals-avatar'>

                        <div className='avatar'>
                            <Link to={`/organization/${campaign.organizationId}`}>
                                <img src={campaign.image} alt={campaign.organization} />
                            </Link>

                        </div >
                        <p className='organization-name'>{campaign.organization}</p>


                        <div className='medals'>

                            <div className='campaignDetail-medal-item'>
                                <img src={GoldShield} alt='' />
                                <p>Tổ chức <br></br> Hiến máu vàng </p>
                            </div>

                            <div className='campaignDetail-medal-item'>
                                <img src={SilSol} alt='' />
                                <p>Tổ chức <br></br> Năng động bạc </p>
                            </div>

                            <div className='campaignDetail-medal-item'>
                                <img src={CopCoin} alt='' />
                                <p>Tổ chức <br></br> Gắn bó đồng </p>
                            </div>

                        </div >

                    </div >

                    <QaA className='list-qaa'></QaA>


                </div >
            </div >

        </>



    )
}
