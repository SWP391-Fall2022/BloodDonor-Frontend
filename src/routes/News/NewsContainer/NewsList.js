import React, { Component } from "react";
import { List } from "antd";
import { Link } from "react-router-dom";
// hiển thị list new sau khi được lọc ở News component

export default class NewsList extends Component {
  render() {

    const checkedNews = Object.entries(this.props.categories)
      .filter((category) => category[1])
      .map((category) => category[0]);

    const filteredNews = this.props.news.filter(({ category }) =>
      checkedNews.includes(category)
    );

    const data = filteredNews.length === 0 ? this.props.news : filteredNews;

    return (
      // dùng list vs pagination component

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={data}

        renderItem={(item) => (
          <Link to={`/news/news-detail/${item.id}`} className="news-item">

            <div className="news-item-content">
              <p className="title">{item.title}</p>
              <p>{item.content}</p>
              <p>{item.category}</p>
              <p>{item.date}</p>
            </div>

            <div className="news-item-img">
              <img src={item.image} alt={item.title} />
            </div>

          </Link>

        )}
      />
    )
  }

}



