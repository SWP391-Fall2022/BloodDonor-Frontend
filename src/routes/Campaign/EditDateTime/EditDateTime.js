import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Radio, message } from 'antd';
import 'antd/dist/antd.min.css';
import './EditDateTime.css';
import moment from 'moment';

const EditDateTime = (props) => {
    const [oldDate, setOldDate] = useState("")
    console.log("oldDate:", oldDate)

    const [oldPeriod, setOldPeriod] = useState("")
    console.log("oldPeriod:",oldPeriod)

    const [message, setMessage] = useState('')
    const [form] = Form.useForm();


    // fetch API get detail of registration

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

            if (response.success) {
                console.log("registration response:", response)
                response.body.find((registration) => {
                    //only registration has status NOT_CHECKED_IN can be edit
                    if (registration.status === "NOT_CHECKED_IN"){
                        setOldDate(registration.registeredDate)
                        setDateValue(registration.registeredDate)
                    setOldPeriod(registration.period)
                    setTimeValue(registration.period)
                    }
                }

                )


            }

        }
        asyncFn();
    }


    //call etch API function
    useEffect(() => {
        getRegistration();
    }, []
    )



    // setup date radio-------------------------------------
    const [dateValue, setDateValue] = useState(oldDate);
    console.log('dateValue', dateValue);

    const onDateChange = (e) => {
        // console.log('radio checked', e.target.value);
        setDateValue(moment(e.target.value).format("YYYY-MM-DD"));
    };

    //Get days for choose day ----------------------
    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(moment(dt).format("YYYY-MM-DD"));
        }
        return arr;
    };
    var daylist = getDaysArray(new Date(props.campaign.startDate), new Date(props.campaign.endDate));

    // setup time of day radio-------------------------------------
    const [timeValue, setTimeValue] = useState(oldPeriod);
    // console.log("timeValue", timeValue)

    const onTimeChange = (e) => {
        // console.log('radio checked', e.target.value);
        setTimeValue(e.target.value);
    };

    const getDayOfWeek = (day) => {
        var useday = new Date(day);
        switch (useday.getDay()) {
            case 0:
                return "Chủ Nhật";
            case 1:
                return "Thứ hai";
            case 2:
                return "Thứ ba";
            case 3:
                return "Thứ tư";
            case 4:
                return "Thứ năm";
            case 5:
                return "Thứ sáu";
            case 6:
                return "Thứ bảy";
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
        console.log(formData)

        const requestData = {
            "campaignId": props.campaign.id,
            "registerDate": formData.registerDate,
            "period": formData.period

        }
        console.log("reques:", requestData)
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
        if (response.success) {
            
      
            console.log("Chỉnh sửa thành công:", response)
            updateSuccess()
        }
        else {
                setMessage(response.body)

            console.log("ko Chỉnh sửa được")

        }
        setTimeout(() => {
            //   setMessage('');
        }, 3000);


    };

    const updateSuccess = () => {
        Modal.success({
            content: 'Lịch tham gia đã được chỉnh sửa thành công',
            okText: 'Đóng',
            onOk() {
                setOpen(false);

            }

        });
    };



    const EditDateTimeForm = ({ open, onCreate, onCancel, campaign, registered }) => {
        
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
                    onEditFinish()
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="edit-date-time-form"
                // onFinish={onEditFinish}

                >
                    <Form.Item>

                        <p className='sub-title'>Chọn ngày</p>

                        <div className='register-date-cover'>
                            <div className='register-date'>
                                <Form.Item name="registerDate" initialValue={oldDate}>
                                    <Radio.Group name="dateValue" value={dateValue} disabled={registered ? true : false} defaultValue={oldDate} >

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

                        <p className='sub-title'>Chọn buổi</p>
                        <div className='register-time'>
                            <Form.Item name="period" initialValue={oldPeriod}>
                                <Radio.Group name="period" value={timeValue} disabled={registered ? true : false} defaultValue={oldPeriod}>

                                    <Radio value={"MORNING"}>Buổi sáng: 8h00 đến 11h00</Radio>
                                    <Radio value={"AFTERNOON"}>Buổi chiều: 13h30 đến 17h00</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </div>
                        {message}
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