import { Carousel } from "antd";
import React, { useState } from "react";
import "./achievement.css";
import HasData from "./HasData";
import HasDataProvince from "./HasDataProvince";
const height_col1 = 20;
const height_col2 = 60;
const height_col3 = 100;
const height_col4 = 80;
const height_col5 = 40;
const Achievements = () => {
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
  const [dataProvince, setProvince] = useState("");
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
    <section className="achievements">
      <Carousel
        className="achievement-carousel"
        autoplay
        draggable={true}
        touchThreshold={30}
        dots={false}
      >
        <div>
          <h2>Tình nguyện viên hiến máu nhiều lần nhất</h2>
          <div className="achievement-list">
            <div className="achievement-card place-4th">
              <HasData data={dataDonor} number={4} />
            </div>
            <div className="achievement-card place-3rd">
              <HasData data={dataDonor} number={2} />
            </div>
            <div className="achievement-card place-1st">
              <HasData data={dataDonor} number={1} />
            </div>
            <div className="achievement-card place-3rd">
              <HasData data={dataDonor} number={3} />
            </div>
            <div className="achievement-card place-5th">
              <HasData data={dataDonor} number={5} />
            </div>
          </div>
        </div>
        <div>
          <h2>Bệnh viện có tỉ lệ tình nguyện viên tham gia nhiều nhất</h2>

          <div className="achievement-list">
            <div className="achievement-card place-4th">
              <HasData data={dataOrg} number={4} />
            </div>
            <div className="achievement-card place-3rd">
              <HasData data={dataOrg} number={2} />
            </div>
            <div className="achievement-card place-1st">
              <HasData data={dataOrg} number={1} />
            </div>
            <div className="achievement-card place-3rd">
              <HasData data={dataOrg} number={3} />
            </div>
            <div className="achievement-card place-5th">
              <HasData data={dataOrg} number={5} />
            </div>
          </div>
        </div>
        <div>
          <h2>Tỉnh thành có tình nguyện viên tham gia nhiều nhất</h2>
          <div className="achievement-list">
            <div className="achievement-card place-4th">
              <HasDataProvince data={dataProvince} number={4} />
            </div>
            <div className="achievement-card place-3rd">
              <HasDataProvince data={dataProvince} number={2} />
            </div>
            <div className="achievement-card place-1st">
              <HasDataProvince data={dataProvince} number={1} />
            </div>
            <div className="achievement-card place-3rd">
              <HasDataProvince data={dataProvince} number={3} />
            </div>
            <div className="achievement-card place-5th">
              <HasDataProvince data={dataProvince} number={5} />
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Achievements;
