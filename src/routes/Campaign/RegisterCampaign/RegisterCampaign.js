import React, { useEffect, useState } from 'react';
import { Radio, Form, Button, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import './RegisterCampaign.css';
import SendQuestion from '../SendQuestion/SendQuestionForm';
import moment from 'moment';
import EditDateTime from '../EditDateTime/EditDateTime';
import { ExclamationCircleOutlined } from '@ant-design/icons';



export default function RegisterCampaign({ campaign }) {

    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [registered, setRegistered] = useState(false)
    const [registrations, setRegistrations] = useState("")
    const [medicalInfor, setMedicalInfor] = useState(false)
    const [medicalDoc, setMedicalDoc] = useState({})

    //Get days for choose day ----------------------
    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(moment(dt).format("YYYY-MM-DD"));
        }
        return arr;
    };
    var daylist = getDaysArray(new Date(campaign.startDate), new Date(campaign.endDate));




    // setup date radio-------------------------------------
    const [dateValue, setDateValue] = useState("");
    console.log('dateValue', dateValue);

    const onDateChange = (e) => {
        console.log('radio checked', e.target.value);
        setDateValue(moment(e.target.value).format("YYYY-MM-DD"));
    };

    // setup time of day radio-------------------------------------
    const [timeValue, setTimeValue] = useState("");
    console.log("timeValue", timeValue)

    const onTimeChange = (e) => {
        console.log('radio checked', e.target.value);
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

    // setup register result modal----------------------------------------------
    const registerError = (string) => {

        Modal.error({
            className: 'errorRegister',
            title: string,
            content: 'Bạn hãy chọn ngày hoặc buổi khác để đăng ký.',
            okText: 'Đóng'
        });
    };

    const registerSuccess = () => {
        // callback(!registered);
        Modal.success({
            content: 'Chiến dịch đã được đăng ký thành công',
            okText: 'Đóng',
            onOk() {
                setRegistered(true)

            }

        });
    };

    // register schedule for donation

    const onFinish = async (values) => {
        if (dateValue === "" || timeValue === "")
            setMessage("Bạn phải chọn cả ngày và buổi để có thể đăng ký lịch hiến máu!")
        else {
            const requestData = {
                "campaignId": campaign.id,
                "registerDate": dateValue,
                "period": timeValue

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
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/registered`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            console.log("response", response)
            if (response.success) {
                registerSuccess();

                //   setMessage("Tạo chiến dịch thành công")
                console.log("Đăng ký thành công")
            }
            else {
                if (response.message === "Missing request attribute 'user' of type User") {
                    setMessage("Bạn cần đăng nhập trước khi đăng ký lịch.")
                    nonLogin(response.message);
                }
                else {
                    registerError(response.message);

                }
                console.log("ko đăng ký được")
                //   console.log("REGIS", formData.registerDate)

            }
            setTimeout(() => {
                //   setMessage('');
            }, 3000);


        }



    };


    //modal for guest 
    const nonLogin = () => {
        // callback(!registered);
        Modal.confirm({
            content: "Bạn cần đăng nhập trước khi đăng ký lịch hiến máu!",
            okText: 'OK',
            onOk() {
                navigate("/login")

            }

        });
    };

    //fetch api check register status

    const getStatus = async () => {

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

        let json = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/campaigns/${campaign.id}/status`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.success) {
            console.log(response)
            if (response.body.hasRegistered === true)
                setRegistered(true)
        }


    };

    useEffect(() => {
        getStatus();


    }, [campaign]
    )

    //fetch api get num of registrations per day

    // const getNumOfRegistration = async () => {

    //     const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

    //     let json = {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json; charset=UTF-8',
    //             'Authorization': "Bearer " + token,
    //         })
    //     }
    //     const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getNumberOfRegistrationPerDay/${campaign.id}?period=AFTERNOON&registeredDate=2022-12-05`, json)
    //         .then((res) => res.json())
    //         .catch((error) => { console.log(error) })
    //     console.log("response", response)
    //     if (response.success) {
    //         // setRegistrations(response.)

    //         console.log(response)

    //     }


    // };
    // useEffect(() => {
    //     getNumOfRegistration();


    // }, []
    // )

    // function getRestOfRegistration (){
    //     if(timeValue !== "" && dateValue!== ""){
    //         getNumOfRegistration();
    //     }
    // }


    //fetch api get donated list of donor

    const getDonated = async () => {

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

        let json = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/donated`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.success) {

            const lastestDonated = response.body[Array(response.body).length - 1];
            console.log("donated response", response)


            if (moment().subtract(3, 'weeks') < moment(lastestDonated.registeredDate)) {

                setMedicalInfor(true)
                // getMedicalDoc(lastestDonated.campaignId, lastestDonated.registeredDate)
            }


        }


    };
    useEffect(() => {
        getDonated();

    }, []
    )

    //fetch api get medical document

    const getMedicalDoc = async (campaignId, registerDate) => {

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        const requestData = {
            "campaignId": campaignId,
            "registeredDate": registerDate,
        
        }
        console.log("reques:", requestData)

        let json = {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/medicalDocument/getByDonor`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.success) {

            setMedicalDoc(response)

            console.log("getMedicalDoc response".response)

        }


    };
    useEffect(() => {
        getMedicalDoc();

    }, []
    )


    //fetch API cancel registration

    const showCancelConfirm = () => {
        Modal.confirm({
            title: 'Bạn có muốn hủy tham gia chiến dịch này?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Hủy tham gia',
            cancelText: 'Thoát',
            className: 'cancel-confirm',
            onOk() {
                cancelRegistration();
                console.log('Hủy tham gia');
                navigate(`/campaign/campaign-detail/${campaign.id}`)

            },

            onCancel() {
                console.log('Thoát');
            },
        });
    };


    const cancelRegistration = async () => {

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

        let json = {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/registered/${campaign.id}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.success) {
            setRegistered(false)


            console.log("cancel response", response)


        }


    };



    return (
        <>
            <Form id='register-campaign-form' onFinish={onFinish}>

                <p className='sub-title'>Chọn ngày</p>

                <div className='register-date-cover'>
                    <div className='register-date'>
                        <Form.Item name="registerDate">
                            <Radio.Group onChange={onDateChange} value={dateValue} disabled={registered === true || medicalInfor === true ? true : false}>

                                {
                                    daylist.map((day) =>
                                        <div>
                                            <Radio value={day}>{getDayOfWeek(new Date(day))},{moment(day).format(" DD-MM-YYYY")}</Radio>
                                        </div>
                                    )

                                }
                            </Radio.Group>
                        </Form.Item>
                    </div>
                </div>

                <p className='sub-title'>Chọn buổi</p>
                <div className='register-time'>
                    <Form.Item name="period">
                        <Radio.Group onChange={onTimeChange} value={timeValue} disabled={registered || medicalInfor === true ? true : false}>

                            <Radio value={"MORNING"}>Buổi sáng: 8h00 đến 11h00</Radio>
                            <Radio value={"AFTERNOON"}>Buổi chiều: 13h30 đến 17h00</Radio>

                        </Radio.Group>
                    </Form.Item>
                </div>

                <div className='unregistered-buttons' style={{ display: registered === true || medicalInfor === true ? "none" : "block" }}>
                    <div style={{ color: "red" }}> {message}</div>
                    <Button id='join' htmlType='submit' >Tham gia</Button>
                    <SendQuestion className='send-qaa'></SendQuestion>
                </div>

                <div className='registered-buttons' style={{ display: registered === true && medicalInfor !== true ? "block" : "none" }}>
                    <Button className="cancel-camp" onClick={showCancelConfirm}>Hủy tham gia</Button>
                    <EditDateTime campaign={campaign} registered={false} />
                    <SendQuestion className='send-qaa'></SendQuestion>
                </div>


                <div className='paticipated-buttons' style={{ display: medicalInfor === true ? "block" : "none" }}>
                    <Button type="primary" id='medical-infor'>
                        Thông tin sức khỏe
                    </Button>
                </div>

                <p className='num-of-registered'>Còn n lượt đăng ký vào buổi ... thứ ... </p>
            </Form>
        </>

    )




}