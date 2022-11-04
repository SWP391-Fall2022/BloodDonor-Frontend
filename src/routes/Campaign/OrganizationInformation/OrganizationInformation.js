import React from 'react';
import { useParams, Link } from 'react-router-dom';
import packageInfo from '../../../shared/ListOfOrganization.json';
import packageCampaignInfo from "../../../shared/ListOfCampaign.json";
import { Navbar } from '../../../components/NavBar/navbar';
import { Footer } from '../../../components/Footer/Footer';
import './OrganizationInformation.css';
import { Breadcrumb, List } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import GoldShield from '../../../assets/awards/Gold-Shield.png';
import SilSol from '../../../assets/awards/Sil-Sol.png';
import CopCoin from '../../../assets/awards/Cop-Coin.png';



export default function OrganizationInformation() {
    const organizationTitle = useParams();

    const organization = packageInfo.listOfCampaign.find(obj => {

        return obj.id == organizationTitle.id;
    });

    const campaignList = packageCampaignInfo.listOfCampaign.filter(campaign => {
        return campaign.organizationId == organization.id;
    }
    )
    // console.log(campaignList);

    return (
        <>
            <Navbar></Navbar>
            <div className='organization-container'>
                <div className='organization-left'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={'/campaign'}>Chiến dịch</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>THÔNG BÁO</Breadcrumb.Item>
                        <Breadcrumb.Item>Thông tin tổ chức hiến máu</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='organization-left-title'>


                        <h2 className='organization-title' > THÔNG TIN TỔ CHỨC HIẾN MÁU</h2>

                        <div className='organization-left-avatar'>
                            <img src={organization.avatar} alt={organization.name} />
                        </div>

                        <h3 className='organization-name' >{organization.name}</h3>
                    </div>

                    <div className='informations'>
                        <p><strong>Giới thiệu chung</strong></p>
                        <p><strong>Địa chỉ: </strong>{organization.address}</p>
                        <p><strong>Điện thoại:</strong> {organization.phone}</p>

                        <p><strong>Email: </strong>{organization.email}</p>

                        
                            <p className='intro'><strong>Chức năng mà nhiệm vụ</strong></p>
                            - Trung tâm truyền máu Chợ Rẫy thuộc Bệnh viện Chợ Rẫy có chức năng tham mưu, giúp Giám đốc bệnh viện xây dựng chiến lược tổng thể, tổ chức thực hiện và quản lý tập trung việc thực hiện công tác truyền máu, đảm bảo cung ứng đủ máu, chất lượng, an toàn, kịp thời cho công tác cấp cứu, hồi sức, điều trị bệnh nhân trong khu vực phía Nam; đào tạo bồi dưỡng về công tác truyền máu cho cán bộ y tế tuyến dưới.
                            <br></br>
                            - Trung tâm truyền máu Chợ Rẫy chịu trách nhiệm thực hiện những nhiệm vụ sau:
                            <br></br>
                            Xây dựng và phát triển phong trào vận động hiến máu tình nguyện phát triển bền vững
                            <br></br>
                            Đảm bảo thực hiện nhiệm vụ quan trọng hàng đầu của một của Trung tâm Truyền máu là tiếp nhận và cung cấp đủ máu, thành phần máu có chất lượng cao, an toàn phục vụ nhu cầu cấp cứu, điều trị bệnh.
                            <br></br>
                            Phát triển chương trình sử dụng máu và các chế phẩm máu hiệu quả trên lâm sàng
                           

                            <p className='intro'><strong>Phạm vi phục vụ</strong></p>
                            Trung tâm truyền máu khu vực Chợ Rẫy phục vụ cho hơn 50 bệnh viện là:
                            <br></br>
                            - Bệnh viện Chợ Rẫy.
                            <br></br>
                            - Bệnh viện Thống nhất.
                            <br></br>
                            - Các bệnh viện thuộc 5 tỉnh miền Đông Nam Bộ: Đồng Nai, Bình Dương, Bình Phước, Tây Ninh, Bà Rịa-Vũng Tàu với tổng dân số trên 10 triệu dân.
                       


                    </div>

                </div>
                <div className='organization-right'>
                    <div className='organization-achievement'>
                        <p className='organization-achievement-title'>Thành tích</p>

                        <div className='medals'>

                            <div className='organization-medal-item'>
                                <img src={GoldShield} alt='' />
                                <p>Tổ chức <br></br> Hiến máu vàng </p>
                            </div>

                            <div className='organization-medal-item'>
                                <img src={SilSol} alt='' />
                                <p>Tổ chức <br></br> Năng động bạc </p>
                            </div>

                            <div className='organization-medal-item'>
                                <img src={CopCoin} alt='' />
                                <p>Tổ chức <br></br> Gắn bó đồng </p>
                            </div>

                        </div >
                    </div>

                    <div className='ongoing-campaign'>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    // console.log(page);
                                },
                                pageSize: 2,
                            }}

                            dataSource={campaignList}

                            renderItem={(item) => (
                                <List.Item>
                                    <div className="campaign-item">
                                        <p className='campaign-name'>{item.name} ĐANG DIỄN RA</p>

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
                                                        <HeartFilled style={{ color: "#f44a43" }}></HeartFilled>
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


            </div>
            <Footer></Footer>

        </>
    )
}