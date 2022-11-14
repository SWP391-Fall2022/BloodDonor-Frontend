import { React, useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import "./UnReplied.css";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button, Modal, notification } from "antd";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { OrBread } from "../../Organization-Profile/organization-breadcrumb";

const { TextArea } = Input;



export default function DetailQuestion() {
    const [form] = Form.useForm();
    const question1 = useParams();
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState({});

    const navigate = useNavigate();

    const location = useLocation();
    // //nhận state từ navigation
    const previous = location.state?.previous;
    const campaignId = location.state?.campaignId;

    const onFinish = async () => {

        const formData = form.getFieldsValue(true);

        const requestData = {
            "answer": formData.answer.replace(/\s+/g,' ').trim()
        }

        if( requestData.answer.length === 0){
            notification.error({
              message: "Câu trả lời không được để trống!",
              placement: "top"
            });
            return;
          }
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))


        let json = {
            method: 'PUT',
            body: JSON.stringify(requestData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/answer/${question1.id}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.status === 400) {
            notification.error({
                message: response.body,
                placement: "top"
            });
        }
        if (response.status === 200) {
            notification.success({
                message: "Bạn đã trả lời câu hỏi thành công",
                placement: "top"
            });
            navigate("/organization/manageQuestion")
        }


    };
    // modal


    const showConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc muốn đăng câu trả lời này một cách công khai?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Đăng',
            cancelText: 'Xem Lại',
            onOk() {
                onFinish();
            }

        });
    };

    const showRefuseConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc muốn từ chối trả lời câu hỏi này? Hành động này sẽ không thể thay đổi!',
            icon: <ExclamationCircleOutlined />,
            okText: 'Từ chối',
            cancelText: 'Hủy',
            onOk() {
                refuseQuestion();
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
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/refuse/${question1.id}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.status === 400) {
            notification.error({
                message: response.body,
                placement: "top"
            });
        }
        if (response.status === 200) {
            notification.info({
                message: "Bạn đã từ chối trả lời câu hỏi!",
                placement: "top"
            });
            navigate("/organization/manageQuestion")
        }


    };


    // fetch data function
    function getQuestionsFromAPI() {
        const asyncFn = async () => {
            const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
            let json = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': "Bearer " + token,
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/get-by-organization`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            if (response.status === 400) {
                notification.error({
                    message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                    placement: "top"
                });
                sessionStorage.clear()
                navigate("/");
            }
            if (response.status === 200) {


                setQuestion(response.body.find(obj => {

                    return obj.questionId == question1.id;
                }
                ))
            }
        }
        asyncFn();

    }


    //call etch API function
    useEffect(() => {
        getQuestionsFromAPI();
    }, []
    )


    const breadName = <>
        <Link to={previous !== undefined ? `/organization/manageQuestion/campaignQuestion/${campaignId}` : '/organization/manageQuestion'}>
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
                    <p className="detail-question-content">{question.question}</p>

                    <Form
                        id="answer-question-form"
                        form={form}
                    >
                        <Form.Item
                            label="Trả lời"
                            name="answer"
                            rules={[{ required: true, message: 'Vui lòng nhập câu trả lời cho câu hỏi' }, { whitespace: true, message:'Câu trả lời không thể chỉ chứa khoảng trắng'}]}>
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
                                onClick={showRefuseConfirm}
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
                                    form.resetFields("");
                                    setAnswer("")
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
