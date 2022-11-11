import React, { useEffect, useState } from 'react';
import { Radio, Form, Button, Modal, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import './RegisterCampaign.css';
import SendQuestion from '../SendQuestion/SendQuestionForm';
import moment from 'moment';
import EditDateTime from '../EditDateTime/EditDateTime';
import { ExclamationCircleOutlined } from '@ant-design/icons';



export default function RegisterCampaign({ campaign, org }) {

    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [registered, setRegistered] = useState(false)
    const [medicalInfor, setMedicalInfor] = useState(false)
    const [medicalDoc, setMedicalDoc] = useState({})
    const [donorId, setDonorId] = useState()


    //Get days for choose day ----------------------
    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(moment(dt).format("YYYY-MM-DD"));
        }
        return arr;
    };
    var daylist = campaign.onSiteDates !== undefined ? campaign.onSiteDates.filter((e) => moment(e) > moment()) : getDaysArray(new Date(campaign.startDate), new Date(campaign.endDate));


    // setup date radio-------------------------------------
    const [dateValue, setDateValue] = useState("");

    const onDateChange = (e) => {
        setDateValue(moment(e.target.value).format("YYYY-MM-DD"));
    };

    // setup time of day radio-------------------------------------
    const [timeValue, setTimeValue] = useState("");

    const onTimeChange = (e) => {
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
            content: "Đã có lỗi xảy ra khi đăng ký.",
            okText: 'Đóng'
        });
    };

    const registerSuccess = () => {
        // callback(!registered);
        Modal.success({
            content: 'Chiến dịch đã được đăng ký thành công',
            okText: 'Đóng',
            onOk() {
                window.location.reload(false);

                setRegistered(true)

            }

        });
    };

    // register schedule for donation

    const onFinish = async () => {
        if (dateValue === "" || timeValue === "")
            setMessage("Bạn phải chọn cả ngày và buổi để có thể đăng ký lịch hiến máu!")
        else {
            const requestData = {
                "campaignId": campaign.id,
                "registerDate": dateValue,
                "period": timeValue

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
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me/registered`, json)
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
            if (response.status == 200) {
                registerSuccess();
                console.log("Đăng ký thành công")
            }
            else {
                if (response.message === "Missing request attribute 'user' of type User") {
                    nonLogin();
                }
                else {
                    setMessage(response.message)
                    registerError(response.message);
                }
                console.log("ko đăng ký được")

            }

        }

    };


    //modal for guest 
    const nonLogin = () => {
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
        if (response.status === 400) {
            notification.error({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                placement: "top"
            });
            sessionStorage.clear()
            navigate("/");
        }
        if (response.status === 200) {
            if (response.body.hasRegistered === true)
                setRegistered(true)
        }
    };

    useEffect(() => {
        getStatus();
    }, [campaign]
    )


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
        if (response.status === 400) {
            notification.error({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                placement: "top"
            });
            sessionStorage.clear()
            navigate("/");
        }
        if (response.status === 200) {

            const lastestDonated = response.body[Array(response.body).length - 1];
            if (moment().subtract(12, 'weeks') < moment(lastestDonated.registeredDate)) {

                setMedicalInfor(true)
                getMedicalDoc(lastestDonated.campaignId, lastestDonated.registeredDate)
            }

        }

    };
    useEffect(() => {
        getDonated();

    }, []
    )

    //fetch api get medical document

    const getMedicalDoc = async (campaignId, registerDate) => {
        getDonor();

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

        const requestData = {
            "donorId": donorId,
            "campaignId": campaignId,
            "registeredDate": registerDate,

        }

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
        if (response.status === 400) {
            notification.error({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                placement: "top"
            });
            sessionStorage.clear()
            navigate("/");
        }
        if (response.status === 200) {
            setMedicalDoc(response.body)

        }
    };

    const getDonor = async () => {

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

        let json = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me`, json)
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
            setDonorId(response.body.userId)
        }
    };



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
        if (response.status === 400) {
            notification.error({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                placement: "top"
            });
            sessionStorage.clear()
            navigate("/");
        }
        if (response.status === 200) {
            setRegistered(false)

        }


    };

    // set up for health information modal
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
        <>
            <Form id='register-campaign-form' onFinish={onFinish} style={{ display: campaign.emergency === true ? "none" : "block" }}>

                <p className='sub-title'>Chọn ngày</p>

                <div className='register-date-cover'  >
                    <div className='register-date'>
                        <Form.Item name="registerDate">
                            <Radio.Group onChange={onDateChange} value={dateValue} disabled={registered === true || medicalInfor === true || org === true ? true : false}>

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
                        <Radio.Group onChange={onTimeChange} value={timeValue} disabled={registered || medicalInfor === true || org === true ? true : false}>

                            <Radio value={"MORNING"}>Buổi sáng: 8h00 đến 11h00</Radio>
                            <Radio value={"AFTERNOON"}>Buổi chiều: 13h30 đến 17h00</Radio>

                        </Radio.Group>
                    </Form.Item>
                </div>

                <div className='unregistered-buttons' style={{ display: registered === true || medicalInfor === true || org === true ? "none" : "block" }}>
                    <div style={{ color: "red" }}> {message}</div>
                    <Button id='join' htmlType='submit' >Tham gia</Button>
                    <SendQuestion campaignId={campaign.id} className='send-qaa'></SendQuestion>
                </div>

                <div className='registered-buttons' style={{ display: registered === true && medicalInfor !== true && org != true ? "block" : "none" }}>
                    <Button className="cancel-camp" onClick={showCancelConfirm}>Hủy tham gia</Button>
                    <EditDateTime campaign={campaign} registered={false} />
                    <SendQuestion campaignId={campaign.id} className='send-qaa'></SendQuestion>
                </div>


                <div className='participated-buttons' style={{ display: medicalInfor === true && org === false ? "block" : "none" }}>
                    <Button type="primary" id='medical-infor' onClick={showModal}>
                        Thông tin sức khỏe
                    </Button>
                    <Modal title="THÔNG TIN SỨC KHỎE" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='health-info-modal'>
                        <p><strong>Cân nặng: </strong> {medicalDoc.weight}</p>
                        <p><strong>Nhóm máu: </strong> {medicalDoc.bloodType}</p>
                        <p><strong>Lượng máu: </strong>{medicalDoc.amount}</p>
                        <p><strong>Chi tiết sức khỏe: </strong>{medicalDoc.details}</p>

                    </Modal>
                </div>

            </Form>
        </>

    )

}