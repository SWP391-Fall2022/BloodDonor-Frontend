import { React, useState } from "react";
import { AdBread } from '../../AdminBreadcrumbs';
import styles from '../../admin.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, notification } from "antd";
import moment from "moment";
import RegisterCampaign from '../../../Campaign/RegisterCampaign/RegisterCampaign';
import './AdminDetailCampaign.css';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



export default function AdminDetailCampaign() {

  const navigate = useNavigate();

  // get JWT for fetchs
  const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

  //get camp id
  const location = useLocation();
  // console.log("location:", location)

  //nhận state từ navigation
  const campId = location.state.id;
  const campList = location.state.cam.body;
  const campStatus = location.state.status;


  // tìm ra campaign được chọn
  const selectedCampaign = campList.find(obj => {
    return obj.id === campId;
  });

  //  render blood types
  const slpitBlood = selectedCampaign.bloodTypes.split("-");
  const listBloodType = slpitBlood.map((bloodType) =>
    <li className='blood-type-item'>{bloodType}</li>
  );


  // delete confirm modal
  const [open, setOpen] = useState(false);
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa chiến dịch này không? Chiến dịch sẽ không thể được khôi phục lại!',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Hủy',
      className: 'delete-campaign-confirm',

      onOk() {
        deleteCampaign();
        setOpen(false)
      }
    });
  };

  // function deleteCampaign() 

  const deleteCampaign = async () => {
    let json = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer " + token,
      })
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/delete/${campId}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log("closeCampaign", response)
    if (response.status === 400) {
      notification.error({
        message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
        placement: "top"
      });
      sessionStorage.clear()
      navigate("/");
    }
    if (response.status === 200) {
      // alert("Campaign has been deleted")
      deleteSuccess();

    }
  }

  const deleteSuccess = () => {
    Modal.success({
      content: 'Chiến dịch đã được xóa thành công.',
      onOk() {
        navigate("/admin/manage_campaign")

      }

    });
  };

  // close confirm modal
  const showCloseConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn đóng chiến dịch này không? Chiến dịch sẽ không thể được mở lại!',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đóng',
      cancelText: 'Hủy',
      className: 'close-campaign-confirm',

      onOk() {
        deleteCampaign();
        setOpen(false)
      }
    });
  };

  // function deleteCampaign() 

  const closeCampaign = async () => {
    let json = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer " + token,
      })
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/close/${campId}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log("closeCampaign", response)
    if (response.success) {
      // alert("Campaign has been deleted")
      closeSuccess();

    }
  }

  const closeSuccess = () => {
    Modal.success({
      content: 'Chiến dịch đã được đóng thành công.',
      onOk() {
        navigate("/admin/manage_campaign")

      }

    });
  };

  return (
    <>
      <div className={styles.breadcrumb}><AdBread layer1={"Quản lý chiến dịch"} layer2={"Chiến dịch chi tiết"} name={<Link style={{ color: "black" }} to="/admin/manage_campaign"><ArrowLeftOutlined style={{ marginRight: "10px" }} />Thông tin chiến dịch</Link>} /></div>
      <div id="admin-campaign-body">

        <div id='admin-campaign-detail-container'>

          <div className='admin-campaignDetail'>
            <div className='admin-campaignDetail-title'>

              <h2 className='admin-campaign-title' > {selectedCampaign.name} </h2>
              <div>Ngày đăng: {moment(selectedCampaign.startDate).format("DD-MM-YYYY")} |  {selectedCampaign.organizationName}  </div>
            </div>

            <div className='admin-campaign-detail-img'>
              <img src={selectedCampaign.images} alt={selectedCampaign.organizationName} />
            </div>

            <div className='admin-campaign-content'>
              <p className='sub-title' style={{ textTransform: "uppercase" }}>{selectedCampaign.organizationName} xin thông báo:</p>
              <p>{selectedCampaign.description}</p>

              <p className='sub-title'>Thời gian:</p>
              <p>Buổi sáng bắt đầu lúc 08h00 đến 11h00 <br></br>
                Buổi chiều bắt đầu lúc 13h30 đến 17h00
              </p>


              <p className='sub-title'>Địa chỉ</p>
              <p>{selectedCampaign.addressDetails}</p>

              <p className='sub-title'>Nhóm máu cần</p>
              <div className='blood-type'>
                <ul >{listBloodType}</ul>
              </div>

              <p className='sub-title'>Xin lưu ý</p>
              <p>Khi đi hiến máu nhớ mang theo CMND hoặc CCCD (hoặc có hình ảnh kèm theo).</p>
              <p>Xin trân trọng thông báo!!!</p>
              <RegisterCampaign campaign={selectedCampaign} registered={true} org={true}></RegisterCampaign>
            </div>

          </div>
        </div>

        <div id="admin-campaign-action-table" style={campStatus === "Đã xóa" || campStatus === "Kết thúc" ? { display: "none" } : null}>



          <div className="admin-campaign-action-table-item" onClick={showDeleteConfirm}     >
            <DeleteIcon className="admin-campaign-action-table-icon" ></DeleteIcon>
            <p>Xóa</p>
          </div>


          <div className="admin-campaign-action-table-item" onClick={closeCampaign} >
            <HighlightOffIcon className="admin-campaign-action-table-icon"  ></HighlightOffIcon>
            <p>Đóng</p>
          </div>


        </div>
      </div>
    </>
  )
}