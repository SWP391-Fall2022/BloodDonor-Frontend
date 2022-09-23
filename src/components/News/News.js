import React from "react";
import NewsStyle from "./NewsStyle.css";

const News = (props) => {
  const { news } = props;
  //lọc và hiển thị từng news item
  const renderNews = news.map(({ id, title, content, image, category }) => {
    return (
      <a href="a" className="news-item">
        {/* <li key={id}> */}
          <div className="news-item-content">
            <h3>{title}</h3>
            <p>{content}</p>

            <p>{category}</p>
          </div>

          <div className="news-item-img"></div>

          <img src={image} />
        {/* </li> */}
      </a>
    );
  });

  return <ul className="news-items">{renderNews}</ul>;
};

export default News;
