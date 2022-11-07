import React, { useState } from 'react';
import {  Radio } from 'antd';
import './RegisterCampaign.css';

export default function RegisterCampaign({ campaign , registered}) {

    //Get days for choose day ----------------------
    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };
    var daylist = getDaysArray(new Date(campaign.startDate), new Date(campaign.endDate));



    // setup date radio-------------------------------------
    const [dateValue, setDateValue] = useState("1999-01-01");

    const onDateChange = (e) => {
        // console.log('radio checked', e.target.value);
        setDateValue(e.target.value);
    };

    // setup time of day radio-------------------------------------
    const [timeValue, setTimeValue] = useState("sa");

    const onTimeChange = (e) => {
        // console.log('radio checked', e.target.value);
        setTimeValue(e.target.value);
    };

    const getDayOfWeek = (day) => {
        var useday = new Date(day);
        switch (useday.getDay()) {
            case 0:
                return "Chủ Nhật";
            case 1:
                return "Thứ hai";
            case 2:
                return "Thứ ba";
            case 3:
                return "Thứ tư";
            case 4:
                return "Thứ năm";
            case 5:
                return "Thứ sáu";
            case 6:
                return "Thứ bảy";
            default:
                break;
        }
    }

    return (
        <>

            <p className='sub-title'>Chọn ngày</p>

            <div className='register-date-cover'>
                <div className='register-date'>
                    <Radio.Group onChange={onDateChange} value={dateValue} disabled={registered ? true : false}>

                        {
                            daylist.map((day) =>
                                <div>
                                    <Radio value={day.toDateString()}>{getDayOfWeek(day)}, {day.getDate()}/{day.getMonth() + 1}/{day.getFullYear()}</Radio>
                                </div>
                            )

                        }
                    </Radio.Group>

                </div>
            </div>

            <p className='sub-title'>Chọn buổi</p>
            <div className='register-time'>
                <Radio.Group onChange={onTimeChange} value={timeValue} disabled={registered ? true : false}>

                    <Radio value={"sa"}>Buổi sáng: 8h00 đến 11h00</Radio>
                    <Radio value={"ch"}>Buổi chiều: 13h30 đến 17h00</Radio>

                </Radio.Group>
            </div>

            <p className='num-of-registered'>Còn n lượt đăng ký vào buổi ... thứ ... </p></>
    )




}