import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import styles from './leftside.module.css'

export default function AvatarContainer() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(user.avatar);
    const [imageUrlPreview, setImageUrlPreview] = useState(null);

    var randomColor = '#';
    for (var i = 0; i < 6; i++) {
        randomColor += Math.floor(Math.random() * 10);
    }

    var avaName = user.name.charAt(0);

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
    };

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
        console.log(response)
        if (response.status === 200) {
            notification.success({
                message: 'Đổi avatar thành công',
                placement: "top"
            });
            //TO-DO: Remove old image uploaded to Cloudinary 
            setImageUrl(imageUrlPreview)
            user.avatar = imageUrlPreview
            setImageUrlPreview(null)
            sessionStorage.setItem('user', JSON.stringify(user))
        }
        setOpen(false)
    }

    //Not accept Image
    const cancelChange = async () => {
        setOpen(false)
    }

    return (
        <div className={styles.leftContainer}>
            <div className={styles.avaContainer}>
                <Avatar className={styles.ava} size={160} src={imageUrl} style={{ backgroundColor: randomColor, fontSize: "60px" }} >{avaName}</Avatar>
                <Button onClick={showModal} shape='circle' size='large' type="link" icon={<EditOutlined />} className={styles.editIcon} />
            </div>
            <div className={styles.leftSideText}>{user.name}</div>
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