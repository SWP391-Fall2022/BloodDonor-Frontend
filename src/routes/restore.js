import { Link } from "react-router-dom";
import styles from '../styles/restore.module.css';
import { Button, Form, Input } from 'antd';

const Forget = () => {
    return (
        <div className={styles.mainBackground}>
            <div className={`${styles.container} ${styles.font}`}>
                <h1 className={`${styles.title}`}>QUÊN MẬT KHẨU</h1>
                <div className={styles.info}>Không vấn đề! Nhập email của bạn vào bên dưới và hệ thống sẽ gửi cho bạn một email kèm theo mã xác nhận để đặt lại mật khẩu.</div>
                <Form layout="vertical">
                    <Form.Item className={styles.formLabel} label="Nhập email của bạn" name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Đây không phải là Email' }
                        ]}>
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                    <div className={styles.info}><Link className={styles.link} to={"/login"}>Quay lại đăng nhập</Link></div>
                    <Form.Item>
                        <Button className={`${styles.btn1}`} type="primary" htmlType="submit" size="large">
                            Gửi mã xác nhận qua mail
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.info}>Bạn chưa có tài khoản?</div>
                <Link to={"/register"} style={{ textDecoration: 'none' }}>
                    <Button className={`${styles.btn2}`} htmlType="submit" size="large">
                        Tạo tài khoản
                    </Button>
                </Link>
            </div>
        </div>
    )
};

export default Forget;