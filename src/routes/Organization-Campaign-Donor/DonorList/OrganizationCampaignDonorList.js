import { PageHeader } from "antd";
import { Link, useParams } from "react-router-dom";
import "./organizationcampaigndonorlist.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { SideBarforOrganization } from "../../../components/SideBar/SideBarforOrganization";
import { OrgBread } from "../OrganizationBreadcrumb";
import DonorList from "./DonorList";
const OrganizationCampaignDonorList = () => {
  const breadName = (
    <>
      <Link to="/organization/manageCampaign">
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Danh sách tình nguyện viên
    </>
  );
  const layer1 = <Link to="/organization/manageCampaign" >Danh sách chiến dịch</Link>;
  const campaignID = useParams();
  // const user = JSON.parse(sessionStorage.getItem('user'))
  // const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
  // if (user === null) {
  //     return <Navigate to={`/login`} />
  // } else if (rolePath !== "/organization") {
  //     return <Navigate to={rolePath} />
  // } else {
  return (
    <div className="organization-donorlist-col">
      <div>
        <SideBarforOrganization/>
      </div>
      <div>
        <div className="donor-health-breadcrumb">
          <OrgBread
            layer1={layer1}
            layer2="Danh sách tình nguyện viên"
            name={breadName}
          />
        </div>
        <DonorList campaignID={campaignID.id} />
      </div>
    </div>
  );
  // }
};
export default OrganizationCampaignDonorList;
