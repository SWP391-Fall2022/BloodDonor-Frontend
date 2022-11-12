import { React, useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate,  useParams, useLocation } from "react-router-dom";
import { Form, Input, DatePicker, Breadcrumb, Checkbox, Button, Modal, Switch, Radio, Select } from "antd";
import moment from 'moment';
import Editor from "../CreateCampaign/Editor/Editor";
import './UpdateCampaignForm.css';
import PostImage from '../CreateCampaign/PostImage/PostImage';
import DatePickerReact, { DateObject } from "react-multi-date-picker";
import packageInfo from "../../../shared/ProvinceDistrict.json";




const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;



export default function UpdateCampaignForm() {

  
  const campaignId = useParams();

  const location = useLocation();
  // console.log("location:", location)

  //nhận state từ navigation
  const campList = location.state.campaignsList;
  

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [changedCampaign, setChangedCampaign] = useState(
    {
      
      
        id: 1,
        name: "",
        images: "",
        description: "This is the description of the campaign 2",
        startDate: "2022-06-20",
        endDate: "2022-07-20",
        emergency: false,
        bloodTypes: "O",
        districtId: 1,
        addressDetails: "This is the address details",
        organizationName: "Benh vien Ngo Viet Tien Main",
        onSiteDates: [
      "2022-10-30",
      "2022-11-10"
    ],
  }
    
    )
    


  let campaignDefaultDistrict;
  let campaignDefaultDistrictList;
  let campaignDefaultProvince;

  const provinceList = packageInfo.provinces
  const [districtId, setDistrictId] = useState(provinceList[0].district[0].id);


  //Find province based on user's districtID
  for (let i = 0; i < provinceList.length; i++) {
      for (let j = 0; j < provinceList[i].district.length; j++) {
          if (provinceList[i].district[j].id === changedCampaign.districtId) {
            campaignDefaultDistrict = provinceList[i].district[j].name;
            campaignDefaultDistrictList = provinceList[i].district;
            campaignDefaultProvince = provinceList[i].name
          }
      }
  }

  const [districtList, setDistrictList] = useState(campaignDefaultDistrictList)



  // fetch data function
  function readOneFunction() {
    const asyncFn = async () => {

      let json = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      }
      const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/readOne/${campaignId.id}`, json)
        .then((res) => res.json())
        .catch((error) => { console.log("readOneFunction error", error) })
        console.log("readOneFunction response ", response.body)

      if (response.success) {
        console.log("readOneFunction response succ", response.body)
        setChangedCampaign(response.body)
       

      }

    }
    asyncFn();
  }


  //call etch API function
  useEffect(() => {
    readOneFunction();
  }, []
  )


  const [dates, setDates] = useState([changedCampaign.startDate, changedCampaign.endDate])
  const [campaignImg, setCampaignImg] = useState("");

  // set up for province district register
  const [form] = Form.useForm();
  
//Chang initial value of form
  useEffect(() => {

    for (let i = 0; i < provinceList.length; i++) {
      for (let j = 0; j < provinceList[i].district.length; j++) {
          if (provinceList[i].district[j].id === changedCampaign.districtId) {
            campaignDefaultDistrict = provinceList[i].district[j].name;
            campaignDefaultDistrictList = provinceList[i].district;
            campaignDefaultProvince = provinceList[i].name

          }
      }
  }

  form.setFieldsValue(changedCampaign)
  form.setFieldValue("province", campaignDefaultProvince)
  form.setFieldValue("district", campaignDefaultDistrict)
  form.setFieldValue("campDate", [moment(changedCampaign.startDate), moment(changedCampaign.endDate)])
  form.setFieldValue("bloods", changedCampaign.bloodTypes)
  setDates( [moment(changedCampaign.startDate), moment(changedCampaign.endDate)])
  

   }, [form, changedCampaign])


  const onProvinceChange = (value) => {
    setDistrictList(provinceList[value - 1].district)
    form.setFieldsValue({ district: provinceList[value - 1].district[0].name })
    setDistrictId(provinceList[value - 1].district[0].id)
  };

  const onDistrictChange = (value) => {
    setDistrictId(value)
  }

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
      return checked.push(value);
    },

      setBloodTypes(checked)

    )

  };

  // confirm modal

  const showConfirm = () => {
    Modal.confirm({
      title: 'Bạn có muốn kiểm tra lại thông tin trước khi chỉnh sửa chiến dịch không?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Chỉnh sửa',
      cancelText: 'Xem Lại',
      className: 'create-campaign-confirm',
      onOk() {
        onFinish();
      }

    });
  };

  const success = () => {
    Modal.success({
      content: 'Chiến dịch đã được chỉnh sửa thành công.',
      onOk() {
        navigate("/organization/manageCampaign")

      }

    });
  };

  const onFinish = async (values) => {

    const formData = form.getFieldsValue(true);
    console.log("formData dayofweek:", formData.daysOfWeek)

    const requestData = {
      "name": formData.name,
      "images": campaignImg,
      "description": formData.description,
      "startDate": moment(formData.campDate[0]).add(1,'day'),
      "endDate": moment(formData.campDate[1]).add(1,'day'),
      "emergency": false,
      "bloodTypes": bloodTypes.toString().replace(/,/g, '-'),
      "districtId": districtId,
      "addressDetails": formData.addressDetails,
      "sendMail": formData.sendMail,
      "onSiteDates": onSiteDates[0] === "1970-01-01" || weekRepetition === true || monthRepetition === true  ? null : String(onSiteDates).split(","),
      // "onSiteDates": onSiteDates[0] === "1970-01-01" || formData.daysOfWeek.length !==0  || daysOfMonth.length !==0 || formData.weekNumber !==0 ? null : String(onSiteDates).split(","),
      "weekRepetition": weekRepetition,
      "monthRepetition": monthRepetition,
      "daysOfWeek": formData.daysOfWeek,
      "daysOfMonth": daysOfMonth,
      "weekNumber": formData.weekNumber
      // formData.weekNumber !==0 || daysOfMonth!==[] || || formData.daysOfWeek !==[]
    }
    console.log("EDIT request:", requestData)
    const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
    let json = {
      method: 'PUT',
      body: JSON.stringify(requestData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer " + token,
      })
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/update/${campaignId.id}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log("EDIT response", response)
    if (response.success) {
      success();
      setMessage("Chỉnh sửa chiến dịch thành công")
    }
    else {
        setMessage(response.body)
    }
    setTimeout(() => {
      setMessage('');
    }, 3000);


  };

  //setup for update image
  function callbackImageFunction(campaignImg) {
    setCampaignImg(campaignImg);
  }




  // setup for repetition by  
  const [isRepetition, setIsRepetition] = useState();
  function onIsRepetitionChange(e) {
    setIsRepetition(e.target.value)
    if(e.target.value === 1){
      setWeekRepetition(false)
      setMonthRepetition(false)
    }
   else if (e.target.value === 2){
      setWeekRepetition(true)
      console.log("setWeekRepetition", weekRepetition)
      setMonthRepetition(false)

    }
    else if (e.target.value === 3 || e.target.value === 4){
      setMonthRepetition(true)
      setWeekRepetition(false)
    }
     

  }


  // setup for repetition by week 
  const [weekRepetition, setWeekRepetition] = useState(false);
  console.log("setWeekRepetition afterset", weekRepetition)


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


  //setup onSiteDates
  const [onSiteDates, setOnSiteDates] = useState(["1970-01-01"])

  // setup for repetition by month 
  const [monthRepetition, setMonthRepetition] = useState(false);

  const format = "DD"
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const dayinmonth = []


  return (
    <>

      <div className="create-campaign-header">
        <Breadcrumb className="manage-campaign-breadcrumb">
          <Breadcrumb.Item>Quản lý chiến dịch</Breadcrumb.Item>
          <Breadcrumb.Item>Thông tin chiến dịch</Breadcrumb.Item>
          <Breadcrumb.Item>Chỉnh sửa chiến dịch</Breadcrumb.Item>
        </Breadcrumb>
        <Link to="/organization/manageCampaign/detailCampaign" state={{cam: campList, id: campaignId.id, status:null }}><ArrowLeftOutlined style={{ marginRight: "10px" }} />Chỉnh sửa chiến dịch</Link>
      </div>

      <div id="create-campaign-container">


        <div className="create-campaign-form">
          <p style={{ fontSize: "25px", fontWeight: "700", textAlign: "center" }}>CHỈNH SỬA CHIẾN DỊCH</p>
          <Form
            initialValues={{

              'bloods': changedCampaign.bloodTypes,
              'description': changedCampaign.description,
              'name': changedCampaign.name,
              'addressDetails': changedCampaign.addressDetails,
              'images': changedCampaign.images,
              'sendEmail': changedCampaign.sendEmail,
              
            }}

            form={form}

            id="create-campaign-form"
            name="basic"
            scrollToFirstError
          >
            <Form.Item className="create-campaign-form-item" label="Tựa đề chiến dịch" name="name" rules={[{ required: true, message: 'Vui lòng nhập Tựa đề chiến dịch' }]}>
              <Input placeholder="Nhập tựa đề chiến dịch"
               
                name="name"
                maxLength={120}
              />
            </Form.Item>

            {/* regiter province district  */}
            <Form.Item >
              <Form.Item
               label="Tỉnh" 
               name="province"
                 rules={[{ required: true, message: 'Vui lòng chọn' }]} 
                 style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                <Select
                  showSearch placeholder="Chọn"
                  onChange={onProvinceChange}
                  filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                  {provinceList.map(a => (<Option key={a.id} >{a.name}</Option>))}
                </Select>
              </Form.Item>
              <Form.Item label="Quận/Huyện" name="district" rules={[{ required: true, message: 'Vui lòng chọn' },]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                <Select
                  showSearch placeholder="Chọn"
                  onChange={onDistrictChange}
                  filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                  {districtList.map(a => (<Option key={a.id} value={a.id}>{a.name}</Option>))}
                </Select>
              </Form.Item>
            </Form.Item>


            <Form.Item className="create-campaign-form-item" label="Địa chỉ chi tiết" name="addressDetails" rules={[{ required: true, message: 'Vui lòng nhập chi tiết địa điểm diễn ra chiến dịch' }]}>
              <TextArea 
              rows={2} 
              allowClear 
              showCount 
              maxLength={100}
                />
            </Form.Item>


            <Form.Item 
            className="create-campaign-form-item"
             label="Thời gian mở đăng ký trên Medichor"
              name="campDate"
               rules={[{ required: true, message: 'Vui lòng nhập thời gian bạn muốn diễn ra chiến dịch' }]}>

              <RangePicker
                format={'YYYY-MM-DD'}
                disabledDate={disabledDate}
                onChange={(values) => {
                  setDates(values)
                }}
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                defaultValue={[moment(changedCampaign.startDate), moment(changedCampaign.endDate)]}
              >
              </RangePicker>
            </Form.Item>

            <Form.Item label="Tính năng nâng cao: bạn muốn lặp lại chiến dịch theo" name="isRepetition">
              <Radio.Group onChange={(e) => onIsRepetitionChange(e)} >
                <Radio value={1}>Ngày cụ thể</Radio>
                <Radio value={2}>Tuần</Radio>
                <Radio value={3}>Ngày bất kỳ trong tháng</Radio>
                <Radio value={4}>Ngày của tuần trong tháng</Radio>

              </Radio.Group>
            </Form.Item>

            <Form.Item className="create-campaign-form-item-days" initialValue={[dates[0],dates[1]]} label="Chọn những ngày cụ thể bạn muốn mở đăng ký:" required={isRepetition === 1}>

              <DatePickerReact
                disabled={isRepetition !== 1}
                onChange={(values) => {
                  setOnSiteDates(values)
                }}
                id="onSiteDates"
                multiple
                format="YYYY-MM-DD"
                // value={[moment(dates[0]).toDate(), moment(dates[1]).toDate()]}
                
                minDate={moment(dates[0]).toDate()}
                maxDate={moment(dates[1]).toDate()}
                placeholder={"Chọn những ngày mở đăng ký"}
              />
            </Form.Item>

            <Form.Item className="create-campaign-form-item" initialValue={[]} label="Cài đặt nâng cao, chọn thứ trong tuần để lặp:" name="daysOfWeek" required={isRepetition === 4 || isRepetition === 2}>
              <Checkbox.Group options={weeksData} disabled={isRepetition !== 2 && isRepetition !== 4} />

            </Form.Item>


            <Form.Item className="create-campaign-form-item-days-in-month" initialValue={new DateObject().set({ year: 2023, month: 1, day: 1, format })} label="Chọn những ngày cụ thể trong tháng bạn muốn mở đăng ký:" name="daysOfMonth" required={isRepetition === 3}>

              <DatePickerReact
                value={daysOfMonth}
                id="daysOfMonth"
                onChange={dateObject => {
                 
                  setDaysOfMonth(dateObject)
                  dateObject.map(
                    (e) => (
                      dayinmonth.push(e.day.toString())
                    )
                  )
                  setDaysOfMonth(dayinmonth)
                  setMonthRepetition(true)
                  if (dateObject.length === 0)
                    setMonthRepetition(false)
                }}
                multiple
                format={"DD"}
                buttons={false}
                placeholder={"Chọn những ngày mở đăng ký"}
                disabled={isRepetition !== 3}
              />
            </Form.Item>

            <Form.Item initialValue={0} label="Chọn tuần thứ mấy trong tháng bạn muốn lặp lại:" name="weekNumber" required={isRepetition === 4}>
              <Radio.Group disabled={isRepetition !== 4}>
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

            <Form.Item label="Tính năng nâng cao - Mặc định thông báo chiến dịch sẽ không gửi cho mọi người:" name="sendMail" initialValue={false}>
              <Switch style={{ marginRight: "10px" }} /> Gửi mail cho tình nguyện hiến máu có địa chỉ thường trú trong khu vực.
            </Form.Item>

            <div className="Mess" style={{ textAlign: "center", color: "red", marginBottom: "20px" }}>{message}</div>

            <Form.Item className="create-campaign-form-buttons">

              <Button
                // disabled={(campaigName === "" || dates.length !== 2 || address === "") ? true : false}
                id="finishButton" type="primary" htmlType="submit" size="large"
                onClick={showConfirm}
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