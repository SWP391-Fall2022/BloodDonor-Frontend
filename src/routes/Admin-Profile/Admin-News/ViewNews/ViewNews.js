import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./viewnews.css";
import styles from "../../admin.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AdBread } from "../../AdminBreadcrumbs";
import { useContext } from "react";
import { ViewNewsContext } from "./AdminViewNewsContext";
import { Padding } from "@mui/icons-material";
const ViewNews = () => {
  const handleList = () => {
    setPage(3);
  };
  const breadName = (
    <>
      <Link onClick={handleList}>
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Xem tin tức
    </>
  );
  const layer1 = <Link onClick={handleList}>Quản lý tin tức</Link>;
  const { setPage, setViewNews, valueViewNews } = useContext(ViewNewsContext);
  const handleEdit = () => {
    setPage(1); //Go to Edit page
  };
  return (
    <>
      <div className="view-news-breadcrumb">
        <AdBread layer1={layer1} layer2="Xem tin tức" name={breadName} />
      </div>
      <div id="view-news">
        {valueViewNews != null && (
          <div>
            <h2 className="news-title">{valueViewNews.title}</h2>
            <div>
              Ngày đăng:{" "}
              {valueViewNews.postingTime
                .substring(0, 10)
                .split("-")
                .reverse()
                .join("/")}{" "}
              | Tác giả: {valueViewNews.author}
            </div>
            <div className="news-detail-img">
              <img src={valueViewNews.image} alt={valueViewNews.title}></img>
            </div>
            <div className="news-content">
              <div
                dangerouslySetInnerHTML={{ __html: valueViewNews.content }}
              />
            </div>
            <div className="view-news-buttons">
            {valueViewNews.status === true ? <Button> Ẩn </Button> : <Button> Công khai </Button>}
              
              <Button type="primary" onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ViewNews;
