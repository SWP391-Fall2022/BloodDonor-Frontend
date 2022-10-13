import styles from '../../components/Login/login.module.css';
import { Button, Form, Input } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NewPass() {

    const [form] = Form.useForm();
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const userId = JSON.parse(sessionStorage.getItem('userId'))

    const onChangeRecaptcha = (value) => {
        if (value !== null) {
            this.setState({ recaptchaCheck: true })
        }
    }

    const onFinish = async () => {
        const formData = form.getFieldsValue(true);
        let json = {
            method: 'PUT',
            body: JSON.stringify({
                "oldPassword": null,
                "newPassword": formData.newPassword,
                "confirmNewPassword": formData.confirmNewPassword
            }),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/register/password-reset/${userId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.status === 200) {
            setMessage('Đổi mật khẩu thành công, đang chuyển hướng về trang đăng nhập ...')
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        }
        if (response.body === 'Confirm password not match') {
            setMessage('Hai mật khẩu không trùng khớp')
        }
    }

    return (
        <div className={styles.mainBackground}>
            <div className={`${styles.container} shadowDP02-border10`}>
                <h1 className={`${styles.title}`}>ĐỔI MẬT KHẨU</h1>
                <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
                    {message}
                </div>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item className={styles.formLabel} label="Nhập mật khẩu mới" name="newPassword" rules={[{ required: true, message: 'Vui lòng nhập' }]}>
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu mới" name="confirmNewPassword" rules={[{ required: true, message: 'Vui lòng nhập' }]}>
                        <Input.Password placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>
                    <Form.Item className={`${styles.formLabel} ${styles.recapcha}`}>
                        <ReCAPTCHA
                            style={{ margin: "0 25px" }}
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={onChangeRecaptcha}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button className={`${styles.btn}`} type="primary" htmlType="submit" size="large">
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};

export default NewPass;