import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import "antd/dist/antd.min.css";
import './SendQuestionForm.css';

const { TextArea } = Input;

const SendQuestionForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Câu hỏi cho Trung tâm hiến 
      máu nhân đạo"
      className="send-ques-modal"
      okText="Gửi"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="send-question-form"

      >
        <Form.Item
          name="questionTitle"
          label="Ghi vắn tắt câu hỏi"
          rules={[
            {
              required: true,
              message: 'Hãy ghi vắn tắt câu hỏi trước khi gửi!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Mô tả chi tiết cho câu hỏi"

        >
          <TextArea showCount maxLength={100} />
        </Form.Item>

      </Form>
    </Modal>
  );
};

const SendQuestion = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div className='senqna'>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Gửi câu hỏi
      </Button>
      <SendQuestionForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default SendQuestion;
