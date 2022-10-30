import React from 'react';
import { Button, Modal } from 'antd';
import './RegisteredButtons.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SendQuestion from '../SendQuestion/SendQuestionForm';
import RegisterCampaign from '../RegisterCampaign/RegisterCampaign';
import EditDateTime from '../EditDateTime/EditDateTime';


const { confirm } = Modal;

export default function CampaignDetail({registered,campaign,callback}) {
    const showConfirm = () => {
        confirm({
          title: 'Bạn có muốn hủy tham gia chiến dịch này?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Hủy tham gia',
          cancelText: 'Thoát',
          className:'cancel-confirm',
          onOk() {
        callback(!registered);

            console.log('Hủy tham gia');
          },
      
          onCancel() {
            console.log('Thoát');
          },
        });
      };


    return(
        <div className='registered-buttons'>
        <RegisterCampaign campaign={campaign} registered={registered}></RegisterCampaign>
        <EditDateTime campaign={campaign} registered={!registered}/>
        <Button onClick={showConfirm} className="cancel-camp">Hủy tham gia</Button>
        <SendQuestion className='send-qaa'></SendQuestion>
    </div>
    )
  
}
