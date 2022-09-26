import React, { Component } from 'react'
import { Navbar } from '../components/navbar'
import NewsContainer from '../components/News/NewsContainer'
export default class BloodDonorApp extends Component {
  render() {
    return (
      <div>

<Navbar/>
    
    <NewsContainer></NewsContainer>
      </div>
    )
  }
}
