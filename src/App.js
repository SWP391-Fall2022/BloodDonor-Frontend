import React, { createContext } from "react";
import "antd/dist/antd.min.css";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./routes/Homepage/Homepage";
import Achievement from "./routes/Achievement/Achievement";
import Login from "./routes/Login, Register/login";
import Register from "./routes/Login, Register/register";
import RegisterDonor from "./components/Register/RegisterDonor";
import RegisterPlace from "./components/Register/RegisterPlace";
import NewPass from "./routes/Login, Register/changePass";
import Forget from "./routes/Login, Register/restore";
import Otp from "./routes/Login, Register/otp";
import QnA from "./routes/QnA/QnA";
import Campaign from "./routes/Campaign/Campaign";
import CampaignDetailPage from "./routes/Campaign/CampaignDetailPage";
import OrganizationInformation from "./routes/Campaign/OrganizationInformation/OrganizationInformation";
import ListNewsPage from "./routes/News/ListNewsPage";
import NewsDetailPage from "./routes/News/NewsDetailPage";
import AuthRoutes from "./components/ProtectedRoute/AuthRoutes";

import DonorProfile from "./routes/Donor-Profile/donor-profile";
import { NoPage, NoPageOrganization } from "./others/nopage";
import Info from "./routes/Donor-Profile/Basic Info/Info";
import ChangePassword from "./routes/Donor-Profile/Change Password/changePassword";
import History from "./routes/Donor-Profile/History Campaign/history";
import QnADonor from "./routes/Donor-Profile/Q&A/QnADonor";
import Vouchers from "./routes/Donor-Profile/Voucher Storage/Vouchers";

import OrganizationInfo from "./routes/Organization-Profile/Basic Info/Info";
import OrganizationNotificationContainer from "./routes/Organization-Profile/Emergency Notification/OrganizationNotificationContainer";
import OrganizationNotificationListContainer from "./routes/Organization-Profile/Emergency Notification/List Of Notification/OrganizationNotificationListContainer";
import OrganizationCreateNotification from "./routes/Organization-Profile/Emergency Notification/Create Notification/CreateNotification";
import OrganizationViewNotification from "./routes/Organization-Profile/Emergency Notification/List Of Notification/OrganizationViewNotification";
import OrganizationReviewNotification from "./routes/Organization-Profile/Emergency Notification/Create Notification/ReviewNotification";
import OrganizationProfile from "./routes/Organization-Profile/organization-profile";
import OrganizationChangePassword from "./routes/Organization-Profile/Change Password/changePassword";
import OrganizationHomepage from "./routes/Organization-Homepage/OrganizationHomepage";
import OrganizationCampaignDonorList from "./routes/Organization-Campaign-Donor/OrganizationCampaignDonorList";
import OrganizationCampaignHealthInf from "./routes/Organization-Campaign-Donor/HealthInformation/OrganizationCampaignHealthInf";


// org campaign management
import OrganizationCampign from './routes/Organization-Campaign/OrganizationCampaign';
import OrganizationManageCampaign from './routes/Organization-Campaign/ManageCampaign/ManageCampaign';
import OrganizationCreateCampaign from './routes/Organization-Campaign/CreateCampaign/CreateCampaign';
import OrganizationUpdateCampaign from './routes/Organization-Campaign/UpdateCampaign/UpdateCampaignForm';
import OrganizationDetailCampaign from './routes/Organization-Campaign/CreateCampaign/DetailCampaign/DetailCampaign';
import OrganizationPreviewCampaign from './routes/Organization-Campaign/CreateCampaign/PreView/Preview';

// org question management
import OrganizationQuestion from './routes/Organization-Question/OrganizationQuestion';
import OrganizationManageQuestion from './routes/Organization-Question/ManageQuestion/ManageQuestion';
import OrganizationCampaignQuestion from './routes/Organization-Question/CampaignQuestion/CampaignQuestion';
import OrganizationUnRepliedQuestion from './routes/Organization-Question/DetailQuestion/UnReplied';
import OrganizationRepliedQuestion from './routes/Organization-Question/DetailQuestion/RepliedQuestion';

//Admin routes
import AdminProfile from './routes/Admin-Profile/adminContainer';
import AdminManageCampaign from './routes/Admin-Profile/Admin-Campaign/AdminCampaign'
import AdminDetailCampaign from './routes/Admin-Profile/Admin-Campaign/DetailCampaign/AdminDetailCampaign'
import AdminManageDonor from './routes/Admin-Profile/Admin-Donor/AdminDonor';
import AdminManageOrganization from './routes/Admin-Profile/Admin-Organization/AdminOrganization';
import AdminApproveOrganization from './routes/Admin-Profile/Admin-Organization/Approve-Organization/ApproveOrganization';
import AdminInfoOrganization from './routes/Admin-Profile/Admin-Organization/Info-Oranization/InfoOrganization';
import AdminManageVouchers from './routes/Admin-Profile/Admin-Voucher/AdminVoucher'

import NoInternetConnection from "./others/NoInternetConnection";
import OrganizationGuide from "./routes/Organization-Profile/Organization-Guide/organizationGuide";
import OrganizationCampaignStatistical from "./routes/Organization-Campaign-Statistical/OrganizationCampaignStatistical";
import AdminNewsList from "./routes/Admin-Profile/Admin-News/NewsList/AdminNewsList";
import AdminCreateNews from "./routes/Admin-Profile/Admin-News/CreateNews/AdminCreateNews";
import PreviewNews from "./routes/Admin-Profile/Admin-News/PreviewNews/PreviewNews";
import EditNews from "./routes/Admin-Profile/Admin-News/EditNews/EditNews";
import AdminCreateVoucher from './routes/Admin-Profile/Admin-Voucher/AdminCreateVoucher';
import OverViewNews from "./routes/Admin-Profile/Admin-News/OverviewNews/OverViewNews";

import { UserProvider } from './others/UserRoleContext';

export default function App() {
  return (
    <NoInternetConnection>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* Home page */}
            <Route exact strict path="/" element={<Homepage />} />
            <Route exact strict path="/news" element={<ListNewsPage />} />
            <Route
              exact
              strict
              path="/news/news-detail/:id"
              element={<NewsDetailPage />}
            />
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
            <Route
              exact strict path="/campaign/campaign-detail/:id" element={<CampaignDetailPage />}
            />
            {/* <Route
            exact strict path="/organization/:id" element={<OrganizationInformation />}
          /> */}

            <Route
              exact strict path="/organization-homepage" element={<OrganizationHomepage />}
            />
            <Route
              exact strict path="/organization-campaign-donorlist/0" element={<OrganizationCampaignDonorList />}
            />
            <Route
              exact strict path="/organization-campaign-health-inf" element={<OrganizationCampaignHealthInf />}
            />
            <Route
              exact strict path="/statistical" element={<OrganizationCampaignStatistical />}
            />
            <Route exact strict path="/test" element={<AdminNewsList />} />

            {/* Pages for logged in donor */}
            <Route path="/donor" element={<DonorProfile />}>
              <Route index element={<Info />} />
              <Route path="changePassword" element={<ChangePassword />} />
              <Route path="history" element={<History />} />
              <Route path="qna" element={<QnADonor />} />
              <Route path="vouchers" element={<Vouchers />} />
            </Route>

            {/* Pages for logged in organization */}
            <Route path="/organization" element={<OrganizationProfile />}>
              {/* Home Page */}
              <Route index element={<OrganizationHomepage />} />
              {/* Notification Emergency Management */}
              <Route
                path="notification"
                element={<OrganizationNotificationContainer />}
              >
                <Route
                  index
                  element={<OrganizationNotificationListContainer />}
                />
                <Route
                  path="create"
                  element={<OrganizationCreateNotification />}
                />
                <Route
                  path="create/preview"
                  element={<OrganizationReviewNotification />}
                />
                <Route path="view" element={<OrganizationViewNotification />} />
                <Route path="*" element={<NoPageOrganization />} />
              </Route>
              {/* Manage Campaign */}
              <Route path="manageCampaign" element={<OrganizationCampign />}>
                <Route index element={<OrganizationManageCampaign />} />
                <Route path="createCampaign" element={<OrganizationCreateCampaign />} />
                <Route path="updateCampaign/:id" element={<OrganizationUpdateCampaign />} />
                <Route path="detailCampaign" element={<OrganizationDetailCampaign />} />
                <Route path="preview" element={<OrganizationPreviewCampaign />} />
              </Route>

              {/* Manage Question */}
              <Route path="manageQuestion" element={<OrganizationQuestion />}>
                <Route index element={<OrganizationManageQuestion />} />
                <Route path="campaignQuestion/:id" element={<OrganizationCampaignQuestion />} />
                <Route path="unReplyQuestion" element={<OrganizationUnRepliedQuestion />} />
                <Route path="repliedQuestion" element={<OrganizationRepliedQuestion />} />
              </Route>
              <Route path="manageGuide" element={<OrganizationGuide />} />
              <Route
                path="changePassword"
                element={<OrganizationChangePassword />}
              />
              <Route path="profile" element={<OrganizationInfo />} />
              <Route path="*" element={<NoPageOrganization />} />
            </Route>

            {/* Pages for admin */}
            <Route path="/admin" element={<AdminProfile />}>
              <Route index element={<AdminManageCampaign />} />
              <Route path="manage_campaign" element={<AdminManageCampaign />} />
              <Route path="manage_campaign/detail_campaign" element={<AdminDetailCampaign />} />
              <Route path="manage_donor" element={<AdminManageDonor />} />
              <Route path="manage_organization" element={<AdminManageOrganization />} />
              <Route path="manage_organization/approveOrganization" element={<AdminApproveOrganization />} />
              <Route path="manage_organization/infoOrganization" element={<AdminInfoOrganization />} />
              <Route path="news" element={<AdminNewsList />} />
              <Route path="create_news" element={<AdminCreateNews />} />
              <Route path="manage_vouchers" element={<AdminManageVouchers />} />
              <Route path="manage_vouchers/create" element={<AdminCreateVoucher />} />
            </Route>

            {/* 404 error page */}
            <Route path="/404" element={<NoPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </NoInternetConnection>
  );
}
