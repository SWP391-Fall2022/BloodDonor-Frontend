import React, { useState } from 'react'
import styles from '../donor.module.css'
import packageInfo from "../../../shared/ProvinceDistrict.json";
import moment from 'moment';
import { Form, Input, Select, DatePicker, Button, notification } from 'antd';
import { useNavigate, useOutletContext } from 'react-router-dom';
const { Option } = Select;
const { TextArea } = Input;
export default function BasicInfoContainer() {

    const [user, setUser] = useOutletContext();
    if (user === null) {
        window.location.reload(false);
    }
    const [form] = Form.useForm();
    const navigate = useNavigate()
    let userDefaultDistrict;
    let userDefaultDistrictList;
    let userDefaultProvince;

    const provinceList = packageInfo.provinces

    //Find province based on user's districtID
    for (let i = 0; i < provinceList.length; i++) {
        for (let j = 0; j < provinceList[i].district.length; j++) {
            if (provinceList[i].district[j].id === user.districtId) {
                userDefaultDistrict = provinceList[i].district[j].name;
                userDefaultDistrictList = provinceList[i].district;
                userDefaultProvince = provinceList[i].name
            }
        }
    }

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

        const requestData = {
            "name": formData.name,
            "birthday": formData.birthday.format("YYYY-MM-DD"),
            "sex": formData.sex,
            "identityNum": formData.identityNum,
            "avatar": JSON.parse(sessionStorage.getItem('avatar')),
            "bloodType": formData.bloodType,
            "anamnesis": formData.anamnesis,
            "user": {
                "phone": formData.phone,
                "districtId": districtId,
                "addressDetails": formData.addressDetails
            }
        }
        // console.log(requestData)
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
        if (response.status === 400) {
            notification.error({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                placement: "top"
            });
            sessionStorage.clear()
            navigate("/");
        }
        if (response.status === 200) {
            notification.success({
                message: 'Đổi thông tin thành công',
                description: 'Đang tải lại thông tin mới',
                placement: "top"
            });
        }
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    };

    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        form.setFieldsValue({ district: provinceList[value - 1].district[0].name })
    };

    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>THÔNG TIN CƠ BẢN</div>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.subFormLabel} label="Họ và Tên" name="name" initialValue={user.name} rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>
                    <Form.Item className={styles.subFormLabel} label="Số điện thoại" name="phone" initialValue={user.phone} rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.subFormLabel} label="Ngày sinh" name="birthday" initialValue={moment(`${user.birthday}`)} rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                    </Form.Item>
                    <Form.Item className={styles.subFormLabel} label="Giới tính" name="sex" initialValue={user.sex} rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Select placeholder="Chọn">
                            <Option value="MALE">Nam</Option>
                            <Option value="FEMALE">Nữ</Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.subFormLabel} label="CMND" name="identityNum" initialValue={user.identityNum} rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <Input placeholder="Nhập số CMND" />
                    </Form.Item>
                    <Form.Item className={styles.subFormLabel} label="Nhóm máu" name="bloodType" initialValue={user.bloodType} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Select placeholder="Chọn">
                            <Option value="O">O</Option>
                            <Option value="A">A</Option>
                            <Option value="B">B</Option>
                            <Option value="AB">AB</Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.subFormLabel} label="Tỉnh" name="province" initialValue={userDefaultProvince} rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
                        <Select
                            showSearch placeholder="Chọn"
                            onChange={onProvinceChange}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {provinceList.map(a => (<Option key={a.id} >{a.name}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item className={styles.subFormLabel} label="Quận/Huyện" name="district" initialValue={userDefaultDistrict} rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px' }}>
                        <Select
                            showSearch placeholder="Chọn"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {districtList.map(a => (<Option key={a.id} value={a.name}>{a.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Địa chỉ chi tiết" name="addressDetails" initialValue={user.addressDetails}>
                    <TextArea rows={2} allowClear showCount maxLength={100} />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Tiền sử bệnh lý" name="anamnesis" initialValue={user.anamnesis}>
                    <TextArea rows={2} allowClear showCount maxLength={100} />
                </Form.Item>
                <Form.Item className={styles.buttonLabel}>
                    <Button id={`${styles.btn1}`} type="primary" htmlType="submit" size="large">
                        Thay đổi
                    </Button>
                    <Button id={`${styles.btn2}`} size="large" onClick={onReset}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}