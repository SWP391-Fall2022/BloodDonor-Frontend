import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button, Modal, notification } from "antd";

import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { AdBread } from '../../AdminBreadcrumbs'
import styles from '../../admin.module.css';
import './ApproveOrganization.css';

export default function AdminApproveOrganization() {
    const navigate = useNavigate();

    //get org id
    const location = useLocation();

    //nhận state từ navigation
    const orgId = location.state.id;
    const orgList = location.state.organizations.body;

    // tìm ra org được chọn
    const selectedOrg = orgList.find(obj => {
        return obj.id === orgId;
    });

    // fetch API refuse org
    const refuseOrg = async () => {

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/admin/rejectOrgAccount/${orgId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.status === 400) {
            notification.error({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                placement: "top"
            });
            sessionStorage.clear()
            navigate("/");
        }
        if (response.status === 200) {
            console.log("Bạn đã từ chối tài khoản của tổ chức này!")
            navigate("/admin/manage_organization")
        }


    };

    // refuse confirm

    const showRefuseConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc muốn từ chối tổ chức này không?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Từ chối',
            cancelText: 'Hủy',
            className: 'refuse-org-confirm',
            onOk() {
                refuseOrg();
            }

        });
    };


    // refuse confirm success

    const refuseConfirmSuccess = () => {
        Modal.success({
            content: 'Bạn đã từ chối tài khoản của tổ chức này!',
            icon: <ExclamationCircleOutlined />,
            okText: 'Từ chối',
            cancelText: 'Hủy',
            className: 'refuse-org-confirm',
            onOk() {
                refuseOrg();
            }

        });
    };

    // fetch API refuse org
    const approveOrg = async () => {

        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

        let json = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token,
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/admin/verifyOrgAccount/${orgId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log("response", response)
        if (response.status === 400) {
            notification.error({
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
                placement: "top"
            });
            sessionStorage.clear()
            navigate("/");
        }
        if (response.status === 200) {
            console.log("Bạn đã duyệt thành công tài khoản của tổ chức này!")
            navigate("/admin/manage_organization")
        }


    };


    // approve confirm


    const showApproveConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc muốn duyệt tài khoản của tổ chức này không?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Duyệt',
            cancelText: 'Hủy',
            className: 'approve-org-confirm',
            onOk() {
                approveOrg();

            }

        });
    };
    return (
        <>
            <div className={styles.breadcrumb}><AdBread name={<Link style={{ color: "black" }} to="/admin/manage_organization"><ArrowLeftOutlined style={{ marginRight: "10px" }} />Duyệt tài khoản của tổ chức hiến máu</Link>} layer1="Quản lý tổ chức hiến máu" layer2="Duyệt tài khoản tổ chức hiến máu" /></div>

            <div className="mainContainer">
                <div className="approve-org-container">
                    <div className="approve-org">
                        <h2 className='approve-org-title' >THÔNG TIN TỔ CHỨC HIẾN MÁU</h2>
                        <h3 className='approve-org-name' >{selectedOrg.name}</h3>

                        <div className='informations'>
                            <p style={{ fontSize: "17px", fontWeight: "700" }}>Giới thiệu chung</p>
                            <p><strong>Địa chỉ: </strong>{selectedOrg.addressDetails}</p>
                            <p><strong>Điện thoại:</strong> {selectedOrg.phone}</p>

                            <p><strong>Email: </strong>{selectedOrg.email}</p>
                            <p><strong>Mã số thuế: </strong>{selectedOrg.taxCode}</p>


                        </div>

                        <div className="approve-org-buttons">
                            <Button
                                id="refuseOrgButton" type="primary" size="middle "
                                onClick={showRefuseConfirm}
                            >
                                Từ chối
                            </Button>

                            <Button
                                id="approveButton" type="primary" size="middle "
                                onClick={showApproveConfirm}
                            >
                                Duyệt
                            </Button>

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}