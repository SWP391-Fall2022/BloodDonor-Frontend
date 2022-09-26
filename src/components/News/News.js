import React from "react";
import NewsStyle from "./NewsStyle.css";


const News = (props) => {
  const { news } = props;
  //lọc và hiển thị từng news item
  const renderNews = news.map(({ id, title, content, image, category }) => {
    
    return (
      <a href="a" className="news-item shadowDP02 ">
        {/* <li key={id}> */}
          <div className="news-item-content">
            <p className="title">{title}</p>
            <p>{content}</p>

            <p>{category}</p>
          </div>

          <div className="news-item-img" style={{ backgroundImage: "url(/trungthuchoem.jpg)" }}>  </div>

          {/* <div className="news-item-img">  <img src={image} /></div> */}

        
        {/* </li> */}
      </a>
    );
  });

  return <ul className="news-items">{renderNews}</ul>;
};

export default News;
