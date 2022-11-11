import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import moment from "moment";


export default function NewsDetail() {

  const navigate = useNavigate();

  const newsTitle = useParams();

  const [news, setNews] = useState([]);

  // fetch data function
  function getNewsFromAPI() {
    const asyncFn = async () => {

      let json = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      }
      const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/posts`, json)
        .then((res) => res.json())
        .catch((error) => { console.log(error) })
      console.log("news response", response)

      if (response.success) {
        console.log("news response succ", response)
        setNews(response.body.find(obj => {

          return obj.id == newsTitle.id;
        }
        )

        )

      }

    }
    asyncFn();
  }


  //call etch API function
  useEffect(() => {
    getNewsFromAPI();
  }, [newsTitle.id]
  )

  function renderCategory(string) {
    switch (string) {
      case "1":
        return "Hoạt động sự kiện"
      case "2":
        return "Câu chuyện người hiến máu"
      case "3":
        return "Câu chuyện người bệnh"
      case "4":
        return "Nhóm máu và sức khỏe"
      case "5":
        return "Giải trí cùng ABO"
      default:
         return "Gương hiến máu tiêu biểu"

    }
  }


  return (
    <>
      {news !== undefined ? (
        <div className='newsDetail'>
          <Breadcrumb className='newsDetail-breadcrumb'>
            <Breadcrumb.Item><Link to='/news'>News</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              {renderCategory(news.category)}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{news.title}</Breadcrumb.Item>
          </Breadcrumb>

          <h2 className='title' >{news.title}</h2>
          <div>Ngày đăng: {moment(news.postingTime).format("DD-MM-YYYY")}   | Tác giả: {news.author}  </div>
          <div className='detail-img'>
            <img src={news.images} alt={news.title}></img>
          </div>

          <div className='content'>
            <p>{news.content}</p>
          </div>

        </div>
      ) : navigate("*")}
    </>

  )

}

