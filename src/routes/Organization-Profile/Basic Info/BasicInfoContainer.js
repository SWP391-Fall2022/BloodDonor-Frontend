import React, { useState } from 'react'
import styles from '../organization.module.css'
import packageInfo from "../../../shared/ProvinceDistrict.json";
import { Form, Input, Select, Button, notification, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useOutletContext } from 'react-router-dom';
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
export default function BasicInfoContainer() {

    const [user, setUser] = useOutletContext();
    let introduction1 = "";
    let introduction2 = "";
    // console.log(user)
    const [form] = Form.useForm();
    if (user.introduction !== null) {
        const splitArr = user.introduction.split("¥£$€")
        introduction1 = splitArr[0];
        introduction2 = splitArr[1];
    }

    // console.log(introduction1)
    // console.log(introduction2)
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

    //Submit
    const onFinish = () => {
        confirm({
            title: 'Bạn có muốn kiểm tra lại thông tin trước khi lưu không?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Lưu',
            cancelText: 'Xem lại',
            onOk() {
                onConfirm();
            },
        });
    }

    //Confirm Submit
    const onConfirm = async () => {
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
            "districtId": districtId,
            "addressDetails": formData.addressDetails,
            "phone": formData.phone,
            "introduction": formData.introduction1 + "¥£$€" + formData.introduction2,
            "website": formData.website
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
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/organization/updateInfo`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.success) {
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
            <div className={styles.title}>THAY ĐỔI THÔNG TIN</div>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item className={styles.FormLabel} label="Tên tổ chức" initialValue={user.name} name="name" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} >
                    <Input placeholder="Nhập tên tổ chức" />
                </Form.Item>
                <Form.Item className={styles.FormLabel} label="Số điện thoại" name="phone" initialValue={user.phone} rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]} >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <div className={styles.textLabel}><strong>Email: </strong>{user.email}</div>
                <div className={styles.textLabel}><strong>Mã số thuế: </strong>{user.taxCode}</div>
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
                    <TextArea rows={2} allowClear showCount maxLength={50} />
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Chức năng và nhiệm vụ chung" name="introduction1" initialValue={introduction1}>
                    <TextArea rows={10} allowClear showCount maxLength={1000}/>
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Phạm vi hoạt động" name="introduction2" initialValue={introduction2}>
                    <TextArea rows={10} allowClear showCount maxLength={1000}/>
                </Form.Item>
                <Form.Item className={styles.formLabel}>
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