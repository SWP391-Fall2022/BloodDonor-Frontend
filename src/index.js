import React from 'react';
import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './routes/Homepage/Homepage';
import Achievements from './routes/Homepage/Achievements/Achievement';
import Login from "./routes/Login, Register/login";
import Register from "./routes/Login, Register/register";
import RegisterDonor from "./components/Register/RegisterDonor";
import RegisterPlace from "./components/Register/RegisterPlace";
import NewPass from "./routes/Login, Register/changePass";
import Forget from "./routes/Login, Register/restore";
import Otp from "./routes/Login, Register/otp"
import QnA from "./routes/QAndA/QnA"
// import Campaign from "./routes/campaign";
import ListNewsPage from './routes/News/ListNewsPage';
import NewsDetailPage from './routes/News/NewsDetailPage';
// import Achivement from "./routes/achivement";
import AuthRoutes from './components/ProtectedRoute/AuthRoutes';

import DonorProfile from './routes/Donor-Profile/donor-profile';
import NoPage from "./routes/nopage";
import Info from './routes/Donor-Profile/Basic Info/Info';
import ChangePassword from './routes/Donor-Profile/Change Password/changePassword';
import History from './routes/Donor-Profile/History Campaign/history';
import QnADonor from './routes/Donor-Profile/Q&A/QnADonor';
import Vouchers from './routes/Donor-Profile/Voucher Storage/Vouchers';

import OrganizationProfile from './routes/Organization-Profile/organization-profile';
import OrganizationChangePassword from './routes/Organization-Profile/Change Password/changePassword';
import OrganizationInfo from './routes/Organization-Profile/Basic Info/Info';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route exact strict path="/" element={<Homepage />} />
        <Route exact strict path="/news" element={<ListNewsPage />} />
        <Route exact strict path="/news/news-detail/:id" element={<NewsDetailPage />} />
        <Route exact strict path="/qna" element={<QnA />} />
        {/* <Route exact strict path="/campaign" element={<Campaign />} /> */}
        {/* <Route exact strict path="/campaign" element={<Campaign />} /> */}
        <Route exact strict path="/achivement" element={<Achievements />} />

        {/* Basic system */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/donor" element={<RegisterDonor />} />
        <Route path="/register/place" element={<RegisterPlace />} />

        <Route path="/auth" element={<AuthRoutes />} />
        <Route path="/new-password" element={<NewPass />} />
        <Route path="/restore" element={<Forget />} />
        <Route path="/otp" element={<Otp />} />

        {/* Pages for donor */}
        <Route path="/donor" element={<DonorProfile />} >
          <Route index element={<Info />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="history" element={<History />} />
          <Route path="qna" element={<QnADonor />} />
          <Route path="vouchers" element={<Vouchers />} />
        </Route>

        {/* Pages for organization */}
        <Route path="/organization" element={<OrganizationProfile />} >
          <Route index element={<OrganizationInfo />} />
          <Route path="changePassword" element={<OrganizationChangePassword />} />

        </Route>

        {/* Pages for admin */}

        {/* 404 error page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals