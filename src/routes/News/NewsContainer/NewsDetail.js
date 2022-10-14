import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import packageInfo from "../../../shared/ListOfNews.json";

export default function NewsDetail() {

  const newsTitle = useParams();

  const news = packageInfo.listOfNews.find(obj => {

    return obj.id == newsTitle.id;
  });

  return (
    <div className='newsDetail'>
      <Breadcrumb>
        <Breadcrumb.Item>News</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/news'>{news.category}</Link>
          {/* ten category */}
        </Breadcrumb.Item>

        <Breadcrumb.Item>{news.title}</Breadcrumb.Item>
        {/* news title */}
      </Breadcrumb>

      <h2 className='title' >{news.title}</h2>
      <div>Ngày đăng: {news.date}   | Tác giả: {news.author}  </div>
      <div className='detail-img'>
        <img src={news.image} alt={news.title}></img>
      </div>

      <div className='content'>
        <p>{news.content}</p>
      </div>

    </div>

  )

}

