import styles from '../styles/login.module.css';
import { Button, Form, Input } from 'antd';

const newPass = () => {

    //Need a system to check login before come to this page
    //Need a system to check old Password before change the new one
    //Need a system to check 2 passwords here are the same

    return (
        <div className={styles.mainBackground}>
            <div className={`${styles.container} ${styles.font}`}>
                <h1 className={`${styles.title}`}>ĐỔI MẬT KHẨU</h1>
                <Form layout="vertical">
                    <Form.Item className={styles.formLabel} label="Nhập mật khẩu cũ" name="oldPass" rules={[{ required: true, message: 'Vui lòng nhập vào đây' }]}>
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Nhập mật khẩu mới" name="newPass" rules={[{ required: true, message: 'Vui lòng nhập vào đây' }]}>
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu mới" name="newPassDupCheck" rules={[{ required: true, message: 'Vui lòng nhập vào đây' }]}>
                        <Input.Password placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>
                    {/* recaptcha here */}
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

export default newPass;