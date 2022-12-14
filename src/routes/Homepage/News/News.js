import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./news.css";
const News = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/v1/posts", { method: "GET" })
      .then((response) => response.json())
      .then((dataApi) => {
        setData(dataApi.body.reverse());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(data);
  return (
    <section className="homepage-news">
      <h2>TIN TỨC</h2>
      {data != null && (
        <div>
          {console.log(data[0])}
          <div className="homepage-news-container">
            <div>
              <Link to={`news/news-detail/${data[0].id}`}>
                <div className="news-card-vertical">
                  <div className="news-img-container">
                    <img src={data[0].images} alt="news"></img>
                  </div>
                  <div className="news-content">
                    <div className="time">
                      Ngày đăng:{" "}
                      {data[0].postingTime
                        .substring(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")}
                    </div>
                    <a className="title" href="#.">
                      {data[0].title}
                    </a>
                    <div className="summary" dangerouslySetInnerHTML={{ __html: data[0].content }} />
                  </div>
                </div>
              </Link>
            </div>

            <div className="news-list">
              {data.map(
                (post, index) => index > 0 && index < 4 && (
                  <Link to={`news/news-detail/${post.id}`}>
                    <div className="news-card-horizontal">
                      <div className="news-content">
                        <div className="time">
                          Ngày đăng:{" "}
                          {post.postingTime
                            .substring(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")}
                        </div>
                        <a className="title" href="#.">
                          {post.title}
                        </a>
                        <div className="summary" dangerouslySetInnerHTML={{ __html: post.content }} />
                      </div>
                      <div className="news-img-container">
                        <img src={post.images} alt="news"></img>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
