import { React, useState } from "react";
import "antd/dist/antd.min.css";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Breadcrumb, Checkbox, Button, Modal, Switch, Radio } from "antd";
import RegisterPD from '../../../../components/Register/RegisterProvinceDistrict';
import moment from 'moment';
import Editor from "../Editor/Editor";
import './CreateCampaignForm.css';
import PostImage from '../PostImage/PostImage';
import DatePickerReact, { DateObject } from "react-multi-date-picker";
import locale from "antd/lib/date-picker/locale/en_US";


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
      "sendMail": formData.sendMail,
      "onSiteDates": onSiteDates[0]=="2022-11-20"? null:String(onSiteDates).split(",")
      // String(onSiteDates).split(",")
      // ["2022-11-20"]
      ,
      "weekRepetition": weekRepetition,
      "monthRepetition": monthRepetition,
      "daysOfWeek": formData.daysOfWeek,
      "daysOfMonth": dayinmonth,
      "weekNumber": formData.weekNumber

    }
    console.log("reques:", requestData)
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
      .catch((error) => { console.log(error)})
    console.log("response", response)
    if (response.success) {

      navigate("/organization/manageCampaign")
      setMessage("Tạo chiến dịch thành công")
    }
else{
  if(response.body == "Campaign can not have duplicate name.")
   setMessage("Bạn không được đặt trùng tên với chiến dịch hiện có.") 
}
    setTimeout(() => {
      setMessage('');
    }, 3000);


  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //setup for update image
  function callbackImageFunction(campaignImg) {
    setCampaignImg(campaignImg);
  }


  // setup for send email
  const sendEmail = (checked) => {
    console.log(`switch to ${checked}`);
  };

  // setup for repetition by  
  const [isRepetition, setIsRepetition] = useState();
  const [weekNumber, setWeekNumber] = useState(0);



  // setup for repetition by week 
  const [weekRepetition, setWeekRepetition] = useState(false);
  console.log("week:", weekRepetition)
  const weeksData = [
    {
      label: 'Thứ 2',
      value: 'MONDAY',
    },
    {
      label: 'Thứ 3',
      value: 'TUESDAY',
    },
    {
      label: 'Thứ 4',
      value: 'WEDNESDAY',
    },
    {
      label: 'Thứ 5',
      value: 'THURSDAY',
    },
    {
      label: 'Thứ 6',
      value: 'FRIDAY',
    },
    {
      label: 'Thứ 7',
      value: 'SATURDAY',
    },
    {
      label: 'Chủ Nhật',
      value: 'SUNDAY',
    },
  ];

  const weekRepetionChange = (checkedValue) => {

    console.log("week onchange:", weekRepetition)
    setWeekRepetition(true);
    console.log(checkedValue)
    if (checkedValue.length === 0) setWeekRepetition(false)

  };

  //setup onSiteDates
  const [onSiteDates, setOnSiteDates] = useState(["2022-11-20"])
  console.log(String(onSiteDates).split(","))
  console.log("tye:",typeof(String(onSiteDates)))
  const [requestOnsiteDate,setRequestOnsiteDate] = useState([""])
  


  // setup for repetition by month 
  const [monthRepetition, setMonthRepetition] = useState(false);
  console.log("month:", monthRepetition)

  const format = "DD"
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  // const [dayinmonth, setDayinmonth]= useState([]);
  const dayinmonth = []
  // console.log("daysOfMonth format:", (new DateObject(daysOfMonth[0])).day)
  
  console.log("daysOfMonth", daysOfMonth)
  // console.log("dayinmonth", dayinmonth)
  // function onDaysOfMonthChange(value){

  // }

  console.log("dayinmonth",dayinmonth)




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


            <Form.Item className="create-campaign-form-item" label="Thời gian mở đăng ký trên Medichor" name="campDate" >

              <RangePicker
                format={'YYYY-MM-DD'}
                disabledDate={disabledDate}
                onChange={(values) => {
                  setDates(values)
                }}
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              >
              </RangePicker>
            </Form.Item>

            <Form.Item label="Tính năng nâng cao: bạn muốn lặp lại chiến dịch theo" name="isRepetition">
              <Radio.Group onChange={(e) => { setIsRepetition(e.target.value) }} >
                <Radio value={1}>Ngày cụ thể</Radio>
                <Radio value={2}>Tuần</Radio>
                <Radio value={3}>Ngày bất kỳ trong tháng</Radio>
                <Radio value={4}>Ngày của tuần trong tháng</Radio>

              </Radio.Group>
            </Form.Item>

            <Form.Item className="create-campaign-form-item-days" initialValue={" "} label="Chọn những ngày cụ thể bạn muốn mở đăng ký:"  required={isRepetition == 1}>

              <DatePickerReact
                disabled={isRepetition != 1}
                onChange={(values)=>{
                  setOnSiteDates("")
              setOnSiteDates(values)
            }}

                multiple
                format="YYYY-MM-DD"
                minDate={moment(dates[0]).toDate()}
                maxDate={moment(dates[1]).toDate()}
                placeholder={"Chọn những ngày mở đăng ký"}
              />
            </Form.Item>

            <Form.Item className="create-campaign-form-item" initialValue={[]} label="Cài đặt nâng cao, chọn thứ trong tuần để lặp:" name="daysOfWeek" required={isRepetition == 4 || isRepetition == 2}>
              <Checkbox.Group options={weeksData} onChange={weekRepetionChange} disabled={isRepetition != 2 && isRepetition != 4} />

            </Form.Item>


            <Form.Item className="create-campaign-form-item-days-in-month" initialValue={new DateObject().set({ year: 2023, month: 1, day: 1, format })} label="Chọn những ngày cụ thể trong tháng bạn muốn mở đăng ký:" name="daysOfMonth" required={isRepetition == 3}>

              <DatePickerReact
                value={daysOfMonth}
                onChange={dateObject => {
                  // dateObject.map(
                  //   (object)=> (setDaysOfMonth(object.day))
                  // )
                  setDaysOfMonth(dateObject)
                  dateObject.map(
                    (e)=>(
                      dayinmonth.push(e.day.toString())
                    )
                  )
                  setDaysOfMonth(dayinmonth)
                  console.log("setDaysOfMonth format:", daysOfMonth)
                 
                  console.log("daysOfMonth format:", dayinmonth)
                  console.log("daysOfMonth format type:", typeof(dayinmonth[0].toString()))

                  setMonthRepetition(true)
                  if (dateObject.length === 0)
                    setMonthRepetition(false)
                  console.log("daysOfMonth onchange:", daysOfMonth)

                }}
                multiple
                format={"DD"}
                buttons={false}
                placeholder={"Chọn những ngày mở đăng ký"}
                disabled={isRepetition != 3}
              />
            </Form.Item>

            <Form.Item initialValue={0} label="Chọn tuần thứ mấy trong tháng bạn muốn lặp lại:" name="weekNumber" required={isRepetition == 4}>
              <Radio.Group onChange={(e) => { setWeekNumber(e.target.value) }} disabled={isRepetition != 4} >
                <Radio value={1}>Tuần 1</Radio>
                <Radio value={2}>Tuần 2</Radio>
                <Radio value={3}>Tuần 3</Radio>
                <Radio value={4}>Tuần 4</Radio>

              </Radio.Group>
            </Form.Item>



            <Form.Item className="create-campaign-form-item" label="Yêu cầu về nhóm máu" name="bloods" >
              <Checkbox.Group options={typesOfBlood} onChange={onBloodTypesChange} />
            </Form.Item>

            <Editor></Editor>

            <PostImage campaignImg={campaignImg} callback={callbackImageFunction}></PostImage>

            <Form.Item label="Tính năng nâng cao - Mặc định thông báo chiến dịch sẽ không gửi cho mọi người:" name="sendMail">
              <Switch onChange={sendEmail} style={{ marginRight: "10px" }} /> Gửi mail cho tình nguyện hiến máu có địa chỉ thường trú trong khu vực.
            </Form.Item>

            <div className="Mess" style={{textAlign:"center" ,color:"red", marginBottom:"20px"}}>{message}</div>

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