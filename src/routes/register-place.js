import React, { useState } from 'react'
import styles from '../styles/register.module.css';
import '../index.css';
import { Form, Input, InputNumber, Select } from 'antd';
import { RegisterStepPanel } from '../components/RegisterStepsPanel';
import packageInfo from "../shared/data.json";
const { TextArea } = Input;
const { Option } = Select;

function RegisterPlace() {
    const [stepForm] = Form.useForm();
    const STEP_1_FORM = () => {
        return (
            <>
                <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                    <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
                    <Input placeholder="Nhập Email" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Mật khẩu" name="Password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
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
                <Form.Item className={styles.formLabel} label="Nhập số điện thoại" name="Phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Mã số thuế" name="username" rules={[{ required: true, message: 'Vui lòng nhập mã số' }]}>
                    <Input placeholder="Nhập mã số thuế" />
                </Form.Item>
            </>
        )
    }
    const provinceList = packageInfo.provinces
    const [districtList, setDistrictList] = useState(provinceList[0].district)
    const [selectedDistrict, setSelectedDistrict] = useState(provinceList[0].district[0].name)

    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        setSelectedDistrict(provinceList[value - 1].district[0].name)
    };
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
                <Form.Item className={styles.formLabel} label="Địa chỉ chi tiết" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
                    <TextArea rows={2} allowClear showCount maxLength={100} />
                </Form.Item>
            </>
        )
    }

    const onFinish = () => {
        const formData = stepForm.getFieldsValue(true);

        // POST the data to backend and show Notification
        console.log(formData);
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
            </div>
        </div >
    )
};

export default RegisterPlace;