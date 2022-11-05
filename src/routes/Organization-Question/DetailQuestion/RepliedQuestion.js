import React from "react";
import "antd/dist/antd.min.css";
import "./RepliedQuestion.css";
import moment from 'moment';

import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, DatePicker, Breadcrumb, Checkbox, Button, Modal } from "antd";

import { Link, useLocation } from "react-router-dom";
import { OrBread } from "../../Organization-Profile/organization-breadcrumb";

const { TextArea } = Input;
const { RangePicker } = DatePicker;


export default function DetailQuestion() {
    const [form] = Form.useForm();

    const location = useLocation();
  console.log("location answer:", location)

  //nhận state từ navigation
  const question = location.state.question;
  const answer = location.state.answer;



    const breadName = <>
        <Link to="/organization/manageQuestion">
            <ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} />
        </Link>Chi tiết câu hỏi
    </>
    const layer1 = <Link to="/organization/manageQuestion">Quản lý hỏi đáp</Link>
    return (
        <>

            <div id="replied-container">
                <div className="replied-header">
                    <div><OrBread layer1={layer1} layer2="Chi tiết câu hỏi" name={breadName} /></div>
                </div>

                <div className="replied-body">
                    <h2>Trả lời câu hỏi</h2>
                    <p className="replied-title" style={{ fontWeight: "600", margin: "30px 0 15px 0 " }}>Câu hỏi</p>
                    <p className="replied-content">{question}</p>

                    <p style={{ fontWeight: "600", margin: "30px 0 15px 0 " }}>Câu trả lời:</p>
                    <p className="replied-answer-content">{answer}</p>


                </div>
            </div>
        </>
    )
}