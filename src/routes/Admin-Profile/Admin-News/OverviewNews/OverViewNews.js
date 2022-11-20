import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AdBread } from "../../AdminBreadcrumbs";
import { ViewNewsContext } from "../ViewNews/AdminViewNewsContext";
import "./overviewnews.css";
export default function OverViewNews() {
  const { valueViewNews, setPage } = useContext(ViewNewsContext);
  const handleReturn = () => {
    
    setPage(1);
  };
  const handleView = () => {
    setPage(0);
  };
  const handleEdit = () => {
    setPage(1);
  };
  const handleList = () => {
    setPage(3);
  };
  const breadName = (
    <>
      <Link  onClick={handleEdit}>
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Xem trước tin tức
    </>
  );
  const layer1 = <Link onClick={handleList}>Quản lý tin tức</Link>;
  const layer2 = <Link onClick={handleView} >Xem tin tức</Link>;
  const layer3 = <Link onClick={handleEdit} >Chỉnh sửa tin tức</Link>;

  return (
    <>
      <div className="overview-news-breadcrumb">
        <AdBread
          layer1={layer1}
          layer2={layer2}
          layer3={layer3}
          layer4="Xem trước tin tức"
          name={breadName}
        />
      </div>
      <div id="overview-news">
        <h2 className="news-title">{valueViewNews.title}</h2>
        <div> Tác giả: {valueViewNews.author} </div>
        <div className="news-detail-img">
          <img src={valueViewNews.images} alt={valueViewNews.title}></img>
        </div>

        <div className="news-content">
          {/* {valueViewNews.context} */}
          
          <div dangerouslySetInnerHTML={{ __html: valueViewNews.content }} />
        </div>
        <Button onClick={handleReturn}> Quay lại</Button>
      </div>
    </>
  );
}
