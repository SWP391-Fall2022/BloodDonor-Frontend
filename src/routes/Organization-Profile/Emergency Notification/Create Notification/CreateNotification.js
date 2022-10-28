import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons"
import styles from '../../organization.module.css'
import packageInfo from "../../../../shared/ProvinceDistrict.json";
import { OrBread } from '../../organization-breadcrumb'
import { Link } from "react-router-dom"
import stylesNoti from './createReview.module.css'
import { Button, Checkbox, Form, Input, Select, Spin, Switch, Upload } from "antd"
import { useState } from "react"
import TextArea from "antd/lib/input/TextArea";
import ImgCrop from "antd-img-crop";
const { Option } = Select;

export default function OrganizationCreateNotification() {
    //Breadcrumb props
    const breadName = <><Link to="/organization/notification"><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Tạo thông báo khẩn cấp</>
    const layer1 = <Link to="/organization/notification">Quản lí thông báo khẩn cấp</Link>
    const [form] = Form.useForm();
    const provinceList = packageInfo.provinces
    const [districtList, setDistrictList] = useState(provinceList[0].district)
    const [districtId, setDistrictId] = useState(provinceList[0].district[0].id);

    //Image
    const [loadImage, setLoadImage] = useState(false)
    const [imageUrlPreview, setImageUrlPreview] = useState(null);

    //Province District
    const onProvinceChange = (value) => {
        setDistrictList(provinceList[value - 1].district)
        form.setFieldsValue({ district: provinceList[value - 1].district[0].name })
        setDistrictId(provinceList[value - 1].district[0].id)
    };

    const onDistrictChange = (value) => {
        setDistrictId(value)
    }
    const onFinish = async () => {
        const formData = form.getFieldsValue(true);
    }
    return (
        <>
            <div className={styles.breadcrumb}><OrBread layer1={layer1} layer2="Tạo thông báo khẩn cấp" name={breadName} /></div>
            <div className={styles.mainContainer}>
                <div className={stylesNoti.formContainer}>
                    <h1 style={{ padding: '1rem 0' }}><strong>TẠO THÔNG BÁO KHẨN CẤP</strong></h1>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item className={styles.formLabel} label="Tựa đề thông báo" name="name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item className={styles.formLabel}>
                            <Form.Item className={styles.formLabel} label="Tỉnh/Thành phố" name="province" initialValue={provinceList[0].name} rules={[{ required: true, message: 'Vui lòng chọn' }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                                <Select
                                    showSearch placeholder="Chọn"
                                    onChange={onProvinceChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    {provinceList.map(a => (<Option key={a.id} >{a.name}</Option>))}
                                </Select>
                            </Form.Item>
                            <Form.Item className={styles.formLabel} label="Quận/Huyện" name="district" initialValue={provinceList[0].district[0].name} rules={[{ required: true, message: 'Vui lòng chọn' },]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                                <Select
                                    showSearch placeholder="Chọn"
                                    onChange={onDistrictChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    {districtList.map(a => (<Option key={a.id} value={a.id}>{a.name}</Option>))}
                                </Select>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Địa điểm" name="name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Yêu cầu về nhóm máu" name="name" rules={[{ required: true }]}>
                            <Checkbox>Nhóm máu A</Checkbox>
                            <Checkbox>Nhóm máu B</Checkbox>
                            <Checkbox>Nhóm máu AB</Checkbox>
                            <Checkbox>Nhóm máu O</Checkbox>
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Nội dung thông báo" name="addressDetails">
                            <TextArea rows={10} allowClear />
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Hình ảnh cho thông báo">
                            <ImgCrop grid rotate shape="round" modalTitle="Chỉnh sửa hình ảnh" modalCancel='Hủy'>
                                <Upload
                                    className={stylesNoti.avatarUploader}
                                    name={stylesNoti.Avatar}
                                    // customRequest={uploadImage}
                                    showUploadList={false}
                                >
                                    <div className={stylesNoti.avatarUploaderTrigger}>
                                        <PlusOutlined />
                                        <div>Upload</div>
                                    </div>
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Tính năng nâng cao - Mặc định thông báo khẩn cấp sẽ gửi mail cho tất cả mọi người">
                            <div><Switch style={{ margin: '0 2%' }} />Chỉ gửi mail cho tình nguyện hiến máu có địa chỉ thường trú trong khu vực.</div>
                        </Form.Item>
                        <Form.Item>
                            <Link to="/organization/notification/create/preview">
                                <Button className={styles.btn3} style={{ margin: '1rem 2%' }} type="primary" size="large">
                                    Xem trước
                                </Button>
                            </Link>
                            <Button className={styles.btn3} style={{ margin: '1rem 2%' }} type="primary" htmlType="submit" size="large">
                                Hoàn thành
                            </Button>
                            <Button className={styles.btn4} style={{ margin: '1rem 2%' }} size="large">
                                Hủy lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}