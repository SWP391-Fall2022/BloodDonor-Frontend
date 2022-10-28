import React from "react";
import "antd/dist/antd.css";
import "./RepliedQuestion.css";
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
            "answer": formData.answer,

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


    };
    return (
        <>

            <div id="replied-container">
                <div className="replied-header">
                    <Breadcrumb className="replied-breadcrumb">
                        <Breadcrumb.Item>Quản lý hỏi đáp</Breadcrumb.Item>
                        <Breadcrumb.Item>Chi tiết câu hỏi</Breadcrumb.Item>
                    </Breadcrumb>
                    <Link to="/organization/manageQuestion"><ArrowLeftOutlined style={{ marginRight: "10px" }} />Chi tiết câu hỏi</Link>
                </div>

                <div className="replied-body">
                    <h2>Trả lời câu hỏi</h2>
                    <p className="replied-title" style={{ fontWeight: "600", margin:"30px 0 15px 0 " }}>Người bị cao huyết áp có hiến máu được không?</p>
                    <p className="replied-content">Chào anh/chị, tôi là nam, năm nay 23 tuổi. Do lịch sử bệnh có cao huyết áp nhưng nhóm máu tôi là nhóm máu hiếm Rh-. Vậy tôi có được hiến máu không?</p>

                    <p style={{ fontWeight: "600", margin:"30px 0 15px 0 " }}>Câu trả lời:</p>
                    <p className="replied-answer-content">Người bị huyết áp cao hoàn toàn có thể hiến máu miễn là tại thời điểm hiến máu chỉ số huyết áp đo được là bình thường, không bị dao động. Chỉ số huyết áp được chấp nhận đó là huyết áp tâm thu dưới 180 và huyết áp tâm trương dưới 100.
                    </p>


                    <div className="delete-button" style={{textAlign:"center"}}>

                        <Button id="deleteQuestion" type="primary" htmlType="button" style={{backgroundColor:`var(--primary-500)`, border:"none", margin:"30px 0 20px 0"}}>
                            Xóa
                        </Button>
                    </div>



                </div>
            </div>
        </>
    )
}