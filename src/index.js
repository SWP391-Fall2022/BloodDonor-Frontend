import React from 'react';
import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import Campaign from "./routes/campaign";
import News from "./routes/news";
import Achivement from "./routes/achivement";
import NoPage from "./routes/nopage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="campaign" element={<Campaign />} />
        <Route path="news" element={<News />} />
        <Route path="achivement" element={<Achivement />} />
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
