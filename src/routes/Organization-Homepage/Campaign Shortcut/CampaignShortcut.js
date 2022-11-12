import { Button } from "antd";
import "./campaignshortcut.css";
import img_1 from "../../../assets/homepage-organization-shortcut-1.png";
import img_2 from "../../../assets/homepage-organization-shortcut-2.png";
import { Link } from "react-router-dom";
const CampaignShortcut = ({ campaigns }) => {
  return (
    <>
      {campaigns.length > 0 ? (
        <section id="create-shortcut">
          <img src={img_1}></img>
          <h1>Hiện tại đang diễn ra chiến dịch {campaigns[0].name}</h1>
          <p>Bạn có muốn tạo thêm chiến dịch mới không?</p>
          <div className="button-shortcut">
            <Link to="/organization/manageCampaign/createCampaign">
              <Button type="primary" value="small">
                Tạo chiến dịch
              </Button>
            </Link>
            <Link to="/organization/notification/create">
              <Button>Tạo thông báo khẩn</Button>
            </Link>
          </div>
        </section>
      ) : (
        <section id="create-shortcut">
          <img src={img_2}></img>
          <h1>Chưa có chiến dịch nào đang diễn ra</h1>
          <p>Bạn có muốn tạo chiến dịch mới không?</p>
          <div className="button-shortcut">
            <Link to="/organization/manageCampaign/createCampaign">
              <Button type="primary" value="small">
                Tạo chiến dịch
              </Button>
            </Link>
            <Link to="/organization/notification/create">
              <Button>Tạo thông báo khẩn</Button>
            </Link>
          </div>
        </section>
      )}{" "}
    </>
  );
};
export default CampaignShortcut;
