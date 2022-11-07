import { Button } from 'antd';
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { CreateNewsContext } from '../CreateNews/AdminCreateNewsContext';
import "./previewnews.css"
export default function PreviewNews() {
  const { valueCreateNews, setPage} = useContext(CreateNewsContext);
  const handleReturn = () =>{
    setPage(0);
  }
  return (
    <div id="preview-news">
      <h2 className="news-title">{valueCreateNews.title}</h2>
      <div> Tác giả: {valueCreateNews.author}  </div>
      <div className="news-detail-img">
        <img src={valueCreateNews.images} alt={valueCreateNews.title}></img>
      </div>

      <div className="news-content">
      {/* {valueCreateNews.context} */}
      {console.log(valueCreateNews.content)}
      <div dangerouslySetInnerHTML={{ __html: valueCreateNews.content}} />
      </div>
      <Button onClick={handleReturn}> Quay lại</Button>
    </div>

  )

}

