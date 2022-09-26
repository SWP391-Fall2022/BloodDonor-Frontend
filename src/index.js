import React from 'react';
import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import Register from "./routes/register";
import RegisterDonor from "./routes/register-volunteer";
import RegisterPlace from "./routes/register-place";
import NewPass from "./routes/changePass";
import Forget from "./routes/restore";
import Campaign from "./routes/campaign";
import ListNewsPage from './routes/ListNewsPage';
import Achivement from "./routes/achivement";
import NoPage from "./routes/nopage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact strict path="/" element={<Home />} />
        <Route exact strict path="/login" element={<Login />} />
        <Route exact strict path="/register" element={<Register />} />
        <Route exact strict path="/register/donor-volunteer" element={<RegisterDonor />} />
        <Route exact strict path="/register/donor-place" element={<RegisterPlace />} />
        <Route exact strict path="/new-password" element={<NewPass />} />
        <Route exact strict path="/restore" element={<Forget />} />
        <Route exact strict path="/campaign" element={<Campaign />} />
        <Route exact strict path="/news" element={<ListNewsPage />} />
        <Route exact strict path="/achivement" element={<Achivement />} />
        <Route exact strict path="*" element={<NoPage />} />
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
