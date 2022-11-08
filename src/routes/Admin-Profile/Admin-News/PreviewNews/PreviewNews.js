import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AdBread } from '../../AdminBreadcrumbs';
import { CreateNewsContext } from '../CreateNews/AdminCreateNewsContext';
import "./previewnews.css"
export default function PreviewNews() {
  const { valueCreateNews, setPage} = useContext(CreateNewsContext);
  const handleReturn = () =>{
    setPage(0);
  }
  const breadName = (
    <>
      <Link to="/admin/create_news">
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Xem trước tin tức
    </>
  );
  const layer1 = <Link to="/admin/news_list">Quản lí tin tức</Link>;
  const layer2 = <Link onClick={handleReturn} to="/admin/create_news">Tạo tin tức</Link>;
  
  return (
    <>
  <div className="preview-news-breadcrumb">
        <AdBread
          layer1={layer1}
          layer2={layer2}
          layer3="Xem trước tin tức"
          name={breadName}
        />
      </div>
    <div id="preview-news">
      <h2 className="news-title">{valueCreateNews.title}</h2>
      <h2>PREVIEW</h2>
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
</>
  )

}

