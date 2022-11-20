import { ArrowLeftOutlined } from "@ant-design/icons"
import styles from '../../organization.module.css'
import stylesNoti from './editReview.module.css'
import { OrBread } from '../../organization-breadcrumb'
import { Link } from "react-router-dom"
import { Button } from "antd"
import packageInfo from "../../../../shared/ProvinceDistrict.json";

export default function OrganizationReviewNotification({ setReview, notificationInfo }) {
    //Breadcrumb props
    const breadName = <><Link onClick={() => setReview(false)}><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Xem trước</>
    const layer1 = <Link to="/organization/notification">Quản lí thông báo khẩn cấp</Link>
    const layer2 = <Link onClick={() => setReview(false)}>Chỉnh sửa thông báo khẩn cấp</Link>

    //Get now date
    const date = new Date(Date.now()).getDate()
    const month = new Date(Date.now()).getMonth() + 1
    const year = new Date(Date.now()).getFullYear()

    //Get Bloodtype
    const bloodTypes = notificationInfo.bloodTypes
    const bloodTypeList = bloodTypes.map((item) =>
        <li className='blood-type-item'>{item}</li>
    );

    console.log(notificationInfo)

    //Get district and province name based on its id
    const provinceList = packageInfo.provinces
    let districtName = notificationInfo.district
    let provinceName = notificationInfo.province

    if (districtName !== "Bình Chánh") {
        for (let i = 0; i < provinceList.length; i++) {
            for (let j = 0; j < provinceList[i].district.length; j++) {
                if (provinceList[i].district[j].id === districtName) {
                    districtName = provinceList[i].district[j].name
                    if (provinceName !== "Hồ Chí Minh") {
                        provinceName = provinceList[i].name
                    }
                }
            }
        }
    }

    return (
        <>
            <div className={styles.breadcrumb}><OrBread layer1={layer1} layer2={layer2} layer3="Xem trước" name={breadName} /></div>
            <div className={styles.mainContainer}>
                <div className={stylesNoti.previewContainer}>
                    <div className='campaignDetail-left-title'>
                        <h1><strong>{notificationInfo.name}</strong></h1>
                        <div>Ngày đăng: {date < 10 ? "0" + date : date}/{month < 10 ? "0" + month : month}/{year} | {JSON.parse(sessionStorage.getItem("name"))}  </div>
                    </div>

                    <div className='campaign-detail-left-img' style={{ width: '40%' }}>
                        <img src={notificationInfo.images} alt="" />
                    </div>

                    <div className='campaign-content'>
                        <p><strong>{JSON.parse(sessionStorage.getItem("name"))} xin thông báo:</strong></p>
                        <div dangerouslySetInnerHTML={{ __html: notificationInfo.description }} />

                        <p><strong>Địa chỉ</strong></p>
                        <p>{notificationInfo.addressDetails}, {districtName}, {provinceName}</p>

                        <p><strong>Nhóm máu cần</strong></p>
                        <div className='blood-type'>
                            <ul>{bloodTypeList}</ul>
                        </div>

                        <p><strong>Xin lưu ý</strong></p>
                        <p>Khi đi hiến máu nhớ mang theo CMND hoặc CCCD (hoặc có hình ảnh kèm theo).</p>
                        <p>Xin trân trọng thông báo!!!</p>
                        <Button onClick={() => setReview(false)} id={styles.btn3} style={{ margin: '1rem 2%' }} type="primary" size="large">
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}