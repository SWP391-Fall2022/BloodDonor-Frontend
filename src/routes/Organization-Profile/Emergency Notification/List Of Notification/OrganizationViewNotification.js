import { ArrowLeftOutlined } from "@ant-design/icons"
import styles from '../../organization.module.css'
import stylesNoti from '../Create Notification/createReview.module.css'
import { OrBread } from '../../organization-breadcrumb'
import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { notification } from "antd"
import { useRef } from "react"
import packageInfo from "../../../../shared/ProvinceDistrict.json";

export default function OrganizationViewNotification() {
    //Breadcrumb props
    const breadName = <><Link to="/organization/notification"><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Xem thông báo khẩn cấp</>
    const layer1 = <Link to="/organization/notification">Quản lí thông báo khẩn cấp</Link>

    const location = useLocation()
    const [data, setData] = useState()
    const [fail, setFail] = useState(true)
    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === true) {
            async function fetchCampaign() {
                const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/readOne/${location.state.id}`)
                    .then((res) => res.json())
                    .catch((error) => { console.log(error) })
                // console.log(response)
                if (response.status === 200) {
                    //Province, District
                    const provinceList = packageInfo.provinces
                    let districtName = ''
                    let provinceName = ''
                    for (let i = 0; i < provinceList.length; i++) {
                        for (let j = 0; j < provinceList[i].district.length; j++) {
                            if (provinceList[i].district[j].id === response.body.districtId) {
                                districtName = provinceList[i].district[j].name
                                provinceName = provinceList[i].name
                            }
                        }
                    }
                    //Format Date
                    const date = new Date(response.body.startDate).getDate()
                    const month = new Date(response.body.startDate).getMonth() + 1
                    const year = new Date(response.body.startDate).getFullYear()

                    //Get Bloodtype
                    const bloodTypes = response.body.bloodTypes.split('-')
                    const bloodTypeList = bloodTypes.map((item) =>
                        <li className='blood-type-item'>{item}</li>
                    );
                    //Make datas before set
                    const generateData = {
                        name: response.body.name,
                        date: `${date < 10 ? "0" + date : date}/${month < 10 ? "0" + month : month}/${year}`,
                        images: response.body.images,
                        description: response.body.description,
                        addressDetails: response.body.addressDetails,
                        districtName: districtName,
                        provinceName: provinceName,
                        bloodTypeList: bloodTypeList,

                    }
                    setData(generateData)
                    setFail(false)
                }
            }
            if (location.state !== null) {
                fetchCampaign()
            } else {
                notification.error({
                    message: 'Không có thông báo được tìm thấy',
                    placement: 'top'
                })
                setFail(true)
            }
        }
        return () => {
            effectRan.current = true
        }
    }, [])

    return (
        <>
            <div className={styles.breadcrumb}><OrBread layer1={layer1} layer2="Xem thông báo khẩn cấp" name={breadName} /></div>
            <div className={styles.mainContainer}>
                {fail ?
                    <></>
                    :
                    <>
                        <div className={stylesNoti.formContainer}>
                            <div className='campaignDetail-left-title'>
                                <h1><strong>{data.name}</strong></h1>
                                <div>Ngày đăng: {data.date} | {JSON.parse(sessionStorage.getItem("name"))} </div>
                            </div>

                            <div className='campaign-detail-left-img' style={{ width: '40%' }}>
                                <img src={data.images} alt="" />
                            </div>

                            <div className='campaign-content'>
                                <p><strong>{JSON.parse(sessionStorage.getItem("name"))} xin thông báo:</strong></p>
                                <div dangerouslySetInnerHTML={{ __html: data.description }} />

                                <p><strong>Địa chỉ</strong></p>
                                <p>{data.addressDetails}, {data.districtName}, {data.provinceName}</p>

                                <p><strong>Nhóm máu cần</strong></p>
                                <div className='blood-type'>
                                    <ul>{data.bloodTypeList}</ul>
                                </div>

                                <p><strong>Xin lưu ý</strong></p>
                                <p>Khi đi hiến máu nhớ mang theo CMND hoặc CCCD (hoặc có hình ảnh kèm theo).</p>
                                <p>Xin trân trọng thông báo!!!</p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}