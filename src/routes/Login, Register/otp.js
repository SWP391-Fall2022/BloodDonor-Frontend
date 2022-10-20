import React, { useEffect, useState } from 'react';
import styles from '../../components/Otp/otp.module.css';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from 'antd';
import OtpInput from "react-otp-input";

export default function Otp() {

    const [otp, setOtp] = useState('')
    const [seconds, setSeconds] = useState(60)
    const { state } = useLocation();
    const { otpAccess, userId } = state;
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
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
        if (response.success) {
            if (JSON.parse(sessionStorage.getItem('restore'))) {
                navigate('/new-password')
            } else {
                navigate('/login')
            }
        } else {
            setMessage(response.body)
        }
    }

    const reSendOtp = async () => {
        setSeconds(60)
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/register/resendCode/${userId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log(response)
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

    if (otpAccess === null || !otpAccess) {
        return <Navigate to={'/login'} replace />
    } else
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
                        width: "60px",
                        height: "90px",
                        margin: "30px 15px",
                        fontSize: "64px",
                        borderRadius: 10,
                        border: "3px solid"
                    }} />
                <div className={styles.content}>Gửi lại mã trong {seconds}s</div>
                <div style={{ textAlign: 'center' }}>
                    <Button id={`${styles.btn}`} onClick={handleSubmit}>Xác nhận</Button>
                    {button}
                </div>
                <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', fontSize: '120%' }}>
                    {message}
                </div>
            </div>
        )
}