import React, { Component } from "react";
import News from "./News";
// hiển thị list new sau khi được lọc ở News component
// là components cha của News
export default class NewsList extends Component {
  render() {
    const checkedNews = Object.entries(this.props.categories)
      .filter((category) => category[1])
      .map((category) => category[0]);
    const filteredNews = this.props.news.filter(({ category }) =>
      checkedNews.includes(category)
    );

    return (
      <News news={filteredNews.length === 0 ? this.props.news : filteredNews} />
    );
  }
}
