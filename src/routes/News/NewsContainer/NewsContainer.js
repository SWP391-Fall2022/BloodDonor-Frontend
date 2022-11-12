import React, { Component } from "react";
import FilterTable from "../FilterTable/FilterTable";
import NewsList from "../NewsContainer/NewsList";
import SearchBox from "../SearchBox/SearchBox";
import newsContainer from "./newsContainer.css";

// Chứa các content item của news page để dùng bootstrp hoặc grid
// là components cha của FilterTable & NewsList
export default class NewsContainer extends Component { 
  state = {
  news: [],
  categories: {
    campaignAct: false,
    donorStory: false,
    patientStory: false,
    bloodType: false,
    abo: false,
    typicalDonor: false,
  },
  error:null
  
};



componentDidMount() {
  fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/posts`)
  .then(res => res.json())
  .then(
    (result) => {
      this.setState({
        news: result.body
      
      });
     
    },

    (error) => {
      this.setState({
        error: error
      });
      console.log(error)
    }
  )
}
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
        <NewsList
          news={this.state.news}
          categories={this.state.categories}
        ></NewsList>
      </div>
    </div>
  );
}
}
