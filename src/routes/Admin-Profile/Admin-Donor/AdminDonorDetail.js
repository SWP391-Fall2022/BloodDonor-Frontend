import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { AdBread } from '../AdminBreadcrumbs'
import styles from '../admin.module.css'
import stylesDonor from './adminDonorList.module.css'
import { Avatar, Button, Table } from 'antd'
import packageInfo from "../../../shared/ProvinceDistrict.json";

export default function AdminDonorDetail({ setDetail, user }) {
    const breadName = <><Link onClick={() => setDetail(false)}><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Thông tin chi tiết</>
    const layer1 = <Link onClick={() => setDetail(false)}>Quản lý tình nguyện viên</Link>
    var randomColor = '#';
    for (var i = 0; i < 6; i++) {
        randomColor += Math.floor(Math.random() * 10);
    }

    let provinceName = ''
    let districtName = ''

    for (var j = 0; j < packageInfo.provinces.length; j++) {
        for (var k = 0; k < packageInfo.provinces[j].district.length; k++) {
            if (packageInfo.provinces[j].district[k].id === user.districtId) {
                provinceName = packageInfo.provinces[j].name
                districtName = packageInfo.provinces[j].district[k].name
            }
        }
    }

    //Table
    const columns = [
        {
            title: 'Chiến dịch',
            dataIndex: 'campaignName',
            key: 'campaignName',
        },
        {
            title: 'Thời gian hiến',
            dataIndex: 'date',
            key: 'date',
        },
    ];
    return (
        <>
            <div className={styles.breadcrumb}><AdBread layer1={layer1} layer2="Thông tin chi tiết" name={breadName} /></div>
            <div className={styles.mainContainer}>
                <div className={stylesDonor.donorDetailContainer}>
                    <div className={stylesDonor.donorInfoContainer}>
                        <div className={stylesDonor.listTitle} style={{ textAlign: 'center' }}><strong>THÔNG TIN TÌNH NGUYỆN VIÊN</strong></div>
                        <div style={{ margin: '1rem 1rem' }}><strong>Họ và tên: </strong>{user.name}</div>
                        <div style={{ margin: '1rem 1rem' }}><strong>CMND: </strong>{user.identityNum}</div>
                        <div style={{ margin: '1rem 1rem' }}><strong>Số điện thoại: </strong>{user.phone}</div>
                        <div style={{ margin: '1rem 1rem' }}><strong>Email: </strong>{user.email}</div>
                        <div style={{ margin: '1rem 1rem' }}><strong>Nơi thường trú: </strong>{districtName}, {provinceName}</div>
                        <Table
                            columns={columns}
                            pagination={{ pageSize: '5', hideOnSinglePage: true }}
                            className={stylesDonor.table}
                        />
                        <div style={{ textAlign: 'center' }}>
                            <Button id={styles.btn3} style={{ margin: '1rem 0' }}>Cấm tài khoản</Button>
                        </div>
                    </div>
                    <div className={stylesDonor.avaContainer}>
                        <Avatar className={stylesDonor.donorAva} size={200} src={user.avatar} style={{ backgroundColor: randomColor, fontSize: "60px" }} >{user.name.charAt(0)}</Avatar>
                        <div>{user.name}</div>
                    </div>
                </div>
            </div>
        </>
    )
}