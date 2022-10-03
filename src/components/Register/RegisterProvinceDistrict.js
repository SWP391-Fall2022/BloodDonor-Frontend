import { Form, Select } from 'antd';
import React, { useState } from 'react'
import packageInfo from "../../shared/data.json";
import styles from '../../styles/register.module.css';
const { Option } = Select;

export default function RegisterPD() {
    const provinceList = packageInfo.provinces
    const [districtList, setDistrictList] = useState(provinceList[0].district)
    const [selectedDistrict, setSelectedDistrict] = useState(provinceList[0].district[0].id)

    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        setSelectedDistrict(provinceList[value - 1].district[0].id)        
        sessionStorage.setItem('districtId', JSON.stringify(provinceList[value - 1].district[0].id))
    };

    const onDistrictChange = (value) => {
        setSelectedDistrict(value)
        sessionStorage.setItem('districtId', JSON.stringify(value))
    }

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
                <Form.Item className={styles.formLabel} label="Quận/Huyện" rules={[{ required: true, message: 'Vui lòng chọn' },]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                    <Select
                        showSearch placeholder="Chọn"
                        onChange={onDistrictChange}
                        value={selectedDistrict}
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        {districtList.map(a => (<Option key={a.id} value={a.id}>{a.name}</Option>))}
                    </Select>
                </Form.Item>
            </Form.Item>
        </>
    )
};