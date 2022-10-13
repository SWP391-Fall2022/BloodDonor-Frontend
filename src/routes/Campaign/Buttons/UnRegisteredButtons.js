import React from 'react';
import { Button, Modal } from 'antd';
import './UnRegisteredButtons.css';
import SendQuestion from '../SendQuestion/SendQuestionForm';
import RegisterCampaign from '../RegisterCampaign/RegisterCampaign';


export default function CampaignDetail({registered,campaign,callback}) {
    
    // setup register result modal----------------------------------------------
    const error = () => {
     
        Modal.error({
            className: 'errorRegister',
            title: 'Chiến dịch đã hết lượt đăng ký vào buổi sáng, thứ năm 17/09/2022.',
            content: 'Bạn hãy chọn ngày hoặc buổi khác để đăng ký.',
            okText: 'Đóng'
        });
    };

    const success = () => {
        callback(!registered);
        Modal.success({
            content: 'Chiến dịch đã được đăng ký thành công',
            okText: 'Đóng'

        });
    };

    return(
        <>
        <RegisterCampaign campaign={campaign} registered={registered}></RegisterCampaign>
        <Button id='join' onClick={success}>Tham gia</Button>
        <SendQuestion className='send-qaa'></SendQuestion>
    </>
    )
  
}
