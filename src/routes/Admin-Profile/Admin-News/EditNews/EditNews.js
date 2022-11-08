import { AdBread } from "../../AdminBreadcrumbs";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./editnews.css"
import { Button, Form, Input, Modal, Select } from "antd";
import Editor from "../Editor/Editor";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import { useContext } from "react";
import { ViewNewsContext } from "../ViewNews/AdminViewNewsContext";
import PostImage from "../PostImage/PostImage";
export default function EditNews() {
  const breadName = (
    <>
      <Link to="/admin/edit_news">
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
        Chỉnh sửa tin tức
    </>
  );
  const layer1 = <Link to="/admin/news_list">Quản lý tin tức</Link>;
  const layer2 = <Link to="/admin/view_news" >Xem tin tức</Link>;
 
  const category = [
    "Chưa chọn thể loại",
    "Hoạt động sự kiện",
    "Câu chuyện người hiến máu",
    "Câu chuyện người bệnh",
    "Nhóm máu và sức khỏe",
    "Giải trí cùng ABO",
    "Gương hiến máu tiêu biểu",
  ];
  const { valueViewNews, setViewNews, setPage } =useContext(ViewNewsContext);
  const [campaignImg, setCampaignImg] = useState(valueViewNews.images);
  const [flag, setFlag] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueContent, setValueContent] = useState(valueViewNews.content);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    //Fetch save data
    // fetch("http://localhost:8080/v1/posts", { 
    //   method: "POST", 
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify(valueViewNews)  })
    //   .then((response) => response.json())
    //   .then((msg) => {
    //   })
    //   .catch((error) => {
    //   });
  };
  const normFile = (e) => {
    setValueContent(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOverview = () => {
    setFlag(1);
  };
  const handleSubmit = () => {
    setFlag(0);
  };
  const handleReturn = () => {
    setPage(0);
  }
  const onFinish = (values) => {
    values.images = campaignImg ;
    values.content = valueContent;
    setViewNews({
      ...valueViewNews,
      ...values,
    });
    if (flag == 1) {
      setPage(2);
    } else {
      showModal();
    }
  };
  function callbackImageFunction(campaignImg){
    setCampaignImg(campaignImg);
  }
  const validateMessages = {
    required: "Bạn đang để trống ${label}",
  };
  return (
    <>
      <div className="edit-news-breadcrumb">
        <AdBread
          layer1={layer1}
          layer2={layer2}
          layer3="Chỉnh sửa tin tức"
          name={breadName}
        />
      </div>
      <section id="edit-news">
      <div className="news-form">
        <div className="news-form-title">Chỉnh sửa tin tức</div>
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
              initialValue={valueViewNews.author}
            >
              <Input initialvalue={valueViewNews.author} />
            </Form.Item>
            <Form.Item
              label="Tựa đề bài báo"
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={valueViewNews.title}
            >
              <Input initialvalue={valueViewNews.title} />
            </Form.Item>
            <Form.Item
              value={valueContent}
              // getValueFromEvent={normFile}
              name="content"
            >
              <Editor updateContent={normFile} content={valueContent}></Editor>
            </Form.Item>

            <PostImage campaignImg={campaignImg} callback={callbackImageFunction}></PostImage>
            {console.log(valueViewNews.category)}
            <Form.Item
              name="category"
              label="Thể loại tin tức"
              initialValue={valueViewNews.category * 1}
              rules={[
                {
                  required: true,
                },
              ]}
            >
             {console.log(typeof( valueViewNews.category))}
              <Select defaultValue={category[valueViewNews.category]}
              placeholder="Bạn hãy chọn thể loại tin tức" allowClear>
                <Option value="1">{category[1]}</Option>
                <Option value="2">{category[2]}</Option>
                <Option value="3">{category[3]}</Option>
                <Option value="4">{category[4]}</Option>
                <Option value="5">{category[5]}</Option>
                <Option value="6">{category[6]}</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" onClick={handleOverview}>
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
    </section>
    </>
  );
}
