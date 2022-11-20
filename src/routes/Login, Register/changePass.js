import styles from '../../components/Login/login.module.css';
import { Button, Form, Input, notification } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

function NewPass() {

    const [form] = Form.useForm();
    const { state } = useLocation();
    const navigate = useNavigate();

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
        const userId = state.userId
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/register/password-reset/${userId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.status === 200) {
            notification.success({
                message: response.body,
                placement: "top"
            });
            navigate('/login')
        }
        if (response.status === 400) {
            notification.error({
                message: response.body,
                placement: "top"
            });
        }
    }

    if (state === null) {
        return <Navigate to={'/'} replace />
    } else
        return (
            <div className={styles.mainBackground}>
                <div className={`${styles.container} shadowDP02-border10`}>
                    <div className="logo-general">
                        <Link to="/"><p title="Trang chủ">MEDICHOR</p></Link>
                    </div>
                    <h1 className={`${styles.title}`}>ĐỔI MẬT KHẨU</h1>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item className={styles.formLabel} label="Nhập mật khẩu mới" name="newPassword" rules={[{ required: true, message: 'Vui lòng nhập' },
                        {
                            validator: (rule, value, callback) => {
                                if (value.trim().length === 0) {
                                    callback('Không được phép nhập dữ liệu chỉ có dấu cách')
                                } else {
                                    callback()
                                }
                            }
                        }]}>
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu mới" name="confirmNewPassword" rules={[{ required: true, message: 'Vui lòng nhập' },
                        {
                            validator: (rule, value, callback) => {
                                if (value.trim().length === 0) {
                                    callback('Không được phép nhập dữ liệu chỉ có dấu cách')
                                } else {
                                    callback()
                                }
                            }
                        }]}>
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
                            <Button id={`${styles.btn}`} type="primary" htmlType="submit" size="large">
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
};

export default NewPass;