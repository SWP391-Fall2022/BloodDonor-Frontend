import React from 'react';
import { Collapse, List } from 'antd';
import './QaA.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CampaignDetail(campaignId) {

    console.log(campaignId.campaignId)
    //panel for q&a
    const { Panel } = Collapse;

    const [questions, setQuestions] = useState();

    // fetch data function
    function getQuestion() {
        const asyncFn = async () => {

            let json = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/get-by-campaign/${parseInt(campaignId.campaignId)}`, json)
                .then((res) => res.json())
                .catch((error) => { console.log("readOneFunction error", error) })
            console.log(response)
            if (response.success) {
                setQuestions(response.body.filter((obj)=> obj.status === true && obj.answer !== 'REFUSED' && obj.answer !== ''))
            }

        }
        asyncFn();
    }


    //call etch API function
    useEffect(() => {
        getQuestion();
    }, [campaignId.campaignId]
    )


    return (
        <>

            <section className="campaignDetail-q-and-a">
                <h3>Q&A</h3>
                <List
                    itemLayout="horizontal"
                    dataSource={questions !== undefined ? questions.filter((_, index) => index < 8) : questions}
                    renderItem= {item => (

                        <Collapse className="campaignDetail-q-and-a-container">
                            <Panel header={item.question} className="campaignDetail-q-and-a-card">
                                {item.answer}
                            </Panel>
                        </Collapse>

                    )}
                />
            </section>
        </>
    )
}