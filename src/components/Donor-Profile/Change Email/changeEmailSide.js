import styles from '../donor.module.css'
import { Button, Form, Input } from 'antd';
export default function ChangeEmailSide() {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>ĐỔI EMAIL</div>
            <Form layout="vertical">
                <Form.Item className={styles.formLabel} label="Nhập mật khẩu tài khoản" name="password" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập lại email cũ" name="oldEmail" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập email mới" name="newEmail" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập lại email mới" name="confirmNewEmail" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item className={styles.formLabel}>
                    <Button className={`${styles.btn1}`} type="primary" htmlType="submit" size="large">
                        Thay đổi
                    </Button>
                    <Button className={`${styles.btn2}`} htmlType="submit" size="large">
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}