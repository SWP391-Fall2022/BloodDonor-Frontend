import { Card } from "antd";
import { Link } from "react-router-dom";

const DataCampaignCard = ({ data }) => {
  return (
    <>
      <div className="campaign-card">
        <div className="campaign-header">
          <a className="campaign-organization-name" href="#organization">
            {data.organizationName}
          </a>
        </div>
        <div className="campaign-img-container">
          <img src={data.images} alt="logo_1"></img>
        </div>
        
        <Link to={`campaign/campaign-detail/${data.id}`}>
        <div className="campaign-card-content">
          <div href="#name" className="campaign-name">
            {data.name}
          </div>
          <div href="#address" className="campaign-address">
            {data.addressDetails}
          </div>
          <div className="campaign-time">
            Từ{" "}
            {data.onSiteDates[0]
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("/")}{" "}
            đến
            {data.onSiteDates[1]
              .substring(0, 10)
              .split("-")
              .reverse()
              .join("/")}
          </div>
        </div>
        </Link>
      </div>
    </>
  );
};
export default DataCampaignCard;
