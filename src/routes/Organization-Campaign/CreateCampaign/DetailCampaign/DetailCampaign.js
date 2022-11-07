import { React, useEffect, useState } from "react";
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
import moment from "moment";


function DetailCampaign() {

  // get JWT for fetchs
  const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

  // set like number
  const [likeNum, setLikeNum] = useState(0)
  // set question Num
  const [questionNum, setQuestionNum] = useState(0)
  // set register Num
  const [registerNum, setRegisterNum] = useState(0)


  const [message, setMessage] = useState("")
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

  // fetch api xóa campaign

  const navigate = useNavigate();

  // function deleteCampaign() 

  const deleteCampaign = async () => {
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
      // alert("Campaign has been deleted")
      success();

    }
  }

  //function fetch Num of donor

  const getLike = async () => {
    let json = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer " + token,
      })
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/totalLike/${selectedCampaign.id}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })

    if (response.success) {
      setLikeNum(response.body)

    }
  }
  useEffect(() => {
    getLike();
  }, []
  )

  //function fetch Num of question

  const getQuestion = async () => {
    let json = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer " + token,
      })
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/get-by-campaign/${selectedCampaign.id}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })

    if (response.success) {
      setQuestionNum(response.body.length)
    }
  }
  useEffect(() => {
    getQuestion();
  }, []
  )

  //function fetch Num of register

  // const getRegister = async () => {
  //   let json = {
  //     method: 'GET',
  //     headers: new Headers({
  //       'Content-Type': 'application/json; charset=UTF-8',
  //       'Authorization': "Bearer " + token,
  //     })
  //   }
  //   const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getNumberOfRegistration/${selectedCampaign.id}`, json)
  //     .then((res) => res.json())
  //     .catch((error) => { console.log(error) })

  //   if (response.success) {
  //     console.log("register response:", response)
  //     setRegisterNum(response.body)
  //   }
  // }
  // useEffect(() => {
  //   getRegister();
  // }, []
  // )


  // confirm modal
  const [open, setOpen] = useState(false);
  const showConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa chiến dịch này không? Chiến dịch sẽ không thể được khôi phục lại!',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Hủy',
      className: 'create-campaign-confirm',

      onOk() {
        deleteCampaign();
        setOpen(false)
      }
    });
  };

  const success = () => {
    Modal.success({
      content: 'Chiến dịch đã được xóa thành công.',
      onOk() {
        navigate("/organization/manageCampaign")

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
              <div>Ngày đăng: {moment(selectedCampaign.startDate).format("DD-MM-YYYY")} |  {selectedCampaign.organizationName}  </div>
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
          <div className="action-table-item" >
            <FavoriteIcon className="action-table-icon" ></FavoriteIcon> {likeNum}
          </div>
          <div className="action-table-item" >
            <HelpIcon className="action-table-icon" ></HelpIcon>{questionNum}
          </div>
          <div className="action-table-item" >
            <PeopleIcon className="action-table-icon" ></PeopleIcon>100
          </div>

          <div className="action-table-item" >
            <ContentPasteIcon className="action-table-icon" ></ContentPasteIcon>{registerNum}
          </div>

          <div className="action-table-item"  onClick={showConfirm}   style={campStatus==="Đã xóa"?{display:"none"}:null}  >
            <DeleteIcon className="action-table-icon" ></DeleteIcon>Xóa
          </div>

          <div className="action-table-item"  style={campStatus==="Đã xóa"?{display:"none"}:null}  >
            <BorderColorIcon className="action-table-icon" ></BorderColorIcon>Sửa
          </div>
        </div>
      </div>

    </>

  )
}
export default DetailCampaign;