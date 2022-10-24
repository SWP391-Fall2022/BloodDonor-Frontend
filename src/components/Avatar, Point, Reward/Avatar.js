import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import styles from './leftside.module.css'
export default function AvatarContainer() {
    const avatar = JSON.parse(sessionStorage.getItem('avatar'))
    const name = JSON.parse(sessionStorage.getItem('name'))
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div className={styles.leftContainer}>
            <div>
                <Button onClick={showModal} shape='circle' size='large' className={styles.editIcon} type="link" icon={<EditOutlined />} />
                <Avatar className={styles.ava} size={160} icon={<UserOutlined />} />
            </div>
            <div className={styles.leftSideText}>{name}</div>
            <Modal open={open} onCancel={handleCancel} footer={false}>
                <h1 style={{ textAlign: 'center' }}><strong>ĐỔI ẢNH ĐẠI DIỆN</strong></h1>
                <ImgCrop grid rotate shape="round">
                    <Upload
                        className={styles.uploader}
                        accept='.jpg,.png'
                        listType="picture-card"
                    // onChange={onChange}
                    // onPreview={onPreview}
                    >
                        + Upload
                    </Upload>
                </ImgCrop>
            </Modal>
        </div>
    )
}