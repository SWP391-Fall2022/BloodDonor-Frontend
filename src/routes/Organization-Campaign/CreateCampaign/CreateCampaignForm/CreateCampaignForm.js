import { React, useState } from "react";
import "antd/dist/antd.css";
// import "./CreateCampaign.css";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Breadcrumb, Checkbox, Button, Modal } from "antd";
import RegisterPD from '../../../../components/Register/RegisterProvinceDistrict';
import moment from 'moment';
import Editor from "../Editor/Editor";
import './CreateCampaignForm.css';
import PostImage from '../PostImage/PostImage';


const { RangePicker } = DatePicker;
const { TextArea } = Input;

function CreateCampaignForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('')


  const [campaigName, setCampaigName] = useState("");
  const [dates, setDates] = useState([])
  const [campaignImg, setCampaignImg] = useState("");
  const [address, setAddress] = useState("");



  // setup for dates

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
  };


  // setup for blood types
  const [bloodTypes, setBloodTypes] = useState("A");

  const typesOfBlood = [
    {
      label: 'Nhóm máu A',
      value: 'A',
    },
    {
      label: 'Nhóm máu B',
      value: 'B',
    },
    {
      label: 'Nhóm máu AB',
      value: 'AB',
    },
    {
      label: 'Nhóm máu 0',
      value: '0',
    },
  ];

  const onBloodTypesChange = (checkedValues) => {
    const checked = [];
    checkedValues.map((value) => {
      checked.push(value);
    },

      setBloodTypes(checked)

    )

  };

  // confirm modal
  const showConfirm = () => {
    Modal.confirm({
      title: 'Bạn có muốn kiểm tra lại thông tin trước khi đăng chiến dịch không?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đăng',
      cancelText: 'Xem Lại',
      className: 'create-campaign-confirm',

    });
  };

  const [form] = Form.useForm();


  const onFinish = async (values) => {

    const formData = form.getFieldsValue(true);

    const requestData = {
      "name": formData.name,
      "images": campaignImg,
      "description": formData.description,
      "startDate": formData.campDate[0],
      "endDate": formData.campDate[1],
      "emergency": false,
      "bloodTypes": bloodTypes.toString().replace(/,/g, '-'),
      "districtId": JSON.parse(sessionStorage.getItem('districtId')),
      "addressDetails": formData.addressDetails,
      "sendMail": true
    }
    const token = JSON.parse(sessionStorage.getItem('JWT_Key'))


    let json = {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer " + token,
      })
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/create`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log("response", response)
    if (response.success) {

      navigate("/organization/manageCampaign")
      setMessage("Tạo chiến dịch thành công")
    }
    setTimeout(() => {
      setMessage('');
    }, 3000);


  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function callbackImageFunction(campaignImg) {
    setCampaignImg(campaignImg);
    console.log("setCampaignImg: ", campaignImg)
  }


  return (
    <>


      {/* {!preview ? ( */}
      <div id="create-campaign-container">

        <div className="create-campaign-header">
          <Breadcrumb className="manage-campaign-breadcrumb">
            <Breadcrumb.Item>Quản lý chiến dịch</Breadcrumb.Item>
            <Breadcrumb.Item>Tạo chiến dịch</Breadcrumb.Item>
          </Breadcrumb>
          <Link to="/organization/manageCampaign"><ArrowLeftOutlined style={{ marginRight: "10px" }} />Tạo chiến dịch</Link>
        </div>

        <div className="create-campaign-form">
          <p style={{ fontSize: "25px", fontWeight: "700", textAlign: "center" }}>TẠO CHIẾN DỊCH</p>
          <Form
            initialValues={{

              'bloods': ["A"],
              'description': "",
              'name': "",
              'province': "1",
              // 'campDate': [""],
              'addressDetails': "",
              'images': []
            }}

            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            id="create-campaign-form"
            name="basic"
            scrollToFirstError
          >
            <Form.Item className="create-campaign-form-item" label="Tựa đề chiến dịch" name="name" rules={[{ required: true, message: 'Vui lòng nhập Tựa đề chiến dịch' }]}>
              <Input placeholder="Nhập tựa đề chiến dịch"
                onChange={(e) => {
                  setCampaigName(e.target.value)
                }}
                name="name"

              />
            </Form.Item>

            {/* regiter province district  */}
           <RegisterPD></RegisterPD>


            <Form.Item className="create-campaign-form-item" label="Địa chỉ chi tiết" name="addressDetails" rules={[{ required: true, message: 'Vui lòng nhập chi tiết địa điểm diễn ra chiến dịch' }]}>
              <TextArea rows={2} allowClear showCount maxLength={100}
                onChange={(e) => {
                  setAddress(e.target.value)
                }} />
            </Form.Item>


            <Form.Item className="create-campaign-form-item" label="Thời gian diễn ra chiến dịch" name="campDate" >
              <RangePicker
               format={'YYYY-MM-DD'}
                disabledDate={disabledDate}
                onChange={(values) => {
                setDates(values)
              }}
              >
              </RangePicker>
            </Form.Item>

          
            <Form.Item className="create-campaign-form-item" label="Yêu cầu về nhóm máu" name="bloods" >
              <Checkbox.Group options={typesOfBlood} onChange={onBloodTypesChange} />
            </Form.Item>

            <Editor></Editor>

            <PostImage campaignImg={campaignImg} callback={callbackImageFunction}></PostImage>

            <Form.Item className="create-campaign-form-buttons">
              {/* <Button
                id="previewButton"
                type="primary"
                htmlType="button"
                size="large"
              // disabled={btndisabled}
              // onClick={(e) => {
              //   setPreview(true)
              // }}
              >
                Xem trước
              </Button> */}
              <Button
                disabled={(campaigName == "" || dates.length != 2 || address == "") ? true : false}
                id="finishButton" type="primary" htmlType="submit" size="large"
              // onClick={showConfirm}
              >
                Hoàn thành
              </Button>
              <Button id="cancelButton" type="primary" htmlType="button" size="large" onClick={() => {
                form.resetFields();
              }}>
                Hủy
              </Button>

            </Form.Item>


          </Form>
        </div>

      </div>


    </>
  )
};

export default CreateCampaignForm;