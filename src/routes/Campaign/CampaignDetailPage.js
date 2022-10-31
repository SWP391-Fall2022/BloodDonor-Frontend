import React from 'react'
import { Navbar } from '../../components/NavBar/navbar';
import './CampaignDetailPage.css'
import CampaignDetail from './CampaignDetail/CampaignDetail';
import { Footer } from '../../components/Footer/Footer';


const CampaignDetailPage = () => {
    return <div>
        <Navbar />
        <CampaignDetail></CampaignDetail>
        <Footer></Footer>
    </div>
};

export default CampaignDetailPage;