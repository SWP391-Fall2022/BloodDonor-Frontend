import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
import axios from 'axios';

import { Upload, Progress, Form } from 'antd';

const PostImage = ({campaignImg,callback}) => {
  // const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [linkList, setLinkList] = useState('');

  const uploadImage = async (options) => {
    const { onSuccess, onError, file} = options;

    const fmData = new FormData();

    fmData.append('file', file);
    fmData.append('upload_preset', 'news-img');
    fmData.append('cloud_name', 'blooddonor');
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/blooddonor/image/upload',
        fmData
      );

      onSuccess('Ok');
      setLinkList( res.data.url);
      console.log(res.data.url)
      callback(res.data.url);
    } catch (err) {
      // console.log('Error: ', err);
      const error = new Error('Some error');
      onError({ err });
    }
  };

  const normFile = (e) => {
    console.log("e",e)

    return linkList;
  };



  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Form.Item
      label="Hình ảnh cho chiến dịch"
      name="images"
      getValueFromEvent={normFile}

    >
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        listType="picture-card"
        className="image-upload-grid"
        onChange={onChange}

      >
        {fileList.length < 1 && '+ Upload'}

      </Upload>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </Form.Item>
  );
};

export default PostImage
