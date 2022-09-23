import { Link } from "react-router-dom";
import styles from '../styles/login.module.css';
import '../index.css';
import { Button, Form, Input } from 'antd';

const Login = () => {
    return (
        <div className={styles.mainBackground}>
            <div className={`${styles.container} shadowDP02-border10`}>
                <h1 className={`${styles.title}`}>ĐĂNG NHẬP</h1>
                <Form layout="vertical">
                    <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Mật khẩu" name="Password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item>
                        <Button className={`${styles.btn}`} type="primary" htmlType="submit" size="large">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <div className={`${styles.underInfo}`}>
                    <div><Link className={`${styles.link}`} to={"/restore"}>Quên mật khẩu?</Link></div>
                    <div>Chưa có tài khoản? Đăng kí <Link className={`${styles.link}`} to={"/register"}>tại đây</Link></div>
                    <div>HOẶC</div>
                </div>
            </div>
        </div>
    )
};

export default Login;