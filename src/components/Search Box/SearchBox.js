import React, { Component } from 'react'
import { Input } from 'antd';
import './SearchBox.css'
const { Search } = Input;
const onSearch = (value) => console.log(value);
export default class SearchBox extends Component {
  render() {
    return (
      <div className='search-numRe'>
        <Search className='search' placeholder="Nhập tên bài báo mà bạn muốn tìm" onSearch={onSearch} enterButton ></Search>
        <p>Hiển thị X kết quả</p>
      </div>
       
    )
  }
}
