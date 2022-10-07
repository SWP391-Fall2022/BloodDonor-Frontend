import React, { useState } from 'react'
import styles from './register.module.css';
import { useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { RegisterStepPanel } from '../Register/RegisterStepsPanel';
import RegisterPD from '../Register/RegisterProvinceDistrict';
const { TextArea } = Input;
const { Option } = Select;

function RegisterDonor() {
    const [stepForm] = Form.useForm();
    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const STEP_1_FORM = () => {
        return (
            <>
                <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                    <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
                    <Input placeholder="Nhập Email" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập lại mật khẩu" name="confirmPassword" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
            </>
        )
    }
    const STEP_2_FORM = () => {
        return (
            <>
                <Form.Item className={styles.formLabel} label="Họ và Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập Họ và Tên' }]}>
                    <Input placeholder="Nhập Họ và Tên" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Sinh nhật" name="birthday" rules={[{ required: true, message: 'Vui lòng chọn' }]}>
                    <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                </Form.Item>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.formLabel} label="Giới tính" name="sex" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <Select placeholder="Chọn">
                            <Option value="MALE">Nam</Option>
                            <Option value="FEMALE">Nữ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Số CMND" name="identityNum" rules={[{ required: true, message: 'Vui lòng nhập số CMND' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Input placeholder="Nhập số CMND" />
                    </Form.Item>
                </Form.Item>
            </>
        )
    }
    const STEP_3_FORM = () => {
        return (
            <>
                <RegisterPD />
                <Form.Item className={styles.formLabel} label="Địa chỉ chi tiết" name="addressDetails">
                    <TextArea rows={2} allowClear showCount maxLength={100} />
                </Form.Item>
            </>
        )
    }

    const onFinish = async () => {
        const formData = stepForm.getFieldsValue(true);
        delete formData.province
        formData.role = "DONOR";
        formData.districtId = JSON.parse(sessionStorage.getItem('districtId'));
        setMessage("Xin chờ trong giây lát...")
        let json = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch("http://localhost:8080/v1/register/donor", json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.status === 200) {
            sessionStorage.setItem('OTPAcess', JSON.stringify(true))
            navigate("/otp", { state: { otpAccess: true } })
        } else if (response.status === 400) {
            setMessage(response.body)
        } else if (response.status === 500) {
            sessionStorage.setItem('OTPAcess', JSON.stringify(true))
            setMessage("Email này đã được đăng kí.")
        }
    };

    const steps = [
        {
            title: 'Chính',
            content: <STEP_1_FORM />
        },
        {
            title: 'Chi tiết',
            content: <STEP_2_FORM />
        },
        {
            title: 'Địa chỉ',
            content: <STEP_3_FORM />
        }
    ];

    return (
        <div className={styles.mainBackgroundChild} >
            <div className={`${styles.containerChild}`}>
                <h1 className={styles.titleChild}>ĐĂNG KÝ</h1>
                <Form form={stepForm} layout="vertical" onFinish={onFinish}>
                    <RegisterStepPanel steps={steps} />
                </Form>
                <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
                    {message}
                </div>
            </div>
        </div >
    )
};

export default RegisterDonor;