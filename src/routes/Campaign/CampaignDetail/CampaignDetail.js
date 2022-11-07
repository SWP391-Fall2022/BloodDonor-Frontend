import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './CampaignDetail.css';
import moment from 'moment';
import RegisterCampaign from '../RegisterCampaign/RegisterCampaign';
import GoldShield from '../../../assets/awards/Gold-Shield.png';
import SilSol from '../../../assets/awards/Sil-Sol.png';
import CopCoin from '../../../assets/awards/Cop-Coin.png';
import QaA from '../QaA/QaA';
import RegisterButtons from '../Buttons/RegisteredButtons';
import UnRegisterButtons from '../Buttons/UnRegisteredButtons';
import ParticipatedButtons from '../Buttons/ParticipatedButtons';


export default function CampaignDetail() {

    // fetch data function
    const [selectedCampaign, setSelectedCampaign] = useState([])
    console.log("selectedCampaign", selectedCampaign)
    


    function getCampFromAPI() {
        const asyncFn = async () => {
            // const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
            let json = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    // 'Authorization': "Bearer " + token,
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAll`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })

            if (response.success) {
                console.log("response",response)
                // setCampaigns(response.body)
                const campaign = response.body.find(obj => {

                    return obj.id == campaignTitle.id;
                });
                setSelectedCampaign(campaign)
            // console.log("campaign",campaign)

            }

        }
        asyncFn();
    }


    //call etch API function
    useEffect(() => {
        getCampFromAPI();
      

    }, []
    )



    // take the campaign
    const campaignTitle = useParams();
    console.log("campaignTitle", campaignTitle)


    // const campaign = campaigns.find(obj => {

    //     return obj.id == campaignTitle.id;
    // });
    // console.log(campaign)
    // setSelectedCampaign(
    //     ()=>{
    //         campaigns.find(obj => {

    //             return obj.id == campaignTitle.id;
    //         })
    //     }
    // )

    // // check donor unregistered registerd
    // const [registered, setRegistered] = useState(false);

    //  // check donor participated the campaign
    //  const [participated, setParticipated] = useState(false);

    // console.log(buttons);




    //  render blood types
    const listBloodType = String(selectedCampaign.bloodTypes).split("-").map((bloodType) =>
        <li className='blood-type-item'>{bloodType}</li>
    );


    // // setup date
    // var startDate = new Date(campaign.startDate);


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

                        <h2 className='campaign-title' > {selectedCampaign.name}</h2>
                        <div>Ngày đăng: {moment(selectedCampaign.startDate).format("DD/MM/YYYY")} |  {selectedCampaign.organizationName}  </div>
                    </div>

                    <div className='campaign-detail-left-img'>
                        <img src={selectedCampaign.images} alt={selectedCampaign.organizationName} />
                    </div>

                    <div className='campaign-content'>
                        <p className='sub-title'>{selectedCampaign.organizationName} xin thông báo:</p>
                        <p>{selectedCampaign.description}</p>

                        <p className='sub-title'>Thời gian:</p>
                        <p>Buổi sáng bắt đầu lúc 08h00 đến 11h00 <br></br>
                            Buổi chiều bắt đầu lúc 13h30 đến 17h00
                        </p>


                        <p className='sub-title'>Địa chỉ</p>
                        <p>{selectedCampaign.addressDetails}</p>

                        <p className='sub-title'>Nhóm máu cần</p>
                        <div className='blood-type'>
                            <ul >{listBloodType}</ul>
                        </div>

                        <p className='sub-title'>Xin lưu ý</p>
                        <p>Khi đi hiến máu nhớ mang theo CMND hoặc CCCD (hoặc có hình ảnh kèm theo).</p>
                        <p>Xin trân trọng thông báo!!!</p>
                        <RegisterCampaign campaign={selectedCampaign} ></RegisterCampaign>
                     </div>

                        </div>

               <div className='campaignDetail-right'>
                    

                    <QaA className='list-qaa'></QaA>


                    </div >
                </div >

        </>



            )
}
