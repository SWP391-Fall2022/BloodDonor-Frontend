import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from '../Login/login.module.css';
import { Button, Form, Input } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'


export default function LoginContainer() {

    const navigate = useNavigate()
    const location = useLocation()

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(location.state)
    const [recaptchaCheck, setRecaptchaCheck] = useState(false)

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID })
        })
    })

    // ReCAPTCHA
    const onChangeRecaptcha = (value) => {
        if (value !== null) {
            setRecaptchaCheck(true)
        }
    }

    // Normal Login
    const handleOnChangeUsername = (event) => {
        setUserName(event.target.value)
    }

    const handleOnChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        if (!recaptchaCheck) {
            setMessage('Vui lòng xác nhận reCaptcha')
        } else {
            setMessage('')
            let json = {
                method: 'POST',
                body: JSON.stringify({ "username": username, "password": password }),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/login`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            if (response === undefined) {
                sessionStorage.setItem('OTPAcess', JSON.stringify(true))
                setMessage('Tài khoản hoặc mật khẩu của bạn không đúng')
            }
            if (response.success) {
                sessionStorage.setItem('JWT_Key', JSON.stringify(response.body))
                navigate("/auth")
            }
        }
    }

    // Google Login
    const handleFailure = (result) => {
        console.log(result)
    }

    const handleGoogleLogin = async (data) => {
        let json = {
            method: 'POST',
            body: JSON.stringify({ tokenId: data.tokenId }),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/login/google`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })

        sessionStorage.setItem('JWT_Key', JSON.stringify(response.body))
        if (response.success) {
            sessionStorage.setItem('JWT_Key', JSON.stringify(response.body))
            sessionStorage.setItem('GoogleEmail', JSON.stringify(data.profileObj.email))
            navigate("/auth-google")
        }

    }

    return (
        <div className={styles.mainBackground}>
            <div className={styles.container}>
                <h1 className={`${styles.title}`}>ĐĂNG NHẬP</h1>
                <Form layout="vertical">
                    <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                        <Input placeholder="Nhập tên đăng nhập" value={username} onChange={handleOnChangeUsername} />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Mật khẩu" name="Password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                        <Input.Password placeholder="Nhập mật khẩu" value={password} onChange={handleOnChangePassword} />
                    </Form.Item>
                    <Form.Item className={styles.formLabel}>
                        <Button className={`${styles.btn}`} type="primary" htmlType="submit" size="large" onClick={handleLogin}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <Form.Item className={`${styles.formLabel} ${styles.recapcha}`}>
                        <ReCAPTCHA
                            style={{ margin: "0 25px" }}
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={onChangeRecaptcha}
                        />
                    </Form.Item>
                </Form>
                <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
                    {message}
                </div>
                <div className={`${styles.underInfo}`}>
                    <div><Link className={`${styles.link}`} to={"/restore"}>Quên mật khẩu?</Link></div>
                    <div>Chưa có tài khoản? Đăng kí <Link className={`${styles.link}`} to={"/register"}>tại đây</Link></div>
                    <div>HOẶC</div>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                        buttonText="Đăng nhập bằng Google"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </div>
    )
}