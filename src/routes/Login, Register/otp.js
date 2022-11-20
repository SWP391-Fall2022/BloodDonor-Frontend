import React, { useEffect, useState } from 'react';
import styles from '../../components/Otp/otp.module.css';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, notification } from 'antd';
import OtpInput from "react-otp-input";

export default function Otp() {

    const [otp, setOtp] = useState('')
    const [seconds, setSeconds] = useState(150)
    const { state } = useLocation();
    const navigate = useNavigate();
    const handleChange = (otp) => {
        setOtp(otp)
    }

    const handleSubmit = async () => {
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/register/confirmCode/${otp}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            if (state.restore) {
                navigate('/new-password', { state: { userId: state.userId } })
            } else {
                navigate("/login")
                notification.success({
                    message: 'Xác nhận otp thành công',
                    placement: 'top'
                });
            };
        } else if (response.status === 400) {
            notification.error({
                message: response.body,
                placement: 'top'
            });
        }
    }

    const reSendOtp = async () => {
        setSeconds(150)
        const userId = state.userId
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/register/resendCode/${userId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        notification.success({
            message: 'Đã gửi lại mã. Vui lòng xem trong email của bạn',
        });
    }

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval)
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    let button;
    if (seconds > 0) {
        button = <Button id={`${styles.btnDisabled}`} disabled>Gửi lại mã</Button>
    } else {
        button = <Button id={`${styles.btn}`} onClick={reSendOtp}>Gửi lại mã</Button>
    }

    if (state === null) {
        return <Navigate to={'/login'} replace />
    }
    if (state !== null && state.otpAccess) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>Mã xác nhận đã được gửi qua mail của bạn</div>
                <div className={styles.content}>Kiểm tra mail để xác nhận thông tin</div>
                <OtpInput className={styles.otp}
                    numInputs={6}
                    value={otp}
                    onChange={handleChange}
                    isInputNum={true}
                    containerStyle={{ display: "flex", justifyContent: "center" }}
                    inputStyle={{
                        width: "40px",
                        height: "60px",
                        margin: "5px 5px",
                        fontSize: "45px",
                        borderRadius: 10,
                        border: "3px solid"
                    }} />
                <div className={styles.content}>Gửi lại mã trong {seconds}s</div>
                <div style={{ textAlign: 'center' }}>
                    <Button id={`${styles.btn}`} onClick={handleSubmit}>Xác nhận</Button>
                    {button}
                </div>
            </div>
        )
    }
}