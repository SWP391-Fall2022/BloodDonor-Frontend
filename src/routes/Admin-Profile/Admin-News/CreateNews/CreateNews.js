import { Button, Form, Input, Modal, notification, Select } from "antd";
import "./createnews.css";
import { Option } from "antd/lib/mentions";
import { useContext, useState } from "react";
import React from "react";
import Editor from "../Editor/Editor";
import { CreateNewsContext } from "./AdminCreateNewsContext";
import PostImage from "../PostImage/PostImage";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AdBread } from "../../AdminBreadcrumbs";

const CreateNews = () => {
  const category = [
    "",
    "Hoạt động sự kiện",
    "Câu chuyện người hiến máu",
    "Câu chuyện người bệnh",
    "Nhóm máu và sức khỏe",
    "Giải trí cùng ABO",
    "Gương hiến máu tiêu biểu",
  ];
  const { valueCreateNews, setCreateNews, setPage } = useContext(CreateNewsContext);
  const [campaignImg, setCampaignImg] = useState(valueCreateNews.images);
  const [flag, setFlag] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueContent, setValueContent] = useState(valueCreateNews.content);
  const navigate = useNavigate()
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
    const response = await fetch("http://localhost:8080/v1/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': "Bearer " + token, },
      body: JSON.stringify(valueCreateNews),
    })
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    if (response.status === 200) {
      notification.success({
        message: 'Tạo tin tức thành công',
        placement: 'top'
      })
      navigate("/admin/news")
    }
  };
  const normFile = (e) => {
    setValueContent(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePreview = () => {
    setFlag(1);
  };
  const handleSubmit = () => {
    setFlag(0);
  };
  const onFinish = (values) => {
    values.images = campaignImg;
    values.content = valueContent;
    setCreateNews({
      ...valueCreateNews,
      ...values,
    });
    if (flag == 1) {
      setPage(1);
    } else {
      showModal();
    }
  };
  const validateMessages = {
    required: "Bạn đang để trống ${label}",
  };
  function callbackImageFunction(campaignImg) {
    setCampaignImg(campaignImg);
  }
  const breadName = (
    <>
      <Link to="/admin/news">
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Tạo tin tức
    </>
  );
  const layer1 = <Link to="/admin/news">Quản lý tin tức</Link>;
  return (<>
    <div className="create-news-breadcrumb">
      <AdBread
        layer1={layer1}
        layer2="Tạo tin tức"
        name={breadName}
      />
    </div>
    <section id="create-news">
      <div className="news-form">
        <div className="news-form-title">TẠO TIN TỨC</div>
        <div className="news-form-input">
          <Form
            form={form}
            className="news-form-input"
            name="basic"
            validateMessages={validateMessages}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Tên tác giả"
              name="author"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={valueCreateNews.author}
            >
              <Input initialvalue={valueCreateNews.author} />
            </Form.Item>
            <Form.Item
              label="Tựa đề bài báo"
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={valueCreateNews.title}
            >
              <Input initialvalue={valueCreateNews.title} />
            </Form.Item>

            <Form.Item value={valueContent} name="content">
              <Editor updateContent={normFile} content={valueContent}></Editor>
            </Form.Item>
            <PostImage
              campaignImg={campaignImg}
              callback={callbackImageFunction}>
            </PostImage>

            <Form.Item
              name="category"
              label="Thể loại tin tức"
              initialValue={valueCreateNews.category}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                initialvalue={category[valueCreateNews.category]}
                placeholder="Bạn hãy chọn thể loại tin tức"
                allowClear
              >
                <Option value="1">{category[1]}</Option>
                <Option value="2">{category[2]}</Option>
                <Option value="3">{category[3]}</Option>
                <Option value="4">{category[4]}</Option>
                <Option value="5">{category[5]}</Option>
                <Option value="6">{category[6]}</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" onClick={handlePreview} style={{ marginRight: '5px' }}>
                Xem trước
              </Button>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Xác nhận
              </Button>
              <Modal
                open={isModalOpen}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Xem lại
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                    refresh="true"
                  >
                    Lưu
                  </Button>,
                ]}
              >
                <p>
                  Bạn có muốn kiểm tra lại thông tin trước khi đăng tin tức
                  không?
                </p>
              </Modal>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section></>
  );
};
export default CreateNews;
