import React, { Component } from 'react'
import { Navbar } from '../components/navbar'
import NewsContainer from '../components/News/NewsContainer'
import { PageFooter } from '../components/Footer/PageFooter';

export default class BloodDonorApp extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <NewsContainer></NewsContainer>
        <PageFooter/>
      </div>
    )
  }
}
