import React, { useState } from 'react';
import { Button, Modal, Form} from 'antd';
import RegisterCampaign from '../RegisterCampaign/RegisterCampaign';
import 'antd/dist/antd.min.css';
import './EditDateTime.css';

const EditDateTimeForm = ({ open, onCreate, onCancel, campaign, registered}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Chỉnh sửa lịch tham gia 
      hiến máu"
            className="edit-date-time-modal"
            okText="Chỉnh sửa"
            cancelText="Thoát"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="edit-date-time-form"

            >
                <Form.Item>
                    <RegisterCampaign campaign={campaign} registered={registered}></RegisterCampaign>
                </Form.Item>

            </Form>
        </Modal>
    );
};

const EditDateTime= (props) => {
    const [open, setOpen] = useState(false);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setOpen(false);
    };

    return (
        <div className='edit-date-time'>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Chỉnh sửa
            </Button>
            <EditDateTimeForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
                campaign={props.campaign}
                registered={props.registered}
            />
        </div>
    );
};

export default EditDateTime;
