import { React } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Breadcrumb, Modal } from "antd";
import "antd/dist/antd.css";
import './DetailCampaign.css';
import RegisterCampaign from '../../../Campaign/RegisterCampaign/RegisterCampaign'
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import { useState } from "react";


function DetailCampaign() {
  const [message,setMessage]=useState("")
  //get camp id
  const location = useLocation();
  console.log("location:", location)

  //nhận state từ navigation
  const campId = location.state.id;
  const campList = location.state.cam.body;

  // tìm ra campaign được chọn
  const selectedCampaign = campList.find(obj => {
    return obj.id === campId;
  });

  //  render blood types
  const slpitBlood = selectedCampaign.bloodTypes.split("-");
  const listBloodType = slpitBlood.map((bloodType) =>
    <li className='blood-type-item'>{bloodType}</li>
  );

  // fetch api xóa campaign
  
  const navigate = useNavigate();

  // function deleteCampaign() {
    const asyncFn = async () => {
      const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
      let json = {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': "Bearer " + token,
        })
      }
      const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/delete/${selectedCampaign.id}`, json)
        .then((res) => res.json())
        .catch((error) => { console.log(error) })

      if (response.success) {
        console.log("response", response)
        // alert("Campaign has been deleted")
        navigate("/organization/manageCampaign")
       
      }
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }

  // }



  
// confirm modal
const [open, setOpen] = useState(false);
const showConfirm = () => {
  Modal.confirm({
    title: 'Bạn có chắc muốn xóa chiến dịch này không?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Xóa',
    cancelText: 'Hủy',
    className: 'create-campaign-confirm',
  
onOk(){
  asyncFn();
  setOpen(false)
}
  });
};

  return (

    <>
      <div className="org-campaign-header">
        <Breadcrumb className="replied-breadcrumb">
          <Breadcrumb.Item>Quản lý chiến dịch</Breadcrumb.Item>
          <Breadcrumb.Item>Thông tin chiến dịch</Breadcrumb.Item>
        </Breadcrumb>
        <Link to="/organization/manageCampaign"><ArrowLeftOutlined style={{ marginRight: "10px" }} />Thông tin chiến dịch</Link>
      </div>
      <div id="org-campaign-body">

        <div id='org-campaign-detail-container'>

          <div className='org-campaignDetail'>
            <div className='org-campaignDetail-title'>

              <h2 className='org-campaign-title' > {selectedCampaign.name} </h2>
              <div>Ngày đăng: {selectedCampaign.startDate} |  {selectedCampaign.organizationName}  </div>
            </div>

            <div className='org-campaign-detail-img'>
              <img src={selectedCampaign.images} alt={selectedCampaign.organizationName} />
            </div>

            <div className='org-campaign-content'>
              <p className='sub-title'>{selectedCampaign.organizationName} xin thông báo:</p>
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
              <RegisterCampaign campaign={selectedCampaign} registered={true}></RegisterCampaign>
            </div>

          </div>
        </div>

        <div id="action-table">
          <div className="action-table-item" style={{ display: "flex", flexDirection: "column" }}>
            <FavoriteIcon className="action-table-icon" ></FavoriteIcon> 120
          </div>
          <div className="action-table-item" style={{ display: "flex", flexDirection: "column" }}>
            <HelpIcon className="action-table-icon" ></HelpIcon>100
          </div>
          <div className="action-table-item" style={{ display: "flex", flexDirection: "column" }}>
            <PeopleIcon className="action-table-icon" ></PeopleIcon>100
          </div>

          <div className="action-table-item" style={{ display: "flex", flexDirection: "column" }}>
            <BorderColorIcon className="action-table-icon" ></BorderColorIcon>130
          </div>

          <div className="action-table-item" style={{ display: "flex", flexDirection: "column" }} onClick={showConfirm}>
            <DeleteIcon className="action-table-icon" ></DeleteIcon>Xóa
          </div>
          <div className="action-table-item" style={{ display: "flex", flexDirection: "column" }}>
            <ContentPasteIcon className="action-table-icon" ></ContentPasteIcon>Sửa
          </div>

        </div>
      </div>

    </>

  )
}
export default DetailCampaign;