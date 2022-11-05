import { React, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Table, Tabs,Breadcrumb } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AdBread } from '../../AdminBreadcrumbs'
import styles from '../../admin.module.css';
import './InfoOrganization.css';

export default function InfoOrganization() {
    //get org id
    const location = useLocation();
    // console.log("location:", location)

    //nhận state từ navigation
    const orgId = location.state.id;
    const orgList = location.state.organizations.body;
    const orgStatus = location.state.status;

    // tìm ra org được chọn
    const selectedOrg = orgList.find(obj => {
        return obj.id === orgId;
    });

    return (
        <>
            <div className={styles.breadcrumb}><AdBread name={<Link style={{color:"black"}} to="/admin/manage_organization"><ArrowLeftOutlined style={{ marginRight: "10px" }} />Thông tin tổ chức hiến máu</Link>} layer1="Quản lý tổ chức hiến máu" layer2="Thông tin tổ chức hiến máu" /></div>
            <div id="org-infoOrganization-container">
                <div className='organization-infoOrganization-left'>
                  
                    <div className='organization-left-title'>


                        <h2 className='organization-title' >THÔNG TIN TỔ CHỨC HIẾN MÁU</h2>

                        <div className='organization-avatar'>
                            <img src={selectedOrg.avatar} alt={selectedOrg.name} />
                        </div>

                        <h3 className='organization-name' >{selectedOrg.name}</h3>
                    </div>

                    <div className='informations'>
                        <p style={{ fontSize: "17px", fontWeight: "700" }}>Giới thiệu chung</p>
                        <p><strong>Địa chỉ: </strong>{selectedOrg.addressDetails}</p>
                        <p><strong>Điện thoại:</strong> {selectedOrg.phone}</p>

                        <p><strong>Email: </strong>{selectedOrg.email}</p>


                        <div className="organization-intro">
                            <p style={{ fontSize: "17px", fontWeight: "700" }}>Thông tin chi tiết</p>
                            {selectedOrg.introduction}


                        </div>


                    </div>
                </div>

            </div>


        </>
    )
}