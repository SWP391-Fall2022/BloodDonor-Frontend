import { EditOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import styles from './leftside.module.css'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default function AvatarContainer() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleChange = (info) => {
        console.log(info)
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => setImageUrl(imageUrl));
        }
    }
    return (
        <div className={styles.leftContainer}>
            <div className={styles.avaContainer}>
                <Avatar className={styles.ava} size={160} icon={<UserOutlined />} />
                <Button onClick={showModal} shape='circle' size='large' type="link" icon={<EditOutlined />} className={styles.editIcon} />
            </div>
            <div className={styles.leftSideText}>{user.name}</div>
            <Modal open={open} onCancel={handleCancel} footer={false}>
                <h1 style={{ textAlign: 'center' }}><strong>ĐỔI ẢNH ĐẠI DIỆN</strong></h1>
                <ImgCrop grid rotate shape="round">
                    <Upload
                        className="avatar-uploader"
                        name="avatar"
                        action="//jsonplaceholder.typicode.com/posts/"
                        showUploadList={false}
                        onChange={handleChange}
                    >
                        {
                            imageUrl ?
                                <img src={imageUrl} alt="" className="avatar" /> :
                                <div className="avatar-uploader-trigger">
                                    <PlusOutlined />
                                    <div>Upload</div>
                                </div>
                        }
                    </Upload>
                </ImgCrop>
            </Modal>
        </div>
    )
}