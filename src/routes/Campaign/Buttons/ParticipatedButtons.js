import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import RegisterCampaign from '../RegisterCampaign/RegisterCampaign';
import './ParticipatedButtons.css';


export default function ParticipatedButtons({ registered, campaign}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='participated-buttons'>
            <RegisterCampaign campaign={campaign} registered={registered}></RegisterCampaign>

            <Button type="primary" onClick={showModal}>
                Thông tin sức khỏe
            </Button>
            <Modal title="THÔNG TIN SỨC KHỎE" open={isModalOpen} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='health-info-modal'>
                <p><strong>Cân nặng: </strong> 50kg</p>
                <p><strong>Nhóm máu: </strong>AB</p>
                <p><strong>Lượng máu: </strong>450cc</p>
                <p><strong>Chi tiết sức khỏe: </strong>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non</p>

            </Modal>
        </div>
    )

}
