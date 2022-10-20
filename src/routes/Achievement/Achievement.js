import { Avatar, List } from "antd";
import React from "react";
import { Navbar } from "../../components/NavBar/navbar";
import "./achievement.css";
import { height } from "@mui/system";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 5",
  },
];
const height_col1 = 20;
const height_col2 = 60;
const height_col3 = 100;
const height_col4 = 80;
const height_col5 = 40;

const Achievement = () => {
  return (
    <section id="Achievement">
      <Navbar />
      <section className="achievement-cover">
        <h2>
          TỈNH THÀNH CÓ SỐ NGƯỜI THAM GIA <br />
          HIẾN MÁU NHIỀU NHẤT
        </h2>
        <div className="achievement-cols">
          <div className="container-col">
          <h3 style={{paddingTop: `${250 - height_col1 * 250 / 100}px`}}>Quy Nhơn</h3>
            <div className="col col1" style={{height: `${height_col1 * 250 / 100}px`}}></div>
          </div>
          <div className="container-col">
            <h3 style={{paddingTop: `${250 - height_col2 * 250 / 100}px`}}>Đà Nẵng</h3>
            <div className="col col2" style={{height: `${height_col2 * 250 / 100}px`}}></div>
          </div>
          <div className="container-col">
            <h3 style={{paddingTop: `${250 - height_col3 * 250 / 100}px`}}>TP Hồ Chí Minh</h3>
            <div className="col col3" style={{height: `${height_col3 * 250 / 100}px`}}></div>
          </div>
          <div className="container-col">
          <h3 style={{paddingTop: `${250 - height_col4 * 250 / 100}px`}}>Hà Nội</h3>
            <div className="col col4" style={{height: `${height_col4 * 250 / 100}px`}}></div>
          </div>
          <div className="container-col">
            <h3 style={{paddingTop: `${250 - height_col5 * 250 / 100}px`}}>Cần Thơ</h3>
            <div className="col col5" style={{height: `${height_col5 * 250 / 100}px`}}></div>
          </div>
        </div>
      </section>
      <section className="achievement-content">
        <h2>BẢNG THÀNH TÍCH</h2>
        <div className="achievement-col">
          <div className="achievement-table">
            <h3>
              Tình nguyện viên <br />
              hiến máu nhiều lần nhất
            </h3>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item className="achievement-style">
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="TP Hồ Chí Minh"
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="achievement-table">
            <h3>
              Tình nguyện viên <br />
              hiến máu nhiều lần nhất
            </h3>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item className="achievement-style">
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="TP Hồ Chí Minh"
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="achievement-table">
            <h3>
              Tình nguyện viên <br />
              hiến máu nhiều lần nhất
            </h3>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item className="achievement-style">
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="TP Hồ Chí Minh"
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </section>
    </section>
  );
};
export default Achievement;
