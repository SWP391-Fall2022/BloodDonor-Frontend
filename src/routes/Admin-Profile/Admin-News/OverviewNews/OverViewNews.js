import { Button } from 'antd';
import React, { useContext } from 'react'
import { ViewNewsContext } from '../ViewNews/AdminViewNewsContext';
import "./overviewnews.css"
export default function OverViewNews() {
  const { valueViewNews, setPage} = useContext(ViewNewsContext);
  const handleReturn = () =>{
    setPage(1);
  }
  const handleCancel = () =>{
    setPage(0);
  }
  return (
    <div id="overview-news">
      <h2 className="news-title">{valueViewNews.title}</h2>
      <div> Tác giả: {valueViewNews.author}  </div>
      <div className="news-detail-img">
        <img src={valueViewNews.images} alt={valueViewNews.title}></img>
      </div>

      <div className="news-content">
      {/* {valueViewNews.context} */}
      {console.log(valueViewNews.content)}
      <div dangerouslySetInnerHTML={{ __html: valueViewNews.content}} />
      </div>
      <Button onClick={handleReturn}> Quay lại</Button>
      <Button onClick={handleCancel}> Hủy chỉnh sửa </Button>
    </div>

  )

}

