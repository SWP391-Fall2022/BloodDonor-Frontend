import React from 'react'
import ListNewsPage from './routes/ListNewsPage';
import NewsDetailPage from './components/NewsDetailPage'
import './App.css';
import 'antd/dist/antd.css';



export default function App() {
  return (
   <div className="App" >
    <ListNewsPage/>
    <NewsDetailPage></NewsDetailPage>
   
   </div>
  );
}
