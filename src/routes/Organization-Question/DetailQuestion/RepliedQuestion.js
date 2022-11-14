import React from "react";
import "antd/dist/antd.min.css";
import "./RepliedQuestion.css";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OrBread } from "../../Organization-Profile/organization-breadcrumb";



export default function DetailQuestion() {
  

    const location = useLocation();
  console.log("location answer:", location)

  //nhận state từ navigation
  const question = location.state.question;
  const answer = location.state.answer;
  const previous = location.state?.previous;
  const campaignId = location.state?.campaignId;

    const breadName = <>
        <Link to={previous !== undefined ? `/organization/manageQuestion/campaignQuestion/${campaignId}` : '/organization/manageQuestion'}>
            <ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} />
        </Link>Chi tiết câu hỏi
    </>
    const layer1 = <Link to="/organization/manageQuestion">Quản lý hỏi đáp</Link>
    // const layer1 = <div onClick={() => navigate(-1)}>Quản lý hỏi đáp</div>
    return (
        <>

            <div id="replied-container">
                <div className="replied-header">
                    <div><OrBread layer1={layer1} layer2="Chi tiết câu hỏi" name={breadName} /></div>
                </div>

                <div className="replied-body">
                    <h2>Trả lời câu hỏi</h2>
                    <p className="replied-title" style={{ fontWeight: "600", margin: "30px 0 15px 0 " }}>Câu hỏi</p>
                    <p className="replied-content">{question}</p>

                    <p style={{ fontWeight: "600", margin: "30px 0 15px 0 " }}>Câu trả lời:</p>
                    <p className="replied-answer-content">{answer ==="REFUSED" ? "Câu hỏi đã bị từ chối trả lời":answer}</p>


                </div>
            </div>
        </>
    )
}