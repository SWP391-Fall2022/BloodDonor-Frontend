import React, { Component } from 'react'
import { Navbar } from '../components/navbar';
import NewsDetail from '../components/NewsDetail/Newsdetail'
import packageInfo from "../shared/data.json";
import NewsList from '../components/News/NewsList'
import '../styles/NewsDetailPageStyle.css'


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
                <Navbar />
                <div className='detail-container'>
                    <div className='detail'> <NewsDetail /></div>
                    <div className='other-news'>
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
