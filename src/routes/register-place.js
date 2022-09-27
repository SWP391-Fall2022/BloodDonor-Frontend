import styles from '../styles/register.module.css';
import '../index.css';
import { Button, Form, Input, InputNumber, Select } from 'antd';
const { TextArea } = Input;

const onChange = (e) => {
    console.log('Change:', e.target.value);
};

const RegisterPlace = () => {
    return (
        <div className={styles.mainBackgroundChild} >
            <div className={`${styles.container} ${styles.containerChild}`}>
                <h1 className={styles.titleChild}>ĐĂNG KÝ</h1>
                <Form layout="vertical">
                    <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Mật khẩu" name="Password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu" name="RePassword" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Nhập số điện thoại" name="Phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                        <InputNumber style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item className={styles.formLabel}>
                        <Form.Item className={styles.formLabel} label="Tỉnh" name="province" rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                            <Select placeholder="Chọn">
                            </Select>
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Quận/Huyện" name="district" rules={[{ required: true, message: 'Vui lòng chọn'},]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                            <Select placeholder="Chọn">
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Địa chỉ chi tiết" rules={[{ required: true, message: 'Vui lòng chọn' }]}>
                        <TextArea rows={2} showCount maxLength={100} onChange={onChange} />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Tên bệnh viện/ trạm y tế/ nơi tiếp nhận hiến máu">
                        <TextArea rows={2} showCount maxLength={100} onChange={onChange} />
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Mã số thuế" name="username" rules={[{ required: true, message: 'Vui lòng nhập mã số' }]}>
                        <Input placeholder="Nhập mã số thuế" />
                    </Form.Item>
                    <Form.Item>
                        <Button className={`${styles.btnChild}`} type="primary" htmlType="submit" size="large" >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
};

export default RegisterPlace;