import React, { useState } from 'react'
import styles from './register.module.css';
import packageInfo from "../../shared/ProvinceDistrict.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Select, DatePicker, notification } from 'antd';
import { RegisterStepPanel } from '../Register/RegisterStepsPanel';
const { TextArea } = Input;
const { Option } = Select;

function RegisterDonor() {
    const location = useLocation();
    // console.log(location.state)
    const [stepForm] = Form.useForm();
    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const provinceList = packageInfo.provinces
    const [districtList, setDistrictList] = useState(provinceList[0].district)
    const [districtId, setDistrictId] = useState(provinceList[0].district[0].id);

    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        stepForm.setFieldsValue({ district: provinceList[value - 1].district[0].name })
        setDistrictId(provinceList[value - 1].district[0].id)
    };

    const onDistrictChange = (value) => {
        setDistrictId(value)
    }

    let emailInput;
    if (location.state.email === undefined) {
        emailInput = <Form.Item className={styles.formLabel} label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input placeholder="Nhập Email" />
        </Form.Item>
    } else {
        emailInput = <Form.Item className={styles.formLabel} label="Email" name="email" initialValue={location.state.email} disabled rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
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
                <Form.Item className={styles.formLabel} label="Họ và Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập Họ và Tên' }]}>
                    <Input placeholder="Nhập Họ và Tên" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                    <Input style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
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
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.formLabel} label="Tỉnh" name="province" initialValue={provinceList[0].name} rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <Select
                            showSearch placeholder="Chọn"
                            onChange={onProvinceChange}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {provinceList.map(a => (<Option key={a.id} >{a.name}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Quận/Huyện" name="district" initialValue={provinceList[0].district[0].name} rules={[{ required: true, message: 'Vui lòng chọn' },]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Select
                            showSearch placeholder="Chọn"
                            onChange={onDistrictChange}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {districtList.map(a => (<Option key={a.id} value={a.id}>{a.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Địa chỉ chi tiết" name="addressDetails">
                    <TextArea rows={2} allowClear showCount maxLength={100} />
                </Form.Item>
            </>
        )
    }

    const onFinish = async () => {
        const formData = stepForm.getFieldsValue(true);
        delete formData.province
        delete formData.district
        formData.role = "DONOR";
        formData.districtId = districtId;
        // console.log(formData)
        setMessage("Xin chờ trong giây lát...")
        let json = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/register/donor`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            navigate("/otp", { state: { otpAccess: true, userId: response.body.userId } })
        } else if (response.status === 400) {
            setMessage('')
            notification.error({
                message: response.body,
                placement: "top"
            });

        } else if (response.status === 500) {
            notification.error({
                message: "Email đã được đăng kí",
                placement: "top"
            });
        }
        //Email has been registered but hasn't verified otp
        else {
            navigate("/otp", { state: { otpAccess: true, userId: response.body.userId } })
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
                <div className="logo-general">
                    <Link to="/"><p title="Trang chủ">MEDICHOR</p></Link>
                </div>
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