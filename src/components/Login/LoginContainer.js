import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../Login/login.module.css';
import { Button, Form, Input, notification } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import jwt_decode from "jwt-decode";


export default function LoginContainer() {

    const navigate = useNavigate()

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [recaptchaCheck, setRecaptchaCheck] = useState(false)

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID,
            callback: handleCredentialResponse,
            prompt_parent_id: 'g_id_onload',
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        window.google.accounts.id.prompt(); // also display the One Tap dialog
    }, [])

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
            notification.error({
                message: "Vui lòng xác nhận recaptcha",
                placement: "top"
            });
        } else {
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
            console.log(response)
            if (response.status === 401) {
                if (response.body === "Tài khoản chưa được xác nhận hay xác minh bởi quản trị viên") {
                    notification.error({
                        message: "Tài khoản chưa được xác nhận otp hoặc chưa duyệt bởi admin",
                        description: "Vui lòng đăng kí lại với chính xác tài khoản và email đã đăng kí nếu chưa xác nhận otp",
                        duration: 0,
                        placement: "top"
                    });
                    navigate("/register")
                } else {
                    notification.error({
                        message: response.body,
                        duration: 0,
                        placement: "top"
                    });
                }
            }
            if (response.status === 200) {
                sessionStorage.setItem('JWT_Key', JSON.stringify(response.body.token))
                sessionStorage.setItem('userRole', JSON.stringify(response.body.role))
                navigate("/auth")
            }
        }
    }

    // Google Login
    const handleCredentialResponse = (response) => {
        var decoded = jwt_decode(response.credential);
        handleGoogleLogin(response.credential, decoded.email)
    }

    const handleGoogleLogin = async (tokenId, email) => {
        let json = {
            method: 'POST',
            body: JSON.stringify({ tokenId: tokenId }),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/login/google`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 302) {
            notification.error({
                message: "Email này chưa từng đăng kí app",
                description: "Vui lòng nhập email này để đăng kí. Sau khi đăng kí bạn có thể đăng nhập bằng Google mà không cần tài khoản, mật khẩu.",
                duration: 10,
                placement: "top"
            });
            navigate("/register", { state: { email: email } })
        }
        if (response.status === 403) {
            notification.error({
                message: "Tài khoản chưa được xác nhận otp hoặc chưa duyệt bởi admin",
                description: "Nếu bạn chưa xác nhận otp hãy đăng kí lại với chính xác tài khoản và email bạn đã đăng kí",
                duration: 0,
                placement: "top"
            });
            navigate("/register")
        }
        if (response.status === 200) {

            // console.log(response)
            sessionStorage.setItem('JWT_Key', JSON.stringify(response.body.token))
            sessionStorage.setItem('userRole', JSON.stringify(response.body.role))
            // sessionStorage.setItem('GoogleEmail', JSON.stringify(data.profileObj.email))
            navigate("/auth")
        }

    }

    return (
        <div className={styles.mainBackground}>
            <div className={styles.container}>
                <div className="logo-general">
                    <Link to="/"><p title="Trang chủ">MEDICHOR</p></Link>
                </div>
                <h1 className={`${styles.title}`}>ĐĂNG NHẬP</h1>
                <Form layout="vertical">
                    <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                        <Input placeholder="Nhập tên đăng nhập" value={username} onChange={handleOnChangeUsername} />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Mật khẩu" name="Password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                        <Input.Password placeholder="Nhập mật khẩu" value={password} onChange={handleOnChangePassword} />
                    </Form.Item>
                    <Form.Item className={styles.formLabel}>
                        <Button id={styles["btn"]} type="primary" htmlType="submit" size="large" onClick={handleLogin}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <ReCAPTCHA
                    className={`${styles.recaptcha}`}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={onChangeRecaptcha}
                />
                <div className={`${styles.underInfo}`} style={{ marginTop: '1rem' }}>
                    <Link className={`${styles.link}`} to={"/restore"}>Quên mật khẩu?</Link>
                    <div>Chưa có tài khoản? Đăng kí <Link className={`${styles.link}`} to={"/register"}>tại đây</Link></div>
                    <div style={{ marginBottom: '1rem' }}>HOẶC</div>
                    <div id='buttonDiv' style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}></div>
                </div>
            </div>
            <div id="g_id_onload"
                data-prompt_parent_id="g_id_onload"
                data-cancel_on_tap_outside="false"
                style={{ position: 'absolute', left: '30px', top: '30px', width: '0', height: '0', zIndex: '1001', boxShadow: 'var(--shadow-dp-02)' }}>
            </div>
        </div>
    )
}