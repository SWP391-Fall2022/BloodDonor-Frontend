import { textAlign } from "@mui/system";
import DataCampaignCard from "./DataCampaignCard";

const DataCampaign = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        <DataCampaignCard data={data[0]}></DataCampaignCard>
      ) : (
        <div className="campaign-card" >
          <div className="campaign-header">
            <div
              className="campaign-organization-name"
              href="#organization"
              style={{ textAlign: "center" }}
            >
              Chưa có dữ liệu
            </div>
          </div>
          <div className="campaign-img-container">
            <img
              src="https://www.1mg.com/articles/wp-content/uploads/2019/06/blood-donation.jpg"
              alt="logo_1"
            ></img>
          </div>
        </div>
      )}
      {data.length > 1 ? (
        <DataCampaignCard data={data[1]}></DataCampaignCard>
      ) : (
        <div className="campaign-card">
          <div className="campaign-header">
            <div
              className="campaign-organization-name"
              href="#organization"
              style={{ textAlign: "center" }}
            >
              Chưa có dữ liệu
            </div>
          </div>
          <div className="campaign-img-container">
            <img
              src="https://www.1mg.com/articles/wp-content/uploads/2019/06/blood-donation.jpg"
              alt="logo_1"
            ></img>
          </div>
        </div>
      )}
      {data.length > 2 ? (
        <DataCampaignCard data={data[2]}></DataCampaignCard>
      ) : (
        <div className="campaign-card">
          <div className="campaign-header">
            <div
              className="campaign-organization-name"
              href="#organization"
              style={{ textAlign: "center" }}
            >
              Chưa có dữ liệu
            </div>
          </div>
          <div className="campaign-img-container">
            <img
              src="https://www.1mg.com/articles/wp-content/uploads/2019/06/blood-donation.jpg"
              alt="logo_1"
            ></img>
          </div>
        </div>
      )}
      {data.length > 3 ? (
        <DataCampaignCard data={data[3]}></DataCampaignCard>
      ) : (
        <div className="campaign-card">
          <div className="campaign-header">
            <div
              className="campaign-organization-name"
              href="#organization"
              style={{ textAlign: "center" }}
            >
              Chưa có dữ liệu
            </div>
          </div>
          <div className="campaign-img-container">
            <img
              src="https://www.1mg.com/articles/wp-content/uploads/2019/06/blood-donation.jpg"
              alt="logo_1"
            ></img>
          </div>
        </div>
      )}
    </>
  );
};
export default DataCampaign;
