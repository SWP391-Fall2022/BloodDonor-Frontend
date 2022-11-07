import { Link, useNavigate } from "react-router-dom";
import styles from '../../components/Login/restore.module.css';
import { Button, Form, Input } from 'antd';
import { useState } from "react";

function Forget() {

    const [form] = Form.useForm();
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    const onFinish = async () => {
        const formData = form.getFieldsValue(true);
        let json = {
            method: 'PUT',
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/register/password-reset/account/${formData.email}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.body === "This email has not been registered yet") {
            setMessage("Email này chưa được đăng ký")
        }
        if (response.body === "Your account has been banned.") {
            setMessage("Tài khoản này đã bị cấm")
        }
        if (response.status === 200) {
            navigate("/otp", { state: { otpAccess: true, userId: response.body.userId, restore: true } })
        }
    }

    return (
        <div className={styles.mainBackground}>
            <div className={`${styles.container} ${styles.font}`}>
                <div className="logo-general">
                    <Link to="/"><p title="Trang chủ">MEDICHOR</p></Link>
                </div>
                <h1 className={`${styles.title}`}>QUÊN MẬT KHẨU</h1>
                <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
                    {message}
                </div>
                <div className={styles.info}>Nhập email để nhận mã xác nhận tài khoản</div>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item className={styles.formLabel} label="Nhập email của bạn" name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' }
                        ]}>
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                    <div className={styles.info}><Link className={styles.link} to={"/login"}>Quay lại đăng nhập</Link></div>
                    <Form.Item>
                        <Button id={`${styles.btn1}`} type="primary" htmlType="submit" size="large">
                            Gửi mã xác nhận qua mail
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.info}>Bạn chưa có tài khoản?</div>
                <Link to={"/register"} style={{ textDecoration: 'none' }}>
                    <Button id={`${styles.btn2}`} htmlType="submit" size="large">
                        Tạo tài khoản
                    </Button>
                </Link>
            </div>
        </div>
    )
};

export default Forget;