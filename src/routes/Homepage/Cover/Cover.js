import { Button, DatePicker, Space } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./cover.css";

const Cover = () => {
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  };
  //date for range picker
  const [date, setDate] = useState();
  const { RangePicker } = DatePicker;
  return (
    <section className="cover">
      {/* <img src={img_1} className="cover-img"></img> */}
      <div className="container-content">
        <h1>
          Chọn thời gian mà bạn
          <br />
          muốn tham gia hiến máu
        </h1>
        <h3>
          Với mỗi lần hiến máu bạn có thể mang lại cơ hội cứu sống 3 người.
          <br />
          Hãy cứu lấy mạng người bằng máu của mình!
        </h3>
        {/* <div className="container-search"> */}
          {/* <h4>Bạn muốn đặt lịch vào khoảng thời gian nào?</h4>
          <div className="row-search">
            {/* <Space direction="horizontal" size={20} style={{ marginRight: "2%" }}>
              <RangePicker
              placeholder={["Bắt đầu", "Kết thúc"]}
                disabledDate={disabledDate}
                onChange={(values) => {
                  setDate(values);
                }}
                format={"DD-MM-YYYY"}
                allowClear={false}
              />
              {console.log("date:", date)} */}
              <Link to={`/campaign`} >
               <Button type="primary">Chọn lịch hiến máu</Button>
               </Link>
            {/* </Space> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default Cover;
