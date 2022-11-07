import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import 'antd/dist/antd.min.css';
import './SendQuestionForm.css';

const { TextArea } = Input;



const SendQuestion = (props) => {
  const [open, setOpen] = useState(false);

  const onCreate = (values) => {
    setOpen(false);
  };

  const [form] = Form.useForm();


  const SendQuestionForm = ({ open, onCreate, onCancel }) => {
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
         sendQuestion();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="send-question-form"
  
        >
         
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
  
  //fetch api send question to org

  const sendQuestion = async () => {
    const formData = form.getFieldsValue(true);

    const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
    const requestData = {
        "question": formData.content,
    
    }
    console.log("reques:", requestData)

    let json = {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': "Bearer " + token,
        })
    }
    const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/add/${props.campaignId}`, json)
        .then((res) => res.json())
        .catch((error) => { console.log(error) })
    console.log("response", response)
    if (response.success) {

      sendQuestionSuccess()
        console.log("sendQuestion response".response)

    }


};

//send question success
const sendQuestionSuccess = () => {
  // callback(!registered);
  Modal.success({
      content: 'Câu hỏi đã được gửi thành công.',
      okText: 'Đóng',
     onOk(){
      setOpen(false);

     }

  });
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
