import React, { useState } from "react";
import "antd/dist/antd.min.css";
import axios from "axios";

import { Upload, Progress, Form } from "antd";
import ImgCrop from "antd-img-crop";

const PostImage = ({ campaignImg, callback }) => {
  // const [defaultFile, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [linkList, setLinkList] = useState("");

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    fmData.append("file", file);
    fmData.append("upload_preset", "news-img");
    fmData.append("cloud_name", "blooddonor");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/blooddonor/image/upload",
        fmData
      );

      onSuccess("Ok");
      setLinkList(linkList + res.data.url);
      callback(res.data.url);
    } catch (err) {
      const error = new Error("Some error");
      onError({ err });
    }
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const [fileList, setFileList] = useState([
    {
      url: campaignImg ,
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <Form.Item
      label="Hình ảnh cho chiến dịch"
      name="images"
      getValueFromEvent={normFile}
    >
      <ImgCrop rotate>
        <Upload
        accept="image/*"
        customRequest={uploadImage}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
        >
          {fileList.length < 1 && "+ Đăng tải"}
        </Upload>
      </ImgCrop>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </Form.Item>
  );
};

export default PostImage;
