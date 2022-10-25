import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import styles from './leftside.module.css'

export default function AvatarContainer() {
    let avatar = JSON.parse(sessionStorage.getItem('avatar'))
    const name = JSON.parse(sessionStorage.getItem('name'))
    //Modal Control
    const [open, setOpen] = useState(false);
    //Image url
    const [imageUrl, setImageUrl] = useState(avatar);
    const [imageUrlPreview, setImageUrlPreview] = useState(null);
    //Cloudinary Public Img ID
    const [currPublicId, setCurrPublicId] = useState(null)
    const [oldPublicId, setOldPublicId] = useState(null)

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
        setOpen(false);
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
        console.log(public_Id)
        const timestamp = Math.floor(new Date().getTime() / 1000)
        const string = `public_id=${public_Id}&timestamp=${timestamp}${process.env.REACT_APP_CLOUD_API_SECRET}`
        const sha1 = require('js-sha1');
        const signature = sha1(string)

        const formData = new FormData();
        formData.append('public_id', public_Id);
        formData.append('signature', signature);
        formData.append('api_key', `${process.env.REACT_APP_CLOUD_API_KEY}`);
        formData.append('timestamp', timestamp);
        const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`, {
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
                message: 'Đổi avatar thành công',
                placement: "top"
            });

            //Set old Public ID here to prevent loop render
            if (avatar !== null) {
                const string = avatar.split("/")
                const newString = string[7].split(".")
                console.log(newString[0])
                setOldPublicId(newString[0], removeImage(oldPublicId))
            }

            setImageUrl(imageUrlPreview)
            sessionStorage.setItem('avatar', JSON.stringify(imageUrlPreview))
            setImageUrlPreview(null)
            setOldPublicId(currPublicId)
        }
        setOpen(false)
    }

    //Not accept Image
    const cancelChange = () => {
        //Remove current preview image uploaded to Cloudinary 
        removeImage(currPublicId)
        setImageUrlPreview(null)
        setCurrPublicId(null)
        setOpen(false)
    }

    return (
        <div className={styles.leftContainer}>
            <div className={styles.avaContainer}>
                <Avatar className={styles.ava} size={160} src={imageUrl} style={{ backgroundColor: randomColor, fontSize: "60px" }} >{avaName}</Avatar>
                <Button onClick={showModal} shape='circle' size='large' type="link" icon={<EditOutlined />} className={styles.editIcon} />
            </div>
            <div className={styles.leftSideText}>{name}</div>
            <Modal open={open} onCancel={handleCancel} footer={false} style={{ transform: 'scale(0.8)' }}>
                <h1 style={{ textAlign: 'center' }}><strong>ĐỔI ẢNH ĐẠI DIỆN</strong></h1>
                <ImgCrop grid rotate shape="round">
                    <Upload
                        className="avatar-uploader"
                        name="avatar"
                        customRequest={uploadImage}
                        showUploadList={false}
                    >
                        {
                            imageUrlPreview !== null ?
                                <img src={imageUrlPreview} alt="" className="avatar" />
                                :
                                <div className="avatar-uploader-trigger">
                                    <PlusOutlined />
                                    <div>Upload</div>
                                </div>
                        }
                    </Upload>
                </ImgCrop>
                {
                    imageUrlPreview !== null ?
                        <div style={{ textAlign: 'center' }}>
                            <Button className={`${styles.btn2}`} size="large" onClick={cancelChange}>
                                Hủy
                            </Button>
                            <Button className={`${styles.btn1}`} type="primary" htmlType="submit" size="large" onClick={onAcceptImage}>
                                Xác nhận
                            </Button>
                        </div> :
                        <></>
                }
            </Modal>
        </div>
    )
}