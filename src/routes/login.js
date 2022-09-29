import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/login.module.css';
import '../index.css';
import { Button, Form, Input } from 'antd';
import { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            recaptchaCheck: false,
            loginGoogleData: sessionStorage.getItem('loginData') ? JSON.parse(sessionStorage.getItem('loginData')) : null,
        }
    }

    // ReCAPTCHA
    onChangeRecaptcha = (value) => {
        if (value !== null) {
            this.setState({ recaptchaCheck: true })
        }
    }

    // Normal Login
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        if (!this.state.recaptchaCheck) {
            this.setState({ message: "Please check reCaptcha" })
        } else {
            this.setState({ message: '' })
            let json = {
                method: 'POST',
                body: JSON.stringify({ "username": this.state.username, "password": this.state.password }),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                })
            }
            const response = await fetch("http://localhost:8080/v1/login", json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            if (response.success) {
                this.setState({
                    message: 'Login successful!'
                })
            } else {
                this.setState({
                    message: 'Wrong email or password'
                })
            }
            console.log(response)
        }
    }

    // Google Login

    handleFailure = (result) => {
        console.log(result)
    }

    handleGoogleLogin = async (data) => {
        let json = {
            method: 'POST',
            body: JSON.stringify({ tokenId: data.tokenId, }),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch("http://localhost:8080/v1/login/google", json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })

        this.setState({ loginGoogleData: data.profileObj.email })
        sessionStorage.setItem('loginData', JSON.stringify(this.state.loginGoogleData))
        console.log(data)
        console.log(response)
    }

    render() {
        return (
            <div className={styles.mainBackground}>
                <div className={styles.container}>
                    <h1 className={`${styles.title}`}>ĐĂNG NHẬP</h1>
                    <Form layout="vertical">
                        <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                            <Input placeholder="Nhập tên đăng nhập" value={this.state.username} onChange={this.handleOnChangeUsername} />
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Mật khẩu" name="Password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                            <Input.Password placeholder="Nhập mật khẩu" value={this.state.password} onChange={this.handleOnChangePassword} />
                        </Form.Item>
                        <Form.Item className={styles.formLabel}>
                            <Button className={`${styles.btn}`} type="primary" htmlType="submit" size="large" onClick={this.handleLogin}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <Form.Item className={`${styles.formLabel} ${styles.recapcha}`}>
                            <ReCAPTCHA
                                style={{ margin: "0 25px" }}
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                onChange={this.onChangeRecaptcha}
                            />
                        </Form.Item>
                    </Form>
                    <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
                        {this.state.message}
                    </div>
                    <div className={`${styles.underInfo}`}>
                        <div><Link className={`${styles.link}`} to={"/restore"}>Quên mật khẩu?</Link></div>
                        <div>Chưa có tài khoản? Đăng kí <Link className={`${styles.link}`} to={"/register"}>tại đây</Link></div>
                        <div>HOẶC</div>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                            buttonText="Đăng nhập bằng Google"
                            onSuccess={this.handleGoogleLogin}
                            onFailure={this.handleFailure}
                            isSignedIn={true}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div>
                        Your email: {this.state.loginGoogleData}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;