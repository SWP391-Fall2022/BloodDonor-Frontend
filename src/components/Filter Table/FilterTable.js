import React, { Component } from "react";
import Checkbox from "./Checkbox";
import filterTable from './filterTable.css'
// chứa bảng các item filter
// thêm item để filter thì thêm checkbox
export default class FilterTable extends Component {
  render() {
    return (
      <div className="filterTable">
        <h3 className="checkbox-table-title">Lọc theo chủ đề</h3>
        <div className="checkbox-items">
          <Checkbox
            id="1"
            title="Hoạt động sự kiện"
            name="campaignAct"
            checked={this.props.categories.campaignAct}
            handleChange={this.props.handleChange}
          />

          <Checkbox
            id="2"
            title="Câu chuyện người hiến máu"
            name="donorStory"
            checked={this.props.categories.donorStory}
            handleChange={this.props.handleChange}
          />

          <Checkbox
            id="3"
            title="Câu chuyện người bệnh"
            name="patientStory"
            checked={this.props.categories.patientStory}
            handleChange={this.props.handleChange}
          />

          <Checkbox
            id="4"
            title="Nhóm máu và sưc khỏe"
            name="bloodType"
            checked={this.props.categories.bloodType}
            handleChange={this.props.handleChange}
          />

          <Checkbox
            id="5"
            title="Giải trí cùng ABO"
            name="abo"
            checked={this.props.categories.abo}
            handleChange={this.props.handleChange}
          />

          <Checkbox
            id="6"
            title="Gương hiến máu tiêu biểu"
            name="typicalDonor"
            checked={this.props.categories.typicalDonor}
            handleChange={this.props.handleChange}
          />
        </div>

        {/* <NewsList
          news={filteredNews.length === 0 ? this.state.news : filteredNews}
        /> */}
      </div>
    );
  }
}
