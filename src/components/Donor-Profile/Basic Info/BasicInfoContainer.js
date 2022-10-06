import React, { useState } from 'react'
import styles from '../donor.module.css'
import packageInfo from "../../../shared/ProvinceDistrict.json";
import moment from 'moment';
import { Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
export default function BasicInfoContainer() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    let userDefaultDistrict;
    let userDefaultProvince;

    const provinceList = packageInfo.provinces
    const [districtList, setDistrictList] = useState(provinceList[0].district)
    const [selectedDistrict, setSelectedDistrict] = useState(provinceList[0].district[0].id)

    //Find province based on user's districtID
    for (let i = 0; i < provinceList.length; i++) {
        for (let j = 0; j < provinceList[i].district.length; j++) {
            if (provinceList[i].district[j].id === user.user.districtId) {
                userDefaultDistrict = provinceList[i].district[j].name;
                userDefaultProvince = provinceList[i].name
            }
        }
    }

    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        setSelectedDistrict(provinceList[value - 1].district[0].id)
    };

    const onDistrictChange = (value) => {
        setSelectedDistrict(value)
    }
    return (
        <div className={styles.infoContainer}>
            <div className={styles.title}>THÔNG TIN CƠ BẢN</div>
            <Form layout="vertical">
                <Form.Item className={styles.formLabel} label="Họ và Tên" name="name" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <Input defaultValue={user.name} placeholder="Nhập họ và tên" />
                </Form.Item>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.subFormLabel} label="Ngày sinh" name="birthday" rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <DatePicker defaultValue={moment(`${user.birthday}`, 'YYYY-MM-DD')} format={'YYYY-MM-DD'} style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                    </Form.Item>
                    <Form.Item className={styles.subFormLabel} label="Giới tính" name="sex" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Select defaultValue={user.sex} placeholder="Chọn">
                            <Option value="MALE">Nam</Option>
                            <Option value="FEMALE">Nữ</Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.subFormLabel} label="CMND" name="identityNum" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <Input defaultValue={user.identityNum} placeholder="Nhập số CMND" />
                    </Form.Item>
                    <Form.Item className={styles.subFormLabel} label="Nhóm máu" name="bloodType" style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Select placeholder="Chọn">
                            <Option value="O">O</Option>
                            <Option value="A">A</Option>
                            <Option value="B">B</Option>
                            <Option value="AB">AB</Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel}>
                    <Form.Item className={styles.subFormLabel} label="Tỉnh" name="province" rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                        <Select
                            showSearch placeholder="Chọn"
                            onChange={onProvinceChange}
                            defaultValue={userDefaultProvince}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {provinceList.map(a => (<Option key={a.id} >{a.name}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item className={styles.subFormLabel} label="Quận/Huyện" rules={[{ required: true, message: 'Vui lòng chọn' },]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                        <Select
                            showSearch placeholder="Chọn"
                            onChange={onDistrictChange}
                            defaultValue={userDefaultDistrict}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {districtList.map(a => (<Option key={a.id} value={a.id}>{a.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className={styles.formLabel} label="Địa chỉ chi tiết" name="addressDetails">
                    <TextArea defaultValue={user.user.addressDetails} rows={2} allowClear showCount maxLength={100} />
                </Form.Item>
            </Form>
        </div>
    )
}