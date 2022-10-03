import React, { Component } from "react";
import packageInfo from "../../shared/data.json";
import FilterTable from "../Filter Table/FilterTable";
import NewsList from "./NewsList";
import SearchBox from "../Search Box/SearchBox";
import newsContainer from "./newsContainer.css";

// Chứa các content item của news page để dùng bootstrp hoặc grid
// là components cha của FilterTable & NewsList
export default class NewsContainer extends Component {
  state = {
    news: packageInfo.listOfNews,
    categories: {
      campaignAct: false,
      donorStory: false,
      patientStory: false,
      bloodType: false,
      abo: false,
      typicalDonor: false,
    },
  };
  //handle for filter change

  handleChange = (e) => {
    const { name } = e.target;

    this.setState((prevState) => {
      return {
        categories: {
          ...prevState.categories,
          [name]: !prevState.categories[name],
        },
      };
    });
  };

  render() {
    return (
      <div className="news-container">
        <div className="filter">
          <FilterTable
            categories={this.state.categories}
            news={this.state.news}
            handleChange={this.handleChange}
          ></FilterTable>
        </div>

        <div className="search-news">
          <SearchBox></SearchBox>
          <NewsList
            news={this.state.news}
            categories={this.state.categories}
          ></NewsList>
        </div>
      </div>
    );
  }
}
