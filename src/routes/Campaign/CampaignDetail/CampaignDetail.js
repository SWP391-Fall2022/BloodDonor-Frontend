import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './CampaignDetail.css';
import moment from 'moment';
import RegisterCampaign from '../RegisterCampaign/RegisterCampaign';
import QaA from '../QaA/QaA';



export default function CampaignDetail() {

  // fetch data function
  const [selectedCampaign, setSelectedCampaign] = useState({})



  // fetch data function
  function readOneFunction() {
    const asyncFn = async () => {

      let json = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      }
      const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/readOne/${campaignTitle.id}`, json)
        .then((res) => res.json())
        .catch((error) => { console.log("readOneFunction error", error) })

      if (response.success) {

        setSelectedCampaign(response.body)

      }

    }
    asyncFn();
  }


  //call etch API function
  useEffect(() => {
    readOneFunction();
  }, []
  )


  // take the campaign
  const campaignTitle = useParams();

  //  render blood types
  const listBloodType = String(selectedCampaign.bloodTypes).split("-").map((bloodType) =>
    <li className='blood-type-item'>{bloodType}</li>
  );

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
            <div>Ngày đăng: {moment(selectedCampaign.startDate).format("DD/MM/YYYY")} |  {selectedCampaign.organization !== undefined ? selectedCampaign.organization.name : ""}  </div>
          </div>

          <div className='campaign-detail-left-img'>
            <img src={selectedCampaign.images} alt={selectedCampaign.organization !== undefined ? selectedCampaign.organization.name : ""} />
          </div>

          <div className='campaign-content'>
            <p className='sub-title'>{selectedCampaign.organization !== undefined ? selectedCampaign.organization.name : ""} xin thông báo:</p>

            <div dangerouslySetInnerHTML={{ __html: selectedCampaign.description }} />


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
            <RegisterCampaign campaign={selectedCampaign} org={false} ></RegisterCampaign>
          </div>

        </div>

        <div className='campaignDetail-right'>
          <div className='medals-avatar'>
            <div className='avatar'>
              <Link to={`/organization/${selectedCampaign.organization !== undefined ? selectedCampaign.organization.id : ""}`}>
                <img src={selectedCampaign.organization !== undefined ? selectedCampaign.organization.avatar : ""} alt={selectedCampaign.organization !== undefined ? selectedCampaign.organization.name : ""} />
              </Link>

            </div >
            <Link to={`/organization/${selectedCampaign.organization !== undefined ? selectedCampaign.organization.id : ""}`}>

              <p className='organization-name' style={{color: "black"}}>{selectedCampaign.organization !== undefined ? selectedCampaign.organization.name : ""}</p>
            </Link>

          </div >

          <QaA className='list-qaa' campaignId={selectedCampaign.id}></QaA>


        </div >
      </div >

    </>

  )
}
