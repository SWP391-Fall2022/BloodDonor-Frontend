import React from 'react'
import { Navbar } from '../../components/NavBar/navbar';
import CampaignContainer from './CampaignList/CampaignContainer';
import {Footer} from '../../components/Footer/Footer'

const Campaign = () => {
    return <div>
          <Navbar />
        <CampaignContainer></CampaignContainer>
        <Footer></Footer>
    </div>
};

export default Campaign;

