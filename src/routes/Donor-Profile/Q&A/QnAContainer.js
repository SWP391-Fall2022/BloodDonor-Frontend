import styles from '../donor.module.css'
import { Collapse } from 'antd';
import { useEffect, useRef, useState } from 'react';
import empty from '../../../assets/empty-list.png'
const { Panel } = Collapse;

export default function QnAContainer() {
    const [emptyList, setEmptyList] = useState(true);
    const [collapse, setCollapse] = useState(true);
    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === true) {
            async function fetchQaA() {
                const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
                let json = {
                    headers: new Headers({
                        'Authorization': "Bearer " + token,
                    })
                }
                const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/question/get-by-donor`, json)
                    .then((res) => res.json())
                    .catch((error) => { console.log(error) })
                // console.log(response)
                if (response.status === 200) {
                    if (response.body.length === 0) {
                        setEmptyList(true)
                    } else {
                        //Step 1: Get campaign id and name then remove duplicate
                        const campaignList = response.body.map(({ campaignId, campaignName }) => (
                            { campaignId, campaignName }
                        )).filter((v, i, a) => a.findIndex(v2 => (v2.campaignId === v.campaignId)) === i)
                        // console.log(campaignList)
                        //Step 2: Add to collapse
                        const list = campaignList.map((e) =>
                            <Collapse style={{ marginBottom: '15px' }} key={e.campaignId.toString()}>
                                <Panel
                                    className={styles.questionPanel}
                                    header={e.campaignName}
                                    key={e.campaignId.toString()}
                                >
                                    {response.body.map(v => {
                                        if (e.campaignId === v.campaignId) {
                                            return (
                                                <Collapse style={{ marginBottom: '15px' }} key={v.questionId.toString()}>
                                                    <Panel
                                                        className={styles.questionPanel}
                                                        header={v.question}
                                                        key={v.questionId.toString()}
                                                    >
                                                        <p>{v.answer === null ? "Rất tiếc, bạn vẫn chưa có hồi âm nào từ tổ chức ;(" : v.answer}</p>
                                                    </Panel>
                                                </Collapse>
                                            )
                                        }
                                    })}
                                </Panel>
                            </Collapse>
                        );
                        setCollapse(list)
                        setEmptyList(false)
                    }
                }
            }
            fetchQaA();
        }
        return () => {
            effectRan.current = true
        }
    }, [])

    if (!emptyList) {
        return (
            <div className={styles.infoContainer}>
                <div className={styles.title}>DANH SÁCH CÂU HỎI</div>
                {collapse}
            </div>
        )
    } else {
        return (
            <div className={styles.infoContainer}>
                <div style={{ textAlign: 'center' }}>
                    <div className={styles.title}>DANH SÁCH CÂU HỎI</div>
                    <img className={styles.img} src={empty} alt="empty" />
                    <div><strong>Bạn vẫn chưa có câu hỏi nào được giải đáp</strong></div>
                </div>
            </div >
        )
    }
}