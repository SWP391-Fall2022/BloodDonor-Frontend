import React, { useState, useEffect } from "react";
import packageInfo from "../../../shared/ListOfCampaign.json";
import './CampaignContainer.css';
import { FormGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { List,DatePicker, Checkbox, Input } from "antd";
import { HeartFilled } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Search } = Input;

const campaignData = packageInfo.listOfCampaign;

const campaign = [
    { blood: "Nhóm máu A" },
    { blood: "Nhóm máu B" },
    { blood: "Nhóm máu AB" },
    { blood: "Nhóm máu O" }
];

const locationCampaign = [
    { province: "TP.HCM" },
    { province: "Quy Nhơn" },
    { province: "Hà Nội" },
    { province: "Đà Nẵng" },
    { province: "Cần Thơ" }
];

function take_duplicate_element(array, size) {
    let result = [];
    let count = 0;
    for (let i = 0; i < size - 1; ++i) {
        for (let j = i + 1; j < size; ++j) {
            if (array[i] == array[j]) {
                /*Tìm thấy phần tử trùng thì thêm vào mảng kết quả*/
                result[count] = array[i];
                ++count;
            }
        }
    }
    return result
}

function CampaignContainer()  {
    const [blood, setBlood] = useState([]);
    const [filteredBlood, setFilteredBlood] = useState([]);

    const [province, setProvince] = useState([]);
    const [filteredProvince, setFilteredProvince] = useState([]);

    const [endFilter, setEndFilter] = useState([]);

    

    const handleChange = e => {
        if (e.target.checked) {
            setBlood([...blood, e.target.value]);
            setProvince([...province, e.target.value]);

        } else {
            setBlood(blood.filter(id => id !== e.target.value));
            setProvince(province.filter(id => id !== e.target.value));
        }
    };

    useEffect(() => {
        if (blood.length === 0) {
            setFilteredBlood(campaignData);
        } else {
            setFilteredBlood(
                campaignData.filter(campaign =>
                    blood.some(category => [campaign.blood].flat().includes(category))
                )
            );
        }
        setEndFilter([...endFilter, filteredBlood]);
    }, [blood]);

    useEffect(() => {
        if (province.length === 0) {
            setFilteredProvince(campaignData);
        } else {
            setFilteredProvince(
                campaignData.filter(campaign =>
                    province.some(category => [campaign.province].flat().includes(category))
                )
            );
        }
        setEndFilter([...endFilter, filteredProvince]);
        // take_duplicate_element(endFilter,endFilter.length);

    }, [province]);

    useEffect(() => {
        setEndFilter(filteredProvince);
    }, [endFilter]);


    return (

        <div id="campaign-container">

            <div className="filter-table">
                <FormGroup>
                    <div className="filter-by-blood">
                        <p>Lọc theo nhóm máu</p>
                        {campaign.map(campaign => (
                            <div className="filter-item">
                                <Checkbox onChange={handleChange} value={campaign.blood} id={campaign.id}> {campaign.blood} </Checkbox>
                            </div>
                        ))}
                    </div>

                    <div className="filter-by-province">
                        <p>Lọc theo vị trí</p>
                        {locationCampaign.map(campaign => (
                            <div className="filter-item">
                                <Checkbox onChange={handleChange} value={campaign.province} id={campaign.id}> {campaign.province} </Checkbox>
                            </div>
                        ))}
                    </div>


                </FormGroup>
            </div>


            <div className="search-campaign">
                <div className="date-seach">
                    <RangePicker />

                    <Search className='search' placeholder="Nhập tên chiến dịch hoặc tổ chức hiến máu mà bạn muốn tìm" enterButton ></Search>
                </div>

                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 6,
                    }}
                    grid={{
                        gutter: 10,
                        column: 2,
                    }}
                    dataSource={filteredBlood}

                    renderItem={(item) => (
                        <List.Item>
                            <div className="campaign-item">
                             
                                <Link to={`/campaign/campaign-detail/${item.id}`} >
                                    <div className="campaign-card">
                                        <div className="campaign-header">
                                            <a className="campaign-organization-name" href="#organization">
                                                {item.organization}
                                            </a>
                                        </div>
                                        <div className="campaign-img-container">
                                            <img src={item.image} alt={item.organization}></img>
                                        </div>
                                        <div className="campaign-card-content">
                                            <a href="#name" className="campaign-name">
                                                {item.name}
                                            </a>
                                            <a href="#address" className="campaign-address">
                                                {item.AddressDetail}
                                            </a>
                                            <div className="campaign-time">
                                                Từ {item.startDate} đến {item.endDate}
                                            </div>
                                        </div>
                                        <div className="campaign-card-footer">
                                            <div className="campaign-react">
                                                <HeartFilled style={{color:"#f44a43"}}></HeartFilled>
                                            </div>
                                            <a className="campaign-report" href="#report">
                                                Báo cáo
                                            </a>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </List.Item>

                    )}
                />
            </div>
        </div>
    );
};

export default CampaignContainer;