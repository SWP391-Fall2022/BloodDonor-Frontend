import { React, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Modal, notification, Tooltip, Radio } from "antd";
import "antd/dist/antd.min.css";
import './DetailCampaign.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import BarChartIcon from '@mui/icons-material/BarChart';
import CancelIcon from '@mui/icons-material/Cancel';
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

  //get camp id
  const location = useLocation();

  //nhận state từ navigation
  const campId = location.state.id;
  const campList = location.state.cam.body;
  const campStatus = location.state.status;

  // tìm ra campaign được chọn
  const selectedCampaign = campList.find(obj => {
    return obj.id === campId;
  });

  //  render blood types
  const slpitBlood = selectedCampaign !== undefined ? selectedCampaign.bloodTypes.split("-") : "";
  const listBloodType = slpitBlood.map((bloodType) =>
    <li className='blood-type-item'>{bloodType}</li>
  );

  useEffect(() => {
    getLike();
    getQuestion();
    getRegister();

  }, [likeNum]
  )

  // render day of week
  const getDayOfWeek = (day) => {
    var useday = new Date(day);
    switch (useday.getDay()) {
      case 0:
        return "Chủ Nhật";
      case 1:
        return "Thứ hai";
      case 2:
        return "Thứ ba";
      case 3:
        return "Thứ tư";
      case 4:
        return "Thứ năm";
      case 5:
        return "Thứ sáu";
      case 6:
        return "Thứ bảy";
      default:
        break;
    }
  }


  //Get days for choose day ----------------------
  var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(moment(dt).format("YYYY-MM-DD"));
    }
    return arr;
  };
  var daylist = selectedCampaign.onSiteDates !== undefined ? selectedCampaign.onSiteDates.filter((e) => moment(e) > moment()) : getDaysArray(new Date(selectedCampaign.startDate), new Date(selectedCampaign.endDate));

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
    if (response.status === 400) {
      notification.error({
        message: response.body,
        placement: "top"
      });
    }
    if (response.status === 200) {
      success();
    }

  }

  //function fetch Num of donor

  const getLike = async () => {
    let json = {
      method: 'GET',
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/totalLike/${selectedCampaign.id}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    if (response.success) {
      setLikeNum(response.body)
    }
  }


  //function fetch Num of question

  const getQuestion = async () => {
    let json = {
      method: 'GET',
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/get-by-campaign/${selectedCampaign.id}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })

    if (response.success) {
      setQuestionNum(response.body.length)
    }
  }


  //function fetch Num of register

  const getRegister = async () => {
    let json = {
      method: 'GET',

    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getNumberOfRegistration/${selectedCampaign.id}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })

    if (response.success) {
      setRegisterNum(response.body)
    }
  }





  // confirm modal
  const showConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa chiến dịch này không? Chiến dịch sẽ không thể được khôi phục lại!',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Hủy',
      className: 'create-campaign-confirm',

      onOk() {
        deleteCampaign();
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

   // close confirm modal
   const showCloseConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn đóng chiến dịch này không? Chiến dịch sẽ không thể được mở lại!',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đóng',
      cancelText: 'Hủy',
      className: 'close-campaign-confirm',

      onOk() {
        closeCampaign();
       
      }
    });
  };

  // function closeCampaign() 

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
    if (response.success) {
      // alert("Campaign has been deleted")
      closeSuccess();

    }
  }

  const closeSuccess = () => {
    Modal.success({
      content: 'Chiến dịch đã được đóng thành công.',
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
              <div>Ngày đăng: {moment(selectedCampaign.startDate).format("DD-MM-YYYY")} |  {selectedCampaign.organization.name}  </div>
            </div>

            <div className='org-campaign-detail-img'>
              <img src={selectedCampaign.images} alt={selectedCampaign.name} />
            </div>

            <div className='org-campaign-content'>
              <p className='sub-title'>{selectedCampaign.organization.name} xin thông báo:</p>
              {/* <p>{selectedCampaign.description}</p> */}
              <div dangerouslySetInnerHTML={{ __html: selectedCampaign.description }} />

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

              <p className='sub-title'>Chọn ngày</p>

              <div className='register-date-cover'  >
                <div className='register-date'>
                  <div name="registerDate">
                    <Radio.Group disabled={true}>

                      {
                        daylist.map((day) =>
                          <div>
                            <Radio>{getDayOfWeek(new Date(day))},{moment(day).format(" DD-MM-YYYY")}</Radio>
                          </div>
                        )

                      }
                    </Radio.Group>
                  </div>
                </div>
              </div>

              <p className='sub-title'>Chọn buổi</p>
              <div className='register-time'>
                <div name="period">
                  <Radio.Group disabled={true}>

                    <Radio value={"MORNING"}>Buổi sáng: 8h00 đến 11h00</Radio>
                    <Radio value={"AFTERNOON"}>Buổi chiều: 13h30 đến 17h00</Radio>

                  </Radio.Group>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div id="action-table">
          {/* <div className="action-table-item" >
            <Tooltip title="Số lượt quan tâm"> <FavoriteIcon className="action-table-icon"></FavoriteIcon></Tooltip>
            {likeNum}
                    </div> */}

          <div className="action-table-item" >

            <Link to={`/organization/manageQuestion/campaignQuestion/${selectedCampaign.id}`}  >
              <Tooltip title="Số câu hỏi"><HelpIcon className="action-table-icon" ></HelpIcon></Tooltip>

            </Link>
            {questionNum}
          </div>


          <div className="action-table-item" >
            <Tooltip title="Số lượt đăng ký"><ContentPasteIcon style={{ marginBottom: "6px" }} className="action-table-icon" ></ContentPasteIcon></Tooltip>
            {registerNum}
          </div>

          

          <Link to={`/organization/manageCampaign/updateCampaign/${selectedCampaign.id}`} state={{ campaign: { selectedCampaign }, campaignsList: location.state.cam }} style={{ color: "black", display: campStatus === "Đã xóa" || campStatus === "Kết thúc" ?"none":null }}>
            <div className="action-table-item"   >
              <Tooltip title="Chỉnh sửa"> <BorderColorIcon className="action-table-icon" ></BorderColorIcon></Tooltip>Sửa
            </div>
          </Link>

          <div className="action-table-item" onClick={showCloseConfirm} style={campStatus === "Đã xóa" || campStatus === "Kết thúc" ? { display: "none" } : null}  >
            <Tooltip title="Đóng chiến dịch"> <CancelIcon className="action-table-icon"></CancelIcon></Tooltip>
            Đóng
          </div>

          <Link to={`/organization/manageCampaign/detailCampaign/statistical/${selectedCampaign.id}`} style={{ color: "black" }}>
            <div className="action-table-item"  >
              <Tooltip title="Thống kê"> <BarChartIcon className="action-table-icon" ></BarChartIcon></Tooltip>
              Thống kê
            </div>
          </Link>

          <div className="action-table-item" onClick={showConfirm} style={campStatus === "Đã xóa" ? { display: "none" } : null}  >
            <Tooltip title="Xóa"><DeleteIcon className="action-table-icon" style={{ marginBottom: "6px" }} ></DeleteIcon></Tooltip>
            Xóa
          </div>

        </div>
      </div>

    </>

  )
}
export default DetailCampaign;