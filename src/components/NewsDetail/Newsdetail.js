import React, { Component } from 'react'

import { Breadcrumb } from 'antd';

const NewsDetail = () => (
    <div className='newsDetail  shadowDP02'>
    <Breadcrumb>
      <Breadcrumb.Item>News</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Câu chuyện người bệnh</a> 
        {/* ten cateory */}
        
      </Breadcrumb.Item>
      
      <Breadcrumb.Item>Ước mơ đêm Trung thu của bệnh nhi ung thư máu</Breadcrumb.Item>
      {/* news title */}
    </Breadcrumb>
    <h2 className='title' >Ước mơ đêm Trung thu của bệnh nhi ung thư máu</h2>
    <div>Ngày đăng: 06-09-2022   | Tác giả: Thùy Trang </div>
    <div className='detail-img'>
        <img src='https://vienhuyethoc.vn/wp-content/uploads/2022/09/100000-01.png'></img>
    </div>

    <div className='content'>“Năm nay con vào lớp 1, nhưng vì bệnh ung thư máu mà con không thể đi dự lễ khai giảng đầu tiên như các bạn” – đó là chia sẻ của cô bé Trần Phạm Phương Nhi, 6 tuổi, bệnh nhi ung thư máu đang điều trị tại Viện Huyết học – Truyền máu Trung ương.Phương Nhi (tên thường gọi là Nhím) là một cô bé hoạt bát, thích nói thích cười. Ngay cả khi căn bệnh ung thư máu đeo bám từng ngày, con vẫn hồn nhiên và đầy tinh nghịch.

“Nhím rất tình cảm và mạnh mẽ, mỗi khi truyền hóa chất rất mệt nhưng con cũng không quấy khóc, chỉ cố gắng nằm yên, thi thoảng lại nói mấy câu cho mẹ yên tâm. Em của Nhím ở nhà đã gần 1 tuổi, ngày nào con cũng mong được về nhà chơi với em” – chị Phạm Thị Huyền, mẹ bé Phương Nhi chia sẻ.
</div>
    </div>
    
    
  );
  
  export default NewsDetail;
