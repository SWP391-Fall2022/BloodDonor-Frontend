import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import packageInfo from '../../../shared/ListOfCampaign.json';
import { Breadcrumb, Button, Collapse, Radio, Modal } from 'antd';
import './CampaignDetail.css';
import GoldShield from '../../../assets/awards/Gold-Shield.png';
import SilSol from '../../../assets/awards/Sil-Sol.png';
import CopCoin from '../../../assets/awards/Cop-Coin.png';

export default function CampaignDetail() {

    const campaignTitle = useParams();

    const campaign = packageInfo.listOfCampaign.find(obj => {

        return obj.id == campaignTitle.id;
    });

    //  render blood types
    const listBloodType = campaign.blood.map((bloodType) =>
        <li className='blood-type-item'>{bloodType.slice(8, 10)}</li>
    );

    //panel for q&a
    const { Panel } = Collapse;

    //Get days for choose day ----------------------
    var startDate = new Date(campaign.startDate);
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
        console.log('radio checked', e.target.value);
        setDateValue(e.target.value);
    };

    // setup time of day radio-------------------------------------
    const [timeValue, setTimeValue] = useState("sa");

    const onTimeChange = (e) => {
        console.log('radio checked', e.target.value);
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

  
    console.log("dateValue:", dateValue);

    return (

        <>
            <div className='campaign-detail-container'>

                <div className='campaignDetail-left'>
                    <div className='campaignDetail-left-title'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={'/campaign'}>Chiến dịch</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>THÔNG BÁO</Breadcrumb.Item>
                        </Breadcrumb>

                        <h2 className='campaign-title' > THÔNG BÁO</h2>
                        <div>Ngày đăng:{startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()} |  {campaign.organization}  </div>
                    </div>

                    <div className='campaign-detail-left-img'>
                        <img src={campaign.image} alt={campaign.organization} />
                    </div>

                    <div className='campaign-content'>
                        <p className='sub-title'>{campaign.organization} xin thông báo:</p>
                        <p>Điểm hiến máu cố định tại khu vực Bình tân từ ngày 17/09/2022 đến ngày 18/09/2022.
                            Quí tình nguyện viên tham gia hiến máu vui lòng đăng kí vào trang thông tin này
                            để thuận lợi hơn khi làm thủ thục chuẩn bị hiến máu.</p>

                        <p className='sub-title'>Thời gian:</p>
                        <p>Buổi sáng bắt đầu lúc 08h00 đến 11h00 <br></br>
                            Buổi chiều bắt đầu lúc 13h30 đến 17h00
                        </p>


                        <p className='sub-title'>Địa chỉ</p>
                        <p>{campaign.AddressDetail}</p>

                        <p className='sub-title'>Nhóm máu cần</p>
                        <div className='blood-type'>
                            <ul >{listBloodType}</ul>
                        </div>

                        <p className='sub-title'>Xin lưu ý</p>
                        <p>Khi đi hiến máu nhớ mang theo CMND hoặc CCCD (hoặc có hình ảnh kèm theo).</p>
                        <p>Xin trân trọng thông báo!!!</p>

                        <p className='sub-title'>Chọn ngày</p>
                        <div className='date'>
                            <Radio.Group onChange={onDateChange} value={dateValue}>

                                {
                                    daylist.map((day) =>
                                        <div>
                                            <Radio value={day.toDateString()}>{getDayOfWeek(day)},{day.getDate()}/{day.getMonth() + 1}/{day.getFullYear()}</Radio>
                                        </div>
                                    )

                                }
                            </Radio.Group>

                        </div>

                        <p className='sub-title'>Chọn buổi</p>
                        <div className='time'>
                            <Radio.Group onChange={onTimeChange} value={timeValue}>

                                <Radio value={"sa"}>Buổi sáng: 8h00 đến 11h00</Radio>
                                <Radio value={"ch"}>Buổi chiều: 13h30 đến 17h00</Radio>

                            </Radio.Group>
                        </div>

                        <p>Còn n lượt đăng ký vào buổi ... thứ ... </p>

                        <Button id='join'>Tham gia</Button>
                        <Button id='senqna'>Gửi câu hỏi</Button>


                    </div>

                </div>

                <div className='campaignDetail-right'>
                    <div className='medals-avatar'>

                        <div className='avatar'>
                            <Link to={`/organization/${campaign.organizationId}`}>
                                <img src={campaign.image} alt={campaign.organization} />
                            </Link>

                        </div >
                        <p className='organization-name'>{campaign.organization}</p>


                        <div className='medals'>

                            <div className='campaignDetail-medal-item'>
                                <img src={GoldShield} alt='' />
                                <p>Tổ chức <br></br> Hiến máu vàng </p>
                            </div>

                            <div className='campaignDetail-medal-item'>
                                <img src={SilSol} alt='' />
                                <p>Tổ chức <br></br> Năng động bạc </p>
                            </div>

                            <div className='campaignDetail-medal-item'>
                                <img src={CopCoin} alt='' />
                                <p>Tổ chức <br></br> Gắn bó đồng </p>
                            </div>

                        </div >

                    </div >


                    <section className="campaignDetail-q-and-a">
                        <h3>Q&A</h3>

                        <Collapse className="campaignDetail-q-and-a-container">
                            <Panel header="Ai có thể tham gia hiến máu?" className="campaignDetail-q-and-a-card">
                                <li>
                                    Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của
                                    mình để cứu chữa người bệnh.
                                </li>
                                <li>
                                    Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến
                                    mỗi lần không quá 9ml/kg cân nặng và không quá 500ml mỗi lần.
                                </li>
                                <li>
                                    Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh
                                    lây nhiễm qua đường truyền máu khác.
                                </li>
                                <li>
                                    Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.
                                </li>
                                <li>Có giấy tờ tùy thân.</li>
                            </Panel>
                        </Collapse>
                        <Collapse className="campaignDetail-q-and-a-container">
                            <Panel
                                header="Ai là người không nên hiến máu?"
                                className="campaignDetail-q-and-a-card"
                            >
                                <li>
                                    Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV,
                                    viêm gan B, viêm gan C, và các vius lây qua đường truyền máu.
                                </li>
                                <li>
                                    Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày…
                                </li>
                            </Panel>
                        </Collapse>
                        <Collapse className="campaignDetail-q-and-a-container">
                            <Panel
                                header="Máu của tôi sẽ được làm những xét nghiệm gì?"
                                className="campaignDetail-q-and-a-card"
                            >
                                <li>
                                    Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu (hệ
                                    ABO, hệ Rh), HIV, virus viêm gan B, virus viêm gan C, giang mai,
                                    sốt rét.
                                </li>
                                <li>
                                    Bạn sẽ được thông báo kết quả, được giữ kín và được tư vấn (miễn
                                    phí) khi phát hiện ra các bệnh nhiễm trùng nói trên.
                                </li>
                            </Panel>
                        </Collapse>

                        <Collapse className="campaignDetail-q-and-a-container">
                            <Panel header="Ai có thể tham gia hiến máu?" className="campaignDetail-q-and-a-card">
                                <li>
                                    Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của
                                    mình để cứu chữa người bệnh.
                                </li>
                                <li>
                                    Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến
                                    mỗi lần không quá 9ml/kg cân nặng và không quá 500ml mỗi lần.
                                </li>
                                <li>
                                    Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh
                                    lây nhiễm qua đường truyền máu khác.
                                </li>
                                <li>
                                    Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.
                                </li>
                                <li>Có giấy tờ tùy thân.</li>
                            </Panel>
                        </Collapse>
                        <Collapse className="campaignDetail-q-and-a-container">
                            <Panel
                                header="Ai là người không nên hiến máu?"
                                className="campaignDetail-q-and-a-card"
                            >
                                <li>
                                    Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV,
                                    viêm gan B, viêm gan C, và các vius lây qua đường truyền máu.
                                </li>
                                <li>
                                    Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày…
                                </li>
                            </Panel>
                        </Collapse>
                        <Collapse className="campaignDetail-q-and-a-container">
                            <Panel
                                header="Máu của tôi sẽ được làm những xét nghiệm gì?"
                                className="campaignDetail-q-and-a-card"
                            >
                                <li>
                                    Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu (hệ
                                    ABO, hệ Rh), HIV, virus viêm gan B, virus viêm gan C, giang mai,
                                    sốt rét.
                                </li>
                                <li>
                                    Bạn sẽ được thông báo kết quả, được giữ kín và được tư vấn (miễn
                                    phí) khi phát hiện ra các bệnh nhiễm trùng nói trên.
                                </li>
                            </Panel>
                        </Collapse>

                    </section>
                </div >
            </div >

        </>



    )
}
