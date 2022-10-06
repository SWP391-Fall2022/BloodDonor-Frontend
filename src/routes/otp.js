import React, { useEffect, useState } from 'react';
import styles from '../styles/otp.module.css';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from 'antd';
import OtpInput from "react-otp-input";

export default function Otp() {

    const [otp, setOtp] = useState('')
    const [seconds, setSeconds] = useState(60)
    const { state } = useLocation();
    const { otpAccess } = state;
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
        const response = await fetch(`http://localhost:8080/v1/register/confirmCode/${otp}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log(response)
        if (response.success) {
            navigate('/login')
        }
    }

    //Undone
    const reSendOtp = async () => {
        setSeconds(60)
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`http://localhost:8080/v1/register/resendCode/1004`, json)
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
        button = <Button className={`${styles.btn}`} disabled>Gửi lại mã</Button>
    } else {
        button = <Button className={`${styles.btn}`} onClick={reSendOtp}>Gửi lại mã</Button>
    }

    if (!otpAccess) {
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
                    <Button className={`${styles.btn}`} onClick={handleSubmit}>Xác nhận</Button>
                    {button}                    
                </div>
            </div>
        )
}