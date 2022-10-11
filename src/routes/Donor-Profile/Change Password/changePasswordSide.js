import styles from '../donor.module.css'
import { Form, Input, Button } from 'antd';
export default function ChangePasswordSide() {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>ĐỔI MẬT KHẨU</div>
            <Form layout="vertical">
                <Form.Item className={styles.formLabel} label="Nhập mật khẩu cũ" name="oldPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập mật khẩu mới" name="newPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu mới" name="confirmNewPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
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