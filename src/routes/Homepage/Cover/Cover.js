import { Button, DatePicker, Space } from 'antd';
import moment from "moment";
import React from 'react'
import "./cover.css"
import img_1 from "../../../assets/homepage-background-1.png"
const Cover = () => {
    const { RangePicker } = DatePicker;
    const dateFormat = "DD/MM/YYYY";
    return <section className="cover">
    {/* <img src={img_1} className="cover-img"></img> */}
    <div className="container-content">
      <h1>
        Chọn thời gian mà bạn<br />
        muốn tham gia hiến máu
      </h1>
      <h3>
        Với mỗi lần hiến máu bạn có thể mang lại cơ hội cứu sống 3 người.
        <br />
        Hãy cứu lấy mạng người bằng máu của mình!
      </h3>
      <div className="container-search">
        <h4>Bạn muốn đặt lịch vào khoảng thời gian nào?</h4>
        <div className="row-search">
          <Space
            direction="vertical"
            size={20}
            style={{ marginRight: "2%" }}
          >
            <RangePicker
              defaultValue={[
                moment("02/10/2022", dateFormat),
                moment("02/10/2022", dateFormat),
              ]}
              format={dateFormat}
            />
          </Space>
          <Button type="primary">Tìm kiếm</Button>
        </div>
      </div>
    </div>
  </section>
};

export default Cover;