import React, { useState } from 'react'
import styles from './register.module.css';
import { useNavigate } from "react-router-dom";
import { Form, Input } from 'antd';
import { RegisterStepPanel } from './RegisterStepsPanel';
import RegisterPD from './RegisterProvinceDistrict';
const { TextArea } = Input;

function RegisterPlace() {
    const [stepForm] = Form.useForm();
    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const email = JSON.parse(sessionStorage.getItem('GoogleEmail'))
    let emailInput;
    if (email === null) {
        emailInput = <Form.Item className={styles.formLabel} label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input placeholder="Nhập Email" />
        </Form.Item>
    } else {
        emailInput = <Form.Item className={styles.formLabel} label="Email" name="email" initialValue={email} disabled rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input placeholder="Nhập Email" disabled />
        </Form.Item>
    }
    const STEP_1_FORM = () => {
        return (
            <>
                <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                    <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>
                {emailInput}
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
                <Form.Item className={styles.formLabel} label="Tên bệnh viện/ trạm y tế/ nơi tiếp nhận hiến máu" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                    <TextArea rows={2} allowClear showCount maxLength={100} />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Nhập số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                    <Input style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Mã số thuế" name="taxcode" rules={[{ required: true, message: 'Vui lòng nhập mã số' }]}>
                    <Input placeholder="Nhập mã số thuế" />
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
        formData.role = "ORGANIZATION";
        formData.districtId = JSON.parse(sessionStorage.getItem('districtId'));
        setMessage("Xin chờ trong giây lát...")
        let json = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/register/organization`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log(response)
        if (response.status === 200) {
            sessionStorage.setItem('OTPAcess', JSON.stringify(true))
            navigate("/otp")
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
    ]

    return (
        <div className={styles.mainBackgroundChild} >
            <div className={`${styles.container} ${styles.containerChild}`}>
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

export default RegisterPlace;