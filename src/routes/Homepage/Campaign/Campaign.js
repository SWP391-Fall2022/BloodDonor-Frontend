import "./campaign.css";
// import logo_1 from "../../../assets/organization-logo-1.png";
// import logo_2 from "../../../assets/organization-logo-2.png";
import React, { useEffect } from "react";
import { Carousel } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
// import { MovingOutlined } from "@mui/icons-material";
// import DataCampaignCard from "./DataCampaignCard";
import DataCampaign from "./DataCampaign";
const Campaign = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  const [HoChiMinh, setHoChiMinh] = useState();
  const [HaNoi, setHaNoi] = useState();
  const [DaNang, setDaNang] = useState();
  const [BinhThuan, setBinhThuan] = useState();
  const [CanTho, setCanTho] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/v1/campaign/getAllActive")
      .then((response) => response.json())
      .then((dataApi) => {
        setHoChiMinh(dataApi.body.reverse().filter(
          (item) => item.districtId >= 1 && item.districtId <= 23
        ))
        setHaNoi(dataApi.body.reverse().filter(
          (item) => item.districtId >= 25 && item.districtId <= 54
        ))
        setDaNang(dataApi.body.reverse().filter(
          (item) => item.districtId >= 55 && item.districtId <= 62
        ))
        setBinhThuan(dataApi.body.reverse().filter(
          (item) => item.districtId >= 171 && item.districtId <= 180
        ))
        setCanTho(dataApi.body.reverse().filter(
          (item) => item.districtId >= 162 && item.districtId <= 170
        ))
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(HoChiMinh);

  // const filterProvince = (data, minId, maxId) => {
  //   return data.filter(
  //     (item) => item.districtId >= minId && item.districtId <= maxId
  //   );
  // };
  // const HoChiMinh = filterProvince(data, 1, 24);
  // console.log(HoChiMinh)

  return (
    <section className="campaign">
      <Carousel autoplay draggable={true} touchThreshold={30} dots={false}>
        {/* SLIDE 2 */}
        <div>
          <h2 >
            C??C CHI???N D???CH ??ANG DI???N RA ??? TP H??? Ch?? Minh
          </h2>
          <div className="container-campaign">
            {HoChiMinh !== undefined && (<DataCampaign data={HoChiMinh}></DataCampaign>)}
          </div>
        </div>
        {/* SLIDE 2 */}
        <div>
          <h2 >C??C CHI???N D???CH ??ANG DI???N RA ??? H?? N???I</h2>
          <div className="container-campaign">
            {HaNoi !== undefined && (<DataCampaign data={HaNoi}></DataCampaign>)}

          </div>
        </div>
        <div>
          <h2 >C??C CHI???N D???CH ??ANG DI???N RA ??? ???? N???ng</h2>
          <div className="container-campaign">
            {HaNoi !== undefined && (<DataCampaign data={DaNang}></DataCampaign>)}

          </div>
        </div>
        <div>
          <h2 >C??C CHI???N D???CH ??ANG DI???N RA ??? B??nh Thu???n</h2>
          <div className="container-campaign">
            {HaNoi !== undefined && (<DataCampaign data={BinhThuan}></DataCampaign>)}

          </div>
        </div>
        <div>
          <h2 >C??C CHI???N D???CH ??ANG DI???N RA ??? C???n Th??</h2>
          <div className="container-campaign">
            {HaNoi !== undefined && (<DataCampaign data={CanTho}></DataCampaign>)}

          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Campaign;
