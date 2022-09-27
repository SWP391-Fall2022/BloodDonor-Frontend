import styles from '../styles/register.module.css';
import '../index.css';
import { Button, Form, Input, InputNumber, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const onChange = (e) => {
    console.log('Change:', e.target.value);
};

const RegisterDonor = () => {
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
                    <Form.Item className={styles.formLabel} label="Họ và Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập Họ và Tên' }]}>
                        <Input placeholder="Nhập Họ và Tên" />
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
                    <Form.Item className={styles.formLabel} label="Địa chỉ chi tiết" name="address">
                        <TextArea rows={2} showCount maxLength={100} onChange={onChange} />
                    </Form.Item>
                    <Form.Item className={styles.formLabel}>
                        <Form.Item className={styles.formLabel} label="Số CMND" name="IDCard" rules={[{ required: true, message: 'Vui lòng nhập số CMND' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                            <Input placeholder="Nhập số CMND" />
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Giới tính" name="Sex" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                            <Select placeholder="Chọn">
                                <Option value="Male">Nam</Option>
                                <Option value="Female">Nữ</Option>
                                <Option value="Others">Khác</Option>
                            </Select>
                        </Form.Item>
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

export default RegisterDonor;