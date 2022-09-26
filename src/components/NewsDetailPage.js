import React, { Component } from 'react'
import Navigation from './Navigation/Navigation'
import NewsDetail from './NewsDetail/Newsdetail'
import ScrollingText from './ScrollingText/ScrollingText'
import packageInfo from "../shared/data.json";
import NewsList from './News/NewsList'
import NewsDetailPageStyle from './NewsDetailPageStyle.css'


export default class NewsDetailPage extends Component {
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

    render() {
        return (
            <div >

                <Navigation />
                <ScrollingText />
                <div  className='detail-container'>
                    <div className='detail'> <NewsDetail /></div>
                    <div className='other-news  shadowDP02 '>
                        <div className='other-news-title'>Báo khác</div>
                        <NewsList
                            news={this.state.news}
                            categories={this.state.categories}
                        ></NewsList>
                    </div>
                </div>




            </div>
        )
    }
}
