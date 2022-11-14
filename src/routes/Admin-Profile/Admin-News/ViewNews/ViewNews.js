import { Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const hideNews = async () => {
    valueViewNews.status = false;
    const token = JSON.parse(sessionStorage.getItem("JWT_Key"));

    let json = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_HOST}/v1/posts/${valueViewNews.id}/hide`,
      json
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
    console.log("response", response);
  };

  const unhideNews = async () => {
    valueViewNews.status = true;
    const token = JSON.parse(sessionStorage.getItem("JWT_Key"));

    let json = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_HOST}/v1/posts/${valueViewNews.id}/unhide`,
      json
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
    console.log("response", response);
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
              {valueViewNews.status === true ? (
                <Link to={`/admin/news`}>
                <Button onClick={hideNews} type="primary"> Ẩn </Button>
                </Link>
                
              ) : (
                <Link to={`/admin/news`}>
                <Button onClick={unhideNews} type="primary"> Công khai </Button>
                </Link>
              )}

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
