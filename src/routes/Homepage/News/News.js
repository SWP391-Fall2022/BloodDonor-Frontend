import React, { useEffect, useState } from "react";
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

  return (
    <section className="homepage-news">
      <h2>TIN TỨC</h2>
      {data != null && (
        <div>
          {console.log(data[0])}
          <div className="homepage-news-container">
            <div>
              <div className="news-card-vertical">
                <div className="news-img-container">
                  <img src={data[0].images} alt="news"></img>
                </div>
                <div className="news-content">
                  <div className="time">
                    {data[0].postingTime
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </div>
                  <a className="title" href="#.">
                    {data[0].title} 
                  </a>
                  <div className="summary">{data[0].content}</div>
                </div>
              </div>
            </div>

            <div className="news-list">
              {data.map(
                (post, index) =>
                  index > 0 &&
                  index < 4 && (
                    <div className="news-card-horizontal">
                      <div className="news-content">
                        <div className="time">
                          {post.postingTime
                            .substring(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")}
                        </div>
                        <a className="title" href="#.">
                          {post.title}
                        </a>
                        <div className="summary">
                          {post.content}
                        </div>
                      </div>
                      <div className="news-img-container">
                        <img
                          src={post.images}
                          alt="news"
                        ></img>
                      </div>
                    </div>
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
