import { Avatar, List, PageHeader } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import "./homepagedetail.css";
import WelcomePageWithCampaign from "../WelcomePage/WelcomePageWithCampaign";
import WelcomePageWithOther from "../WelcomePage/WelcomePageWithNoCampaign";
import WelcomePageWithNoCampaign from "../WelcomePage/WelcomePageWithNoCampaign";

import { FooterSmall } from "../../../components/Footer/FooterSmall";
import CampaignShortcutWithCampaign from "../Campaign Shortcut/CampaignShortcutWithCampaign";
import CampaignShortcutWithNoCampaign from "../Campaign Shortcut/CampaignShortcutWithNoCampaign";
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
];
const HomepageDetail = () => {
  const [campaignGoingOn, setCampaignGoingOn] = useState(false);
  return (
    <section id="homepage-detail">
      <PageHeader className="site-page-header" title="Trang chủ" />
      <WelcomePageWithCampaign />
      {/* <WelcomePageWithNoCampaign /> */}
      <div className="homepage-col-2">
        <div className="qna-shortcut">
          <h4>Câu hỏi chưa trả lời</h4>
          <List
            className="qna-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </div>
        <div>
          <CampaignShortcutWithCampaign />
          {/* <CampaignShortcutWithNoCampaign /> */}
        </div>
      </div>
      <FooterSmall />
    </section>
  );
};
export default HomepageDetail;
