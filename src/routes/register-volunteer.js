import React, { useState } from 'react'
import styles from '../styles/register.module.css';
import '../index.css';
import { Form, Input, InputNumber, Select } from 'antd';
import { RegisterStepPanel } from '../components/RegisterStepsPanel';
import packageInfo from "../shared/data.json";
const { TextArea } = Input;
const { Option } = Select;

function RegisterDonor() {
    const [stepForm] = Form.useForm();
    const provinceList = packageInfo.provinces
    const [districtList, setDistrictList] = useState(provinceList[0].district)
    const [selectedDistrict, setSelectedDistrict] = useState(provinceList[0].district[0].name)

    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        setSelectedDistrict(provinceList[value - 1].district[0].name)
    };
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
                <Form.Item className={styles.formLabel} label="Nhập số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
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
                    <Form.Item className={styles.formLabel} label="Tỉnh" name="province" rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <Select
                            showSearch placeholder="Chọn"
                            onChange={onProvinceChange}
                            defaultValue={provinceList[0].name}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {provinceList.map(a => (<Option key={a.id} >{a.name}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item className={styles.formLabel} label="Quận/Huyện" name="districtId" rules={[{ required: true, message: 'Vui lòng chọn' },]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Select
                            showSearch placeholder="Chọn"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {districtList.map(a => (<Option key={a.id} value={a.id}>{a.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Địa chỉ chi tiết" name="AddressDetails" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
                    <TextArea rows={2} allowClear showCount maxLength={100} />
                </Form.Item>
            </>
        )
    }

    const onFinish = async() => {
        const formData = stepForm.getFieldsValue(true);
        delete formData.province
        formData.birthday = "01/01/2001";
        formData.role = "DONOR";
        console.log(formData);
        const response = await fetch("http://localhost:8080//v1/register/donor", formData)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
        console.log(response)
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
            <div className={`${styles.container} ${styles.containerChild}`}>
                <h1 className={styles.titleChild}>ĐĂNG KÝ</h1>
                <Form form={stepForm} layout="vertical" onFinish={onFinish}>
                    <RegisterStepPanel steps={steps} />
                </Form>
            </div>
        </div >
    )
};

export default RegisterDonor;