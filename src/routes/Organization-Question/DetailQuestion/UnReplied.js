import { React, useState } from "react";
import "antd/dist/antd.min.css";
import "./UnReplied.css";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button, Modal, notification } from "antd";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { OrBread } from "../../Organization-Profile/organization-breadcrumb";

const { TextArea } = Input;



export default function DetailQuestion() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");


    const location = useLocation();
    //   console.log("location answer:", location)

    //nhận state từ navigation
    const question = location.state.question;
    const id = location.state.id;


    const onFinish = async () => {

        const formData = form.getFieldsValue(true);

        const requestData = {
            "answer": formData.answer
        }
        console.log("requestData", requestData)
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))


        let json = {
            method: 'PUT',
            body: JSON.stringify(requestData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/answer/${id}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.status === 400) {
            notification.error({
                message: response.body,
                placement: "top"
            });
        }
        if (response.status === 200) {
            console.log("Bạn đã trả lời câu hỏi thành công")
            navigate("/organization/manageQuestion")
        }


    };
    // modal
    const [open, setOpen] = useState(false);

    const showConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc muốn đăng câu trả lời này một cách công khai?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Đăng',
            cancelText: 'Xem Lại',
            onOk() {
                onFinish();
                setOpen(false)
            }

        });
    };

    //   fetch API refuse answer question
    const refuseQuestion = async () => {

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/refuse/${id}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.status === 400) {
            notification.error({
                message: response.body,
                placement: "top"
            });
        }
        if (response.status === 200) {
            console.log("Bạn đã từ chối trả lời câu hỏi!")
            navigate("/organization/manageQuestion")
        }


    };


    const breadName = <>
        <Link to="/organization/manageQuestion">
            <ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} />
        </Link>Chi tiết câu hỏi
    </>
    const layer1 = <Link to="/organization/manageQuestion">Quản lý hỏi đáp</Link>

    return (
        <>

            <div id="detail-question-container">
                <div className="detail-question-header">
                    <div><OrBread layer1={layer1} layer2="Chi tiết câu hỏi" name={breadName} /></div>
                </div>

                <div className="detail-question-body">
                    <h2>Trả lời câu hỏi</h2>
                    {/* <p className="detail-question-title">Người bị cao huyết áp có hiến máu được không?</p> */}
                    <p className="detail-question-content">{question}</p>

                    <Form
                        id="answer-question-form"
                        form={form}
                    // onFinish={onFinish}
                    >
                        <Form.Item
                            label="Trả lời"
                            name="answer"
                            rules={[{ required: true, message: 'Vui lòng nhập câu trả lời cho câu hỏi' }]}>
                            <TextArea showCount maxLength={100} onChange={(e) => (setAnswer(e.target.value))}></TextArea>
                        </Form.Item>

                        <Form.Item
                            name="buttons"
                            className="detail-question-buttons"
                        >

                            <Button
                                id="refuseButton"
                                type="primary"
                                htmlType="button"
                                onClick={refuseQuestion}
                            >
                                Từ chối trả lời
                            </Button>
                            <Button
                                id="publicSend"
                                type="primary"
                                htmlType="submit"
                                onClick={showConfirm}
                                disabled={answer === "" ? true : false}
                            >
                                Đăng công khai
                            </Button>

                            <Button
                                id="cancelButton"
                                type="primary"
                                htmlType="button"

                                onClick={() => {
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