import React, { Component } from 'react'
import Navigation from './Navigation/Navigation'
import ScrollingText from './ScrollingText/ScrollingText'
import NewsContainer from './News/NewsContainer'
export default class BloodDonorApp extends Component {
  render() {
    return (
      <div>

<Navigation/>
    <ScrollingText/>
    <NewsContainer></NewsContainer>
      </div>
    )
  }
}
