import React, { useState } from 'react'
import styles from './register.module.css';
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, DatePicker } from 'antd';
import { RegisterStepPanel } from '../Register/RegisterStepsPanel';
import RegisterPD from '../Register/RegisterProvinceDistrict';
const { TextArea } = Input;
const { Option } = Select;

export default function BasicInfoContainer() {

    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [form] = Form.useForm();

    const [districtList, setDistrictList] = useState(userDefaultDistrictList)


    //Cancel Button
    const onReset = () => {
        form.resetFields();
        setDistrictList(userDefaultDistrictList)
    };

    //Submit Button
    const onFinish = async () => {
        const formData = form.getFieldsValue(true);
        let districtId = 0;
        for (let i = 0; i < provinceList.length; i++) {
            for (let j = 0; j < provinceList[i].district.length; j++) {
                if (provinceList[i].district[j].name === formData.district) {
                    districtId = provinceList[i].district[j].id
                }
            }
        }

        // "title": "string",
        // "author": "string",
        // "content": "string",
        // "images": "string",
        // "category": 0

        const requestData = {
            "title": formData.name,
            "birthday": formData.birthday,
            "sex": formData.sex,
            "identityNum": formData.identityNum,
            "avatar": "something",
            "bloodType": formData.bloodType,
            "anamnesis": formData.anamnesis,
            "user": {
                "phone": formData.phone,
                "districtId": districtId,
                "addressDetails": formData.addressDetails
            }
        }

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            }),
            body: JSON.stringify(requestData),
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.success) {
            sessionStorage.setItem('user', JSON.stringify(requestData))
            navigate("/donor")
            setMessage("Thay đổi thành công")
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        form.setFieldsValue({ district: provinceList[value - 1].district[0].name })
    };

    return (
        <>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.subFormLabel} label="Họ và Tên" name="name" initialValue={user.name} rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>
                    <Form.Item className={styles.subFormLabel} label="Số điện thoại" name="phone" initialValue={user.user.phone} rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </Form.Item>
            </Form>
        </>
    )


}