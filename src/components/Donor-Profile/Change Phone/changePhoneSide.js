import styles from '../donor.module.css'
import { Button, Form, Input, InputNumber } from 'antd';
export default function ChangePhoneSide() {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>ĐỔI SỐ ĐIỆN THOẠI</div>
            <Form layout="vertical">
                <Form.Item className={styles.formLabel} label="Nhập mật khẩu tài khoản" name="password" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập lại số điện thoại cũ" name="oldPhone" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập số điện thoại mới" name="newPhone" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập lại số điện thoại mới" name="confirmNewPhone" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
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