import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, notification, Spin, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import styles from './leftside.module.css'

export default function AvatarContainer() {
    let avatar = JSON.parse(sessionStorage.getItem('avatar'))
    const name = JSON.parse(sessionStorage.getItem('name'))
    const [loadImage, setLoadImage] = useState(false)
    //Modal Control
    const [open, setOpen] = useState(false);
    //Image url
    const [imageUrl, setImageUrl] = useState(avatar);
    const [imageUrlPreview, setImageUrlPreview] = useState(null);
    //Cloudinary Public Img ID
    const [currPublicId, setCurrPublicId] = useState(null)

    //avatar is NULL
    var randomColor = '#';
    for (var i = 0; i < 6; i++) {
        randomColor += Math.floor(Math.random() * 10);
    }

    var avaName = name.charAt(0);

    //Modal control
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        removeImage(currPublicId)
        setImageUrlPreview(null)
        setCurrPublicId(null)
        setLoadImage(false)
        setOpen(false)
    };
    const showLoading = () => {
        setLoadImage(true);
    };

    //Send request
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file.file)
        formData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`);
        const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        }).then(r => r.json());
        setImageUrlPreview(data.url)
        setCurrPublicId(data.public_id)
    };

    //Remove image from cloudinary
    const removeImage = async (public_Id) => {
        // console.log(public_Id)
        const timestamp = Math.floor(new Date().getTime() / 1000)
        const string = `public_id=${public_Id}&timestamp=${timestamp}${process.env.REACT_APP_CLOUD_API_SECRET}`
        const sha1 = require('js-sha1');
        const signature = sha1(string)

        const formData = new FormData();
        formData.append('public_id', public_Id);
        formData.append('signature', signature);
        formData.append('api_key', `${process.env.REACT_APP_CLOUD_API_KEY}`);
        formData.append('timestamp', timestamp);
        await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`, {
            method: 'POST',
            body: formData
        }).then(r => r.json());
    }

    //Accept Image send to database
    const onAcceptImage = async () => {
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            }),
            body: JSON.stringify({ "avatar": imageUrlPreview }),
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/user/updateAvatar`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.status === 200) {
            notification.success({
                message: 'Đổi ảnh đại diện thành công',
                placement: "top"
            });

            //Set Old Public Id and remove old image
            let oldPublicId = null;
            if (avatar !== null) {
                oldPublicId = avatar.split('/')[7].split(".")[0]
                // console.log(oldPublicId)
                removeImage(oldPublicId)
            }

            setImageUrl(imageUrlPreview)
            sessionStorage.setItem('avatar', JSON.stringify(imageUrlPreview))
            setImageUrlPreview(null)
        }
        setLoadImage(false)
        setOpen(false)
    }

    return (
        <div className={styles.leftContainer}>
            <div className={styles.avaContainer}>
                <Avatar className={styles.ava} size={140} src={imageUrl} style={{ backgroundColor: randomColor, fontSize: "60px" }} >{avaName}</Avatar>
                <Button onClick={showModal} shape='circle' size='large' type="link" icon={<EditOutlined />} id={styles.editIcon} />
            </div>
            <div className={styles.leftSideText}>{name}</div>
            <Modal open={open} onCancel={handleCancel} footer={false} style={{ transform: 'scale(0.8)' }} maskClosable={false}>
                <h1 style={{ textAlign: 'center' }}><strong>ĐỔI ẢNH ĐẠI DIỆN</strong></h1>
                <ImgCrop grid rotate shape="round" modalTitle="Chỉnh sửa hình ảnh" modalCancel='Hủy' onModalOk={showLoading}>
                    <Upload
                        className="profile-avatar-uploader"
                        name="profile-avatar"
                        customRequest={uploadImage}
                        showUploadList={false}
                    >
                        {
                            imageUrlPreview !== null ?
                                <img src={imageUrlPreview} alt="" className="profile-avatar" />
                                :
                                <>
                                    {
                                        loadImage === true ?
                                            <Spin indicator={<LoadingOutlined style={{ fontSize: 80, }} spin />}>
                                                <div className="profile-avatar-uploader-trigger" />
                                            </Spin> :
                                            <div className="profile-avatar-uploader-trigger">
                                                <PlusOutlined />
                                                <div>Upload</div>
                                            </div>
                                    }
                                </>

                        }
                    </Upload>
                </ImgCrop>
                {
                    imageUrlPreview !== null ?
                        <div style={{ textAlign: 'center' }}>
                            <Button id={styles.btn2} size="large" onClick={handleCancel}>
                                Hủy
                            </Button>
                            <Button id={styles.btn1} type="primary" htmlType="submit" size="large" onClick={onAcceptImage}>
                                Xác nhận
                            </Button>
                        </div> :
                        <></>
                }
            </Modal>
        </div>
    )
}