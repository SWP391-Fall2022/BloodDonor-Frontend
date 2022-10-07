import React, { Component } from 'react'
import { Navbar } from '../../components/NavBar/navbar';
import NewsDetail from './NewsContainer/NewsDetail'
import packageInfo from "../../shared/ListOfNews.json";
import NewsList from './NewsContainer/NewsList'
import './NewsDetailPageStyle.css'
// import { PageFooter } from '../components/Footer/PageFooter';


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
                {/* <PageFooter /> */}
            </div>
        )
    }
}
