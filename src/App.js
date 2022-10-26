import React from 'react';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './routes/Homepage/Homepage';
import Achievement from './routes/Achievement/Achievement';
import Login from "./routes/Login, Register/login";
import Register from "./routes/Login, Register/register";
import RegisterDonor from "./components/Register/RegisterDonor";
import RegisterPlace from "./components/Register/RegisterPlace";
import NewPass from "./routes/Login, Register/changePass";
import Forget from "./routes/Login, Register/restore";
import Otp from "./routes/Login, Register/otp"
import QnA from "./routes/QnA/QnA"
import Campaign from "./routes/Campaign/Campaign";
import CampaignDetailPage from "./routes/Campaign/CampaignDetailPage";
import OrganizationInformation from "./routes/Campaign/OrganizationInformation/OrganizationInformation";
import ListNewsPage from './routes/News/ListNewsPage';
import NewsDetailPage from './routes/News/NewsDetailPage';
import AuthRoutes from './components/ProtectedRoute/AuthRoutes';

import DonorProfile from './routes/Donor-Profile/donor-profile';
import { NoPage, NoPageOrganization } from "./others/nopage";
import Info from './routes/Donor-Profile/Basic Info/Info';
import ChangePassword from './routes/Donor-Profile/Change Password/changePassword';
import History from './routes/Donor-Profile/History Campaign/history';
import QnADonor from './routes/Donor-Profile/Q&A/QnADonor';
import Vouchers from './routes/Donor-Profile/Voucher Storage/Vouchers';

import OrganizationInfo from './routes/Organization-Profile/Basic Info/Info';
import OrganizationNotificationContainer from './routes/Organization-Profile/Emergency Notification/OrganizationNotificationContainer';
import OrganizationNotificationListContainer from './routes/Organization-Profile/Emergency Notification/List Of Notification/OrganizationNotificationListContainer';
import OrganizationCreateNotification from './routes/Organization-Profile/Emergency Notification/Create Notification/CreateNotification';
import OrganizationViewNotification from './routes/Organization-Profile/Emergency Notification/List Of Notification/OrganizationViewNotification';
import OrganizationReviewNotification from './routes/Organization-Profile/Emergency Notification/Create Notification/ReviewNotification';
import OrganizationProfile from './routes/Organization-Profile/organization-profile';
import OrganizationChangePassword from './routes/Organization-Profile/Change Password/changePassword';

import NoInternetConnection from './others/NoInternetConnection'

export default function App() {
  return (
    <NoInternetConnection>
      <BrowserRouter>
        <Routes>
          {/* Home page */}
          <Route exact strict path="/" element={<Homepage />} />
          <Route exact strict path="/news" element={<ListNewsPage />} />
          <Route exact strict path="/news/news-detail/:id" element={<NewsDetailPage />} />
          <Route exact strict path="/qna" element={<QnA />} />
          <Route exact strict path="/achievement" element={<Achievement />} />

          {/* Basic system */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/donor" element={<RegisterDonor />} />
          <Route path="/register/place" element={<RegisterPlace />} />

          <Route path="/auth" element={<AuthRoutes />} />
          <Route path="/new-password" element={<NewPass />} />
          <Route path="/restore" element={<Forget />} />
          <Route path="/otp" element={<Otp />} />

          <Route exact strict path="/campaign" element={<Campaign />} />
          <Route exact strict path="/campaign/campaign-detail/:id" element={<CampaignDetailPage />} />
          <Route exact strict path="/organization/:id" element={<OrganizationInformation />} />

          {/* Pages for logged in donor */}
          <Route path="/donor" element={<DonorProfile />} >
            <Route index element={<Info />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="history" element={<History />} />
            <Route path="qna" element={<QnADonor />} />
            <Route path="vouchers" element={<Vouchers />} />
          </Route>

          {/* Pages for logged in organization */}
          <Route path="/organization" element={<OrganizationProfile />} >
            {/* Change this component below to main page route */}
            <Route index element={<OrganizationInfo />} />
            {/* Notification Emergency Management */}
            <Route path="notification" element={<OrganizationNotificationContainer />}>
              <Route index element={<OrganizationNotificationListContainer />} />
              <Route path="create" element={<OrganizationCreateNotification />} />
              <Route path="create/preview" element={<OrganizationReviewNotification />} />
              <Route path="view" element={<OrganizationViewNotification />} />
              <Route path="*" element={<NoPageOrganization />} />
            </Route>
            <Route path="changePassword" element={<OrganizationChangePassword />} />
            <Route path="profile" element={<OrganizationInfo />} />
            <Route path="*" element={<NoPageOrganization />} />
          </Route>

          {/* Pages for admin */}

          {/* 404 error page */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </NoInternetConnection>
  );
}
