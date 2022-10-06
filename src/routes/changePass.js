import styles from '../components/Login/login.module.css';
import '../index.css';
import { Component } from "react";
import { Button, Form, Input } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";

class newPass extends Component {

    //Need a system to check login before come to this page
    //Need a system to check old Password before change the new one
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',
            newPassDupCheck: '',
            message: '',
            recaptchaCheck: false,
        }
    }

    handleOnChangeNewPassword = (event) => {
        this.setState({
            newPass: event.target.value
        })
    }

    handleOnChangeNewPasswordDup = (event) => {
        this.setState({
            newPassDupCheck: event.target.value
        })
    }

    onChangeRecaptcha = (value) => {
        if (value !== null) {
            this.setState({ recaptchaCheck: true })
        }
    }

    handleChangePass = async () => {
        if (!this.state.recaptchaCheck) {
            this.setState({ message: "Vui lòng xác nhận reCaptcha" })
        } else if (this.state.newPass !== this.state.newPassDupCheck) {
            this.setState({ message: "Hai mật khẩu mới không trùng khớp" })
        } else {
            this.setState({ message: 'Đổi mật khẩu thành công (test mess)'})
        }
    }

    render() {
        return (
            <div className={styles.mainBackground}>
                <div className={`${styles.container} shadowDP02-border10`}>
                    <h1 className={`${styles.title}`}>ĐỔI MẬT KHẨU</h1>                    
                    <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem'}}>
                        {this.state.message}
                    </div>
                    <Form layout="vertical">
                        <Form.Item className={styles.formLabel} label="Nhập mật khẩu mới" name="newPass" rules={[{ required: true, message: 'Vui lòng nhập vào đây' }]}>
                            <Input.Password placeholder="Nhập mật khẩu mới" onChange={this.handleOnChangeNewPassword}/>
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu mới" name="newPassDupCheck" rules={[{ required: true, message: 'Vui lòng nhập vào đây' }]}>
                            <Input.Password placeholder="Nhập lại mật khẩu mới" onChange={this.handleOnChangeNewPasswordDup}/>
                        </Form.Item>
                        <Form.Item className={`${styles.formLabel} ${styles.recapcha}`}>
                            <ReCAPTCHA
                                style={{ margin: "0 25px" }}
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                onChange={this.onChangeRecaptcha}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button className={`${styles.btn}`} type="primary" htmlType="submit" size="large" onClick={this.handleChangePass}>
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default newPass;