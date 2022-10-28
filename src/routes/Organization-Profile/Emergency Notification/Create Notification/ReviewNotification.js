import { ArrowLeftOutlined } from "@ant-design/icons"
import styles from '../../organization.module.css'
import stylesNoti from './createReview.module.css'
import { OrBread } from '../../organization-breadcrumb'
import { Link } from "react-router-dom"

export default function OrganizationReviewNotification() {
    //Breadcrumb props
    const breadName = <><Link to="/organization/notification/create"><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Xem trước</>
    const layer1 = <Link to="/organization/notification">Quản lí thông báo khẩn cấp</Link>
    const layer2 = <Link to="/organization/notification/create">Tạo thông báo khẩn cấp</Link>
    return (
        <>
            <div className={styles.breadcrumb}><OrBread layer1={layer1} layer2={layer2} layer3="Xem trước" name={breadName} /></div>
            <div className={styles.mainContainer}>
                <div className={stylesNoti.formContainer}>
                    <div className='campaignDetail-left-title'>
                        <h1><strong>THÔNG BÁO NÀY LÀ TỰA ĐỀ</strong></h1>
                        <div>Ngày đăng: 06-09-2022 |  Trung Tâm Hiến Máu Nhân Đạo Thành Phố Hồ Chí Minh  </div>
                    </div>

                    <div className='campaign-detail-left-img'>
                        <img src="https://static.giotmauvang.org.vn/ihpstatic/LOGO/CTD.png" alt="" />
                    </div>

                    <div className='campaign-content'>
                        <p className='sub-title'>Trung tâm hiến máu nhân đạo xin thông báo:</p>
                        <p>
                            Quí tình nguyện viên tham gia hiến máu vui lòng đăng kí vào trang thông tin này
                            để thuận lợi hơn khi làm thủ thục chuẩn bị hiến máu.</p>

                        <p className='sub-title'>Thời gian:</p>
                        <p>Buổi sáng bắt đầu lúc 08h00 đến 11h00 <br></br>
                            Buổi chiều bắt đầu lúc 13h30 đến 17h00
                        </p>

                        <p className='sub-title'>Địa chỉ</p>
                        <p>36 đường 1B, phường Bình trị đông B, quận Bình Tân</p>

                        <p className='sub-title'>Nhóm máu cần</p>
                        <div className='blood-type'>
                            <ul >
                                <li className='blood-type-item'>{"Nhóm máu A".slice(8, 10)}</li>
                                <li className='blood-type-item'>{"Nhóm máu B".slice(8, 10)}</li>
                                <li className='blood-type-item'>{"Nhóm máu O".slice(8, 10)}</li>
                            </ul>
                        </div>

                        <p className='sub-title'>Xin lưu ý</p>
                        <p>Khi đi hiến máu nhớ mang theo CMND hoặc CCCD (hoặc có hình ảnh kèm theo).</p>
                        <p>Xin trân trọng thông báo!!!</p>
                        {/* <RegisterCampaign campaign={campaign} registered={registered}></RegisterCampaign> */}
                    </div>
                </div>
            </div>
        </>
    )
}