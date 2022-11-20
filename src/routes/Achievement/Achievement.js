import { Avatar, List } from "antd";
import { Footer } from "../../components/Footer/Footer";
import React, { useState } from "react";
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
const height_col1 = 40;
const height_col2 = 80;
const height_col3 = 100;
const height_col4 = 60;
const height_col5 = 20;

const Achievement = () => {
  const [dataDonor, setDonor] = useState([
    {
      name: "Văn A",
      avatar:
        "https://media.istockphoto.com/vectors/emoticon-cute-line-art-and-flat-color-vector-id1157140670?b=1&k=20&m=1157140670&s=170667a&w=0&h=Sma21BtSsqUQscCVcf6qmHQqw0JRalTai7XIz_6kfkM=",
    },
    {
      name: "Văn B",
      avatar:
        "https://media.istockphoto.com/vectors/emoticon-cute-line-art-and-flat-color-vector-id1157140670?b=1&k=20&m=1157140670&s=170667a&w=0&h=Sma21BtSsqUQscCVcf6qmHQqw0JRalTai7XIz_6kfkM=",
    },
    {
      name: "Văn C",
      avatar:
        "https://media.istockphoto.com/vectors/emoticon-cute-line-art-and-flat-color-vector-id1157140670?b=1&k=20&m=1157140670&s=170667a&w=0&h=Sma21BtSsqUQscCVcf6qmHQqw0JRalTai7XIz_6kfkM=",
    },
  ]);
  const [dataOrg, setOrg] = useState([
    {
      name: "Bệnh viện A",
      avatar:
        "https://media.istockphoto.com/vectors/emoticon-cute-line-art-and-flat-color-vector-id1157140670?b=1&k=20&m=1157140670&s=170667a&w=0&h=Sma21BtSsqUQscCVcf6qmHQqw0JRalTai7XIz_6kfkM=",
    },
    {
      name: "Bệnh viện B",
      avatar:
        "https://media.istockphoto.com/vectors/emoticon-cute-line-art-and-flat-color-vector-id1157140670?b=1&k=20&m=1157140670&s=170667a&w=0&h=Sma21BtSsqUQscCVcf6qmHQqw0JRalTai7XIz_6kfkM=",
    },
    {
      name: "Bệnh viện C",
      avatar:
        "https://media.istockphoto.com/vectors/emoticon-cute-line-art-and-flat-color-vector-id1157140670?b=1&k=20&m=1157140670&s=170667a&w=0&h=Sma21BtSsqUQscCVcf6qmHQqw0JRalTai7XIz_6kfkM=",
    },
  ]);
  const [dataProvince, setProvince] = useState([
    {
      name: "TP Hồ Chí Minh",
    },
    {
      name: "Hà Nội",
    },
    {
      name: "Hải Phòng",
    },
    {
      name: "Cà Mau",
    },
    {
      name: "Đà Nẵng",
    },
  ]);
  //*DONOR
  // useEffect(() => {
  //   fetch(
  //     "http://localhost:8080/v1/Datas/top5?from=2022-01-01&to=2022-12-31",
  //     { method: "GET" }
  //   )
  //     .then((response) => response.json())
  //     .then((dataApi) => {
  //       setData(dataApi.body);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  //*ORGANIZATION
  // useEffect(() => {
  //   fetch(
  //     "http://localhost:8080/v1/campaign/top5Orgs?from=2022-01-01&to=2022-12-31",
  //     { method: "GET" }
  //   )
  //     .then((response) => response.json())
  //     .then((dataApi) => {
  //       setOrg(dataApi.body);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  //*PROVINCE
  // useEffect(() => {
  //   fetch(
  //     "http://localhost:8080/v1/campaign/top5Provinces?from=2022-01-01&to=2022-12-31",
  //     { method: "GET" }
  //   )
  //     .then((response) => response.json())
  //     .then((dataApi) => {
  //       setProvince(dataApi.body);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);
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
            <h3 style={{ paddingTop: `${250 - (height_col1 * 250) / 100}px` }}>
              {dataProvince[3].name}
            </h3>
            <div
              className="col col1"
              style={{ height: `${(height_col1 * 250) / 100}px` }}
            ></div>
          </div>
          <div className="container-col">
            <h3 style={{ paddingTop: `${250 - (height_col2 * 250) / 100}px` }}>
              {dataProvince[1].name}
            </h3>
            <div
              className="col col2"
              style={{ height: `${(height_col2 * 250) / 100}px` }}
            ></div>
          </div>
          <div className="container-col">
            <h3 style={{ paddingTop: `${250 - (height_col3 * 250) / 100}px` }}>
              {dataProvince[0].name}
            </h3>
            <div
              className="col col3"
              style={{ height: `${(height_col3 * 250) / 100}px` }}
            ></div>
          </div>
          <div className="container-col">
            <h3 style={{ paddingTop: `${250 - (height_col4 * 250) / 100}px` }}>
              {dataProvince[2].name}
            </h3>
            <div
              className="col col4"
              style={{ height: `${(height_col4 * 250) / 100}px` }}
            ></div>
          </div>
          <div className="container-col">
            <h3 style={{ paddingTop: `${250 - (height_col5 * 250) / 100}px` }}>
              {dataProvince[4].name}
            </h3>
            <div
              className="col col5"
              style={{ height: `${(height_col5 * 250) / 100}px` }}
            ></div>
          </div>
        </div>
      </section>
      <section className="achievement-content">
        <h2>BẢNG THÀNH TÍCH</h2>
        <div className="achievement-col">
          <div className="achievement-table">
            <h3>
              Tình nguyện viên
              hiến máu nhiều lần nhất
            </h3>
            <List
              itemLayout="horizontal"
              dataSource={dataDonor}
              renderItem={(item) => (
                <List.Item className="achievement-style">
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href="#">{item.name}</a>}
                    description="TP Hồ Chí Minh"
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="achievement-table">
            <h3>
              Bệnh viện có hoạt động hiến máu tiêu biểu
            </h3>
            <List
              itemLayout="horizontal"
              dataSource={dataOrg}
              renderItem={(item) => (
                <List.Item className="achievement-style">
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href="#">{item.name}</a>}
                    description="TP Hồ Chí Minh"
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="achievement-table">
            <h3>
              Tỉnh thành có tình nguyện viên
              tham gia nhiều nhất
            </h3>
            <List
              itemLayout="horizontal"
              dataSource={dataProvince}
              renderItem={(item) => (
                <List.Item className="achievement-style">
                  <List.Item.Meta
                    avatar={<Avatar src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fstylized-simple-outline-map-vietnam-icon-blue-sketch-map-vietnam-vector-illustration_18657929.htm&psig=AOvVaw1f5rxdIvw33J9aK3DPQwoD&ust=1668082078063000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPisj4-IofsCFQAAAAAdAAAAABAF" />}
                    title={<a href="#">{item.name}</a>}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};
export default Achievement;
