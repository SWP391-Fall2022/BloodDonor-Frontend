import React, { Component } from 'react'
import { Navbar } from '../../components/NavBar/navbar'
import NewsContainer from './NewsContainer/NewsContainer'
import { Footer } from '../../components/Footer/Footer';

export default class ListNewsPage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <NewsContainer></NewsContainer>
        <Footer/>
      </div>
    )
  }
}
