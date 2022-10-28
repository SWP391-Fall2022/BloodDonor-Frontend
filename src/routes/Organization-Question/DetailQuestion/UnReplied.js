import React from "react";
import "antd/dist/antd.css";
import "./UnReplied.css";
import moment from 'moment';

import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, DatePicker, Breadcrumb, Checkbox, Button, Modal } from "antd";

import { Link, useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { RangePicker } = DatePicker;


export default function DetailQuestion() {
    const [form] = Form.useForm();


    const onFinish = async (values) => {

        const formData = form.getFieldsValue(true);

        const requestData = {
            "answer": formData.answer
        }
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))


        let json = {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/organization/answer-question/{id}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.success) {

            //   navigate("/organization/manageCampaign")
            //   setMessage("Tạo chiến dịch thành công")
        }
        // setTimeout(() => {
        //   setMessage('');
        // }, 3000);

        // modal
        // const showConfirm = () => {
        //     Modal.confirm({
        //       title: 'Bạn có chắc muốn đăng câu trả lời này một cách công khai?',
        //       icon: <ExclamationCircleOutlined />,
        //       okText: 'Đăng',
        //       cancelText: 'Xem Lại',
        //       onOk() {
        //         console.log('Đăng');
        //       },
        //       onCancel() {
        //         console.log('Hủy');
        //       },
        //     });
        //   };


    };
    return (
        <>

            <div id="detail-question-container">
                <div className="detail-question-header">
                    <Breadcrumb className="detail-question-breadcrumb">
                        <Breadcrumb.Item>Quản lý hỏi đáp</Breadcrumb.Item>
                        <Breadcrumb.Item>Chi tiết câu hỏi</Breadcrumb.Item>
                    </Breadcrumb>
                    <Link to="/organization/manageQuestion"><ArrowLeftOutlined style={{ marginRight: "10px" }} />Chi tiết câu hỏi</Link>
                </div>

                <div className="detail-question-body">
                    <h2>Trả lời câu hỏi</h2>
                    <p className="detail-question-title">Người bị cao huyết áp có hiến máu được không?</p>
                    <p className="detail-question-content">Chào anh/chị, tôi là nam, năm nay 23 tuổi. Do lịch sử bệnh có cao huyết áp nhưng nhóm máu tôi là nhóm máu hiếm Rh-. Vậy tôi có được hiến máu không?</p>

                    <Form
                        id="answer-question-form"
                        form={form}
                        onFinish={onFinish} >
                        <Form.Item
                            label="Trả lời"
                            name="answer"


                            rules={[{ required: true, message: 'Vui lòng nhập chi tiết địa điểm diễn ra chiến dịch' }]}>
                            <TextArea showCount maxLength={100}></TextArea>
                        </Form.Item>

                        <Form.Item
                            name="buttons"
                            className="detail-question-buttons"
                        >

                            <Button id="refuseButton" type="primary" htmlType="button">
                                Từ chối trả lời
                            </Button>
                            <Button id="publicSend" type="primary" htmlType="button" >
                                Đăng công khai
                            </Button>
                            <Button id="privateSend" type="primary" htmlType="button">
                                Gửi riêng tư
                            </Button>

                            <Button id="cancelButton" type="primary" htmlType="button" onClick={() => {
                                form.resetFields();
                            }}>
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}