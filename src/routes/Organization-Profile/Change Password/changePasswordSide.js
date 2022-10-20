import styles from '../organization.module.css'
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
export default function ChangePasswordSide() {

    const [form] = Form.useForm();
    const [message, setMessage] = useState('')

    //Cancel Button
    const onReset = () => {
        form.resetFields();
    };

    //Submit Button
    const onFinish = async () => {
        const formData = form.getFieldsValue(true);
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            }),
            body: JSON.stringify(formData),
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/user/updatePassword`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.success) {
            setMessage("Đổi mật khẩu thành công")
        } else if (response.status === 400) {
            if (response.body === "Old password is incorrect.")
                setMessage("Mật khẩu cũ không chính xác")
            if (response.body === "Confirm password not match")
                setMessage("Hai mật khẩu mới không trùng khớp")
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    }

    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>ĐỔI MẬT KHẨU</div>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item className={styles.formLabel} label="Nhập mật khẩu cũ" name="oldPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập mật khẩu mới" name="newPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu mới" name="confirmNewPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
                    {message}
                </div>
                <Form.Item className={styles.formLabel}>
                    <Button className={`${styles.btn1}`} type="primary" htmlType="submit" size="large">
                        Thay đổi
                    </Button>
                    <Button className={`${styles.btn2}`} htmlType="submit" size="large" onClick={onReset}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}