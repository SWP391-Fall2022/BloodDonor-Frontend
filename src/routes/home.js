import { Select } from 'antd';
import React, { useState } from 'react'
import { Navbar } from '../components/navbar';
import packageInfo from "../shared/data.json";
const { Option } = Select;

function Home() {
    const provinceList = packageInfo.provinces
    const [districtList, setDistrictList] = useState(provinceList[0].district)
    const [selectedDistrict, setSelectedDistrict] = useState(provinceList[0].district[0].id)

    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        setSelectedDistrict(provinceList[value - 1].district[0].id)
    };

    const onDistrictChange = (value) => {
        setSelectedDistrict(value)
    }

    return (
        <div>
            <Navbar />
            <Select
                showSearch placeholder="Chọn"
                onChange={onProvinceChange}
                defaultValue={provinceList[0].name}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
                {provinceList.map(a => (<Option key={a.id} >{a.name}</Option>))}
            </Select>
            <Select
                showSearch placeholder="Chọn"
                onChange={onDistrictChange}
                value={selectedDistrict}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
                {districtList.map(a => (<Option key={a.id} value={a.id}>{a.name}</Option>))}
            </Select>
        </div>
    )
};

export default Home;