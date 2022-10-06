import React from 'react';
import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './routes/Homepage/Homepage';
import Achievements from './routes/Homepage/Achievements/Achievement';
import Login from "./routes/login";
import Register from "./routes/register";
import RegisterDonor from "./components/Register/RegisterDonor";
import RegisterPlace from "./components/Register/RegisterPlace";
// import NewPass from "./routes/changePass";
// import Forget from "./routes/restore";
import Otp from "./routes/otp";
// import Campaign from "./routes/campaign";
// import ListNewsPage from './routes/ListNewsPage';
// import NewsDetailPage from './routes/NewsDetailPage';
// import Achivement from "./routes/achivement";
import AuthRoutes from './components/ProtectedRoute/AuthRoutes';

// import DonorProfile from './routes/donor-progile';
import NoPage from "./routes/nopage";
// import Info from './components/Donor-Profile/Basic Info/Info';
// import ChangeEmail from './components/Donor-Profile/Change Email/changeEmail';
// import ChangePassword from './components/Donor-Profile/Change Password/changePassword';
// import ChangePhone from './components/Donor-Profile/Change Phone/changePhone';
// import History from './components/Donor-Profile/History Campaign/history';
// import QnA from './components/Donor-Profile/Q&A/QnA';
// import Vouchers from './components/Donor-Profile/Voucher Storage/Vouchers';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact strict path="/" element={<Homepage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/donor" element={<RegisterDonor />} />
        <Route path="/register/place" element={<RegisterPlace />} />

        <Route path="/auth" element={<AuthRoutes />} />
        {/* <Route path="/new-password" element={<NewPass />} /> */}
        {/* <Route path="/restore" element={<Forget />} /> */}
        <Route path="/otp" element={<Otp />} />

        {/* <Route exact strict path="/campaign" element={<Campaign />} /> */}
        {/* <Route exact strict path="/news" element={<ListNewsPage />} /> */}
        {/* <Route exact strict path="/news/news-detail" element={<NewsDetailPage />} /> */}
        <Route exact strict path="/achivement" element={<Achievements />} />

        {/* <Route path="/donor" element={<DonorProfile />} > */}
        {/* <Route index element={<Info />} /> */}
        {/* <Route path="changeEmail" element={<ChangeEmail />} /> */}
        {/* <Route path="changePassword" element={<ChangePassword />} /> */}
        {/* <Route path="changePhone" element={<ChangePhone />} /> */}
        {/* <Route path="history" element={<History />} /> */}
        {/* <Route path="qna" element={<QnA />} /> */}
        {/* <Route path="vouchers" element={<Vouchers />} /> */}
        {/* </Route> */}
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