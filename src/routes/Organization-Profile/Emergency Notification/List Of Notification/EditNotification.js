import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import styles from '../../organization.module.css'
import packageInfo from "../../../../shared/ProvinceDistrict.json";
import { OrBread } from '../../organization-breadcrumb'
import { Link, useLocation, useNavigate } from "react-router-dom"
import stylesNoti from './editReview.module.css'
import { Button, Checkbox, Form, Input, notification, Select, Spin, Switch, Upload } from "antd"
import { useState } from "react"
import ImgCrop from "antd-img-crop";
import Editor from "../Create Notification/Editor";
import OrganizationReviewNotification from "./ReviewEditNotification";
import { useEffect } from "react";
import { useRef } from "react";
const { Option } = Select;

export default function OrganizationEditNotification() {
    //Breadcrumb props
    const breadName = <><Link to="/organization/notification"><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Chỉnh sửa thông báo khẩn cấp</>
    const layer1 = <Link to="/organization/notification">Quản lí thông báo khẩn cấp</Link>

    //Others define
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const effectRan = useRef(false)
    const [data, setData] = useState()
    const [fail, setFail] = useState(true)

    //Change between 2 components
    const [review, setReview] = useState(false)

    //For switch, Form Items don't accept switch with text
    const [sendMail, setSendMail] = useState(false)

    //Send to review components
    const [notificationInfo, setNotificationInfo] = useState(null)

    //Set up Province District
    const provinceList = packageInfo.provinces
    const [districtList, setDistrictList] = useState(provinceList[0].district)
    const [districtId, setDistrictId] = useState(provinceList[0].district[0].id);

    //Image
    const [loadImage, setLoadImage] = useState(false)
    const [image, setImage] = useState();
    //Cloudinary Public Img ID
    const [imagePublicId, setImagePublicId] = useState()

    //Initialize data
    useEffect(() => {
        if (effectRan.current === true) {
            async function fetchCampaign() {
                const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/readOne/${location.state.campaignId}`)
                    .then((res) => res.json())
                    .catch((error) => { console.log(error) })
                console.log(response)
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

                    //Get Bloodtype
                    const bloodTypes = response.body.bloodTypes.split('-')
                    //Make datas before set
                    const generateData = {
                        name: response.body.name,
                        description: response.body.description,
                        addressDetails: response.body.addressDetails,
                        districtName: districtName,
                        provinceName: provinceName,
                        bloodTypes: bloodTypes,
                    }
                    setImage(response.body.images)
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

    const showLoadingImage = () => {
        setLoadImage(true);
    };

    //Send request to cloudinary
    const uploadImage = async (file) => {
        //Remove old image first (if available)
        const timestamp = Math.floor(new Date().getTime() / 1000)
        const string = `public_id=${imagePublicId}&timestamp=${timestamp}${process.env.REACT_APP_CLOUD_API_SECRET}`
        const sha1 = require('js-sha1');
        const signature = sha1(string)

        const oldFormData = new FormData();
        oldFormData.append('public_id', imagePublicId);
        oldFormData.append('signature', signature);
        oldFormData.append('api_key', `${process.env.REACT_APP_CLOUD_API_KEY}`);
        oldFormData.append('timestamp', timestamp);
        await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`, {
            method: 'POST',
            body: oldFormData
        }).then(r => r.json());

        //Then load new image
        const formData = new FormData();
        formData.append('file', file.file)
        formData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`);
        const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        }).then(r => r.json());
        // console.log(data)
        setImage(data.url)
        sessionStorage.setItem("notiImage", JSON.stringify(data.url))
        setImagePublicId(data.public_id)
        sessionStorage.setItem("notiImageID", JSON.stringify(data.public_id))
    };

    //Province District
    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        form.setFieldsValue({ district: provinceList[value - 1].district[0].name })
        setDistrictId(provinceList[value - 1].district[0].id)
    };

    const onDistrictChange = (value) => {
        setDistrictId(value)
    }

    //Review Button
    const onReview = () => {
        form.validateFields()
            .then((formData) => {
                formData.images = image
                // console.log(formData)
                setNotificationInfo(formData)
                setReview(true)
                // navigate('/organization/notification/create/preview')
            })
            .catch((errorInfo) => { console.log(errorInfo) });
    }

    //Submit Button
    const onFinish = async () => {
        const formData = form.getFieldsValue(true);
        formData.districtId = districtId
        delete formData.province
        delete formData.district
        const bloodTypeString = formData.bloodTypes.join('-')

        const requestData = {
            "name": formData.name,
            "images": image,
            "description": formData.description,
            "emergency": true,
            "bloodTypes": bloodTypeString,
            "districtId": districtId,
            "addressDetails": formData.addressDetails,
            "sendMail": sendMail,
            "onSiteDates": null,
        }
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            }),
            body: JSON.stringify(requestData),
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/update/${location.state.campaignId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log(response)
        if (response.status === 400 || response.status === 403) {
            notification.error({
                message: response.body,
                placement: "top"
            });
        }
        if (response.status === 200) {
            notification.success({
                message: "Chỉnh sửa thành công",
                placement: "top"
            });
            navigate("/organization/notification");
        }
        // sessionStorage.removeItem("notiImage")
        // sessionStorage.removeItem("notiImageID")
    }

    const onReset = async () => {
        form.resetFields();
        setImage(null)
        sessionStorage.removeItem("notiImage")
        sessionStorage.removeItem("notiImageID")
        setLoadImage(false)
        const timestamp = Math.floor(new Date().getTime() / 1000)
        const string = `public_id=${imagePublicId}&timestamp=${timestamp}${process.env.REACT_APP_CLOUD_API_SECRET}`
        const sha1 = require('js-sha1');
        const signature = sha1(string)

        const oldFormData = new FormData();
        oldFormData.append('public_id', imagePublicId);
        oldFormData.append('signature', signature);
        oldFormData.append('api_key', `${process.env.REACT_APP_CLOUD_API_KEY}`);
        oldFormData.append('timestamp', timestamp);
        await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`, {
            method: 'POST',
            body: oldFormData
        }).then(r => r.json());
    };

    return (<>
        {!review ?
            <>
                <div className={styles.breadcrumb}><OrBread layer1={layer1} layer2="Chỉnh sửa thông báo khẩn cấp" name={breadName} /></div>
                <div className={styles.mainContainer}>
                    {fail ?
                        <></>
                        :
                        <>
                            <div className={stylesNoti.formContainer}>
                                <h1 style={{ padding: '1rem 0' }}><strong>CHỈNH SỬA THÔNG BÁO KHẨN CẤP</strong></h1>
                                <Form form={form} layout="vertical" onFinish={onFinish}
                                initialValues={{
                                    'description': data.description,
                                    'name': data.name,
                                    'province': data.provinceName,
                                    'district': data.districtName,
                                    'addressDetails': data.addressDetails,
                                    'bloodTypes': data.bloodTypes,
                                  }}>
                                    <Form.Item className={styles.formLabel} label="Tựa đề thông báo" name="name" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item className={styles.formLabel}>
                                        <Form.Item className={styles.formLabel} label="Tỉnh/Thành phố" name="province" rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                                            <Select
                                                showSearch placeholder="Chọn"
                                                onChange={onProvinceChange}
                                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                            >
                                                {provinceList.map(a => (<Option key={a.id} >{a.name}</Option>))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item className={styles.formLabel} label="Quận/Huyện" name="district" rules={[{ required: true, message: 'Vui lòng chọn' },]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                                            <Select
                                                showSearch placeholder="Chọn"
                                                onChange={onDistrictChange}
                                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                            >
                                                {districtList.map(a => (<Option key={a.id} value={a.id}>{a.name}</Option>))}
                                            </Select>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item className={styles.formLabel} label="Địa điểm" name="addressDetails" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item className={styles.formLabel} label="Yêu cầu về nhóm máu" name="bloodTypes" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                                        <Checkbox.Group options={["A", "B", "AB", "O"]} />
                                    </Form.Item>
                                    <Form.Item className={styles.formLabel} label="Nội dung thông báo">
                                        <Editor></Editor>
                                    </Form.Item>
                                    <Form.Item className={styles.formLabel} label="Hình ảnh cho thông báo" name="images">
                                        <ImgCrop grid rotate shape="round" modalTitle="Chỉnh sửa hình ảnh" modalCancel='Hủy' onModalOk={showLoadingImage}>
                                            <Upload
                                                className={stylesNoti.avatarUploader}
                                                name={stylesNoti.Avatar}
                                                customRequest={uploadImage}
                                                showUploadList={false}
                                            >
                                                {
                                                    image !== null ?
                                                        <img src={image} alt="" className={stylesNoti.avatar} />
                                                        :
                                                        <>
                                                            {
                                                                loadImage === true ?
                                                                    <Spin indicator={<LoadingOutlined spin />}>
                                                                        <div className={stylesNoti.avatarUploaderTrigger} />
                                                                    </Spin> :
                                                                    <div className={stylesNoti.avatarUploaderTrigger}>
                                                                        <PlusOutlined />
                                                                        <div>Upload</div>
                                                                    </div>
                                                            }
                                                        </>

                                                }
                                            </Upload>
                                        </ImgCrop>
                                    </Form.Item>
                                    <Form.Item className={styles.formLabel} valuePropName="checked" label="Tính năng nâng cao - Mặc định thông báo khẩn cấp sẽ không gửi mail">
                                        <Switch onChange={(value) => {
                                            setSendMail(value)
                                        }} style={{ margin: '0 2%' }} />
                                        Chỉ gửi mail cho tình nguyện hiến máu có địa chỉ thường trú trong khu vực.
                                    </Form.Item>
                                    <Form.Item>
                                        {/* <Link to="/organization/notification/create/preview"> */}
                                        <Button id={styles.btn3} style={{ margin: '1rem 2%' }} type="primary" size="large" onClick={onReview}>
                                            Xem trước
                                        </Button>
                                        {/* </Link> */}
                                        <Button id={styles.btn3} style={{ margin: '1rem 2%' }} type="primary" htmlType="submit" size="large">
                                            Hoàn thành
                                        </Button>
                                        <Button id={styles.btn4} style={{ margin: '1rem 2%' }} size="large" onClick={onReset}>
                                            Hủy lưu
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </>
                    }
                </div>
            </>
            :
            <OrganizationReviewNotification setReview={setReview} notificationInfo={notificationInfo} />
        }
    </>)
}