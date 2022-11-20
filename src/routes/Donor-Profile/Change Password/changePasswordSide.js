import styles from '../donor.module.css'
import { Form, Input, Button, notification, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;
export default function ChangePasswordSide() {

    const [form] = Form.useForm();
    const navigate = useNavigate()

    //Cancel Button
    const onReset = () => {
        form.resetFields();
    };

    const sendBackend = async () => {
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
        if (response.status === 200) {
            notification.success({
                message: 'Đổi mật khẩu thành công',
                placement: "top"
            });

            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
        }
        else if (response.status === 400) {
            notification.error({
                message: response.body,
                placement: "top"
            });
        };
    }

    //Submit Button
    const onFinish = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn đổi mật khẩu không?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Đổi',
            cancelText: 'Hủy',
            onOk() {
                sendBackend();
            },
            onCancel() {
                notification.success({
                    message: 'Đã hủy',
                    placement: "top"
                });
            },
        });
    }

    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>ĐỔI MẬT KHẨU</div>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item className={styles.formLabel} label="Nhập mật khẩu cũ" name="oldPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' },
                {
                    validator: (rule, value, callback) => {
                        if (value.trim().length === 0) {
                            callback('Không được phép nhập dữ liệu chỉ có dấu cách')
                        } else {
                            callback()
                        }
                    }
                }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập mật khẩu mới" name="newPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' },
                {
                    validator: (rule, value, callback) => {
                        if (value.trim().length === 0) {
                            callback('Không được phép nhập dữ liệu chỉ có dấu cách')
                        } else {
                            callback()
                        }
                    }
                }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu mới" name="confirmNewPassword" rules={[{ required: true, message: 'Vui lòng không bỏ trống' },
                ]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.buttonLabel}>
                    <Button id={`${styles.btn1}`} type="primary" htmlType="submit" size="large">
                        Thay đổi
                    </Button>
                    <Button id={`${styles.btn2}`} htmlType="submit" size="large" onClick={onReset}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}