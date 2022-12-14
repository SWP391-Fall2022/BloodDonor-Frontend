import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Radio, message, notification } from 'antd';
import 'antd/dist/antd.min.css';
import './EditDateTime.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const EditDateTime = (props) => {
    const [oldDate, setOldDate] = useState()

    const [oldPeriod, setOldPeriod] = useState()

    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    // fetch API get detail of registration
    const [form] = Form.useForm();

    function getRegistration() {
        const asyncFn = async () => {

            const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
            let json = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': "Bearer " + token,
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/registered`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
           
            if (response.status === 200) {
                response.body.find((registration) => {
                    //only registration has status NOT_CHECKED_IN can be edit
                    if (registration.status == "NOT_CHECKED_IN" && registration.campaignId === props.campaign.id) {
                        setOldDate(registration.registeredDate)
                        setOldPeriod(registration.period)
                        console.log(registration)
                    }
                }

                )
            }
            else {
                setMessage(response.message)
            }

        }
        asyncFn();
    }


    //call etch API function
    useEffect(() => {
        getRegistration();
    })

    //Get days for choose day ----------------------
    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(moment(dt).format("YYYY-MM-DD"));
        }
        return arr;
    };
    var daylist = props.campaign.onSiteDates !== undefined ? props.campaign.onSiteDates : getDaysArray(new Date(props.campaign.startDate), new Date(props.campaign.endDate));

    const getDayOfWeek = (day) => {
        var useday = new Date(day);
        switch (useday.getDay()) {
            case 0:
                return "Ch??? Nh???t";
            case 1:
                return "Th??? hai";
            case 2:
                return "Th??? ba";
            case 3:
                return "Th??? t??";
            case 4:
                return "Th??? n??m";
            case 5:
                return "Th??? s??u";
            case 6:
                return "Th??? b???y";
            default:
                break;
        }
    }

    const [open, setOpen] = useState(false);

    const onCreate = (values) => {
        // console.log('Received values of form: ', values);
        setOpen(false);
    };



    // edit schedule API

    const onEditFinish = async (values) => {
        const formData = form.getFieldsValue(true);
        console.log("formData:", formData)


        const requestData = {
            "campaignId": props.campaign.id,
            "registerDate": formData.registerDate,
            "period": formData.period

        }
        console.log("reques:", requestData)
        console.log("campid:", props.campaign.id)
        console.log("old date:", oldDate)
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))


        let json = {
            method: 'PUT',
            body: JSON.stringify(requestData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/registered/${props.campaign.id}?oldDate=${oldDate}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.status === 200) {
            console.log("Ch???nh s???a th??nh c??ng:", response)
            updateSuccess()
        }
        else {
            if (response.body === "The time between donations must be at least 12 weeks")
                setMessage("Th???i gian gi???a nh???ng l???n hi???n m??u c???a b???n ph???i c??ch nhau ??t nh???t 12 tu???n!")

            console.log("ko Ch???nh s???a ???????c")

        }
        setTimeout(() => {
            //   setMessage('');
        }, 3000);


    };

    const updateSuccess = () => {
        Modal.success({
            content: 'L???ch tham gia ???? ???????c ch???nh s???a th??nh c??ng',
            okText: '????ng',
            onOk() {
                window.location.reload(false);

                setOpen(false);

            }

        });
    };



    const EditDateTimeForm = ({ open, onCancel, registered }) => {
        return (
            <Modal
                open={open}
                title="Ch???nh s???a l???ch tham gia 
          hi???n m??u"
                className="edit-date-time-modal"
                okText="Ch???nh s???a"
                cancelText="Tho??t"
                onCancel={onCancel}
                onOk={() => {
                    onEditFinish()
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="edit-date-time-form"


                >
                    <Form.Item>

                        <p className='sub-title'>Ch???n ng??y</p>

                        <div className='register-date-cover'>
                            <div className='register-date'>
                                <Form.Item name="registerDate" initialValue={oldDate}>
                                    <Radio.Group name="registerDate" disabled={registered ? true : false} defaultValue={oldDate} >

                                        {
                                            daylist.map((day) =>
                                                <div>
                                                    <Radio value={day} disabled={(moment(day) < moment()) ? true : false}>{getDayOfWeek(new Date(day))},{moment(day).format("DD-MM-YYYY")}</Radio>
                                                </div>
                                            )

                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div>

                        <p className='sub-title'>Ch???n bu???i</p>
                        <div className='register-time'>
                            <Form.Item name="period" initialValue={oldPeriod}>
                                <Radio.Group disabled={registered ? true : false} defaultValue={oldPeriod}>

                                    <Radio value={"MORNING"}>Bu???i s??ng: 8h00 ?????n 11h00</Radio>
                                    <Radio value={"AFTERNOON"}>Bu???i chi???u: 13h30 ?????n 17h00</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div style={{ color: "red" }}>{message}</div>
                    </Form.Item>

                </Form>
            </Modal>
        );
    };

    return (
        <div className='edit-date-time'>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Ch???nh s???a
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