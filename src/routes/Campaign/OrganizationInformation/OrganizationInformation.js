import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../../components/NavBar/navbar';
import { Footer } from '../../../components/Footer/Footer';
import './OrganizationInformation.css';
import { Breadcrumb, Card, List } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useState } from 'react';


const { Meta } = Card;
export default function OrganizationInformation() {
    const organizationId = useParams();
    const [selectedOrg, setSelectedOrg] = useState({
        avatar: "",
        introduction: ""
    });
    const [campaigns, setCampaigns] = useState();

    // get JWT for fetchs
    const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

    // fetch data function
    function readOneOrg() {
        const asyncFn = async () => {

            let json = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/organization/getInfo/${organizationId.id}`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            if (response.success) {

                setSelectedOrg(response.body)

            }

        }
        asyncFn();
    }

    //call etch API function
    useEffect(() => {
        readOneOrg();
    }, []
    )


    // fetch data function
    function getCampaignList() {
        const asyncFn = async () => {
            const token = JSON.parse(sessionStorage.getItem('JWT_Key'))

            let json = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': "Bearer " + token,

                })
            }
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/campaign/getAllActive`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            console.log(response)
            if (response.success) {

                setCampaigns(
                    response.body.map((cam) => (
                        cam.id === organizationId.id
                    )
                    )
                )

            }

        }
        asyncFn();
    }

    //call etch API function
    useEffect(() => {
        getCampaignList();
    }, []
    )

    const introduction = String(selectedOrg.introduction).split('????$???')


    return (
        <>
            <Navbar></Navbar>
            <div className='organization-container'>
                <div className='organization-left'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={'/campaign'}>Chi???n d???ch</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>TH??NG B??O</Breadcrumb.Item>
                        <Breadcrumb.Item>Th??ng tin t??? ch???c hi???n m??u</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='organization-left-title'>


                        <h2 className='organization-title' > TH??NG TIN T??? CH???C HI???N M??U</h2>

                        <div className='organization-left-avatar'>
                            <img src={selectedOrg.avatar} alt={selectedOrg.name} />
                        </div>

                        <h3 className='organization-name' >{selectedOrg.name}</h3>
                    </div>

                    <div className='informations'>
                        <p><strong>Gi???i thi???u chung</strong></p>
                        <p><strong>?????a ch???: </strong>{selectedOrg.addressDetails}</p>
                        <p><strong>??i???n tho???i:</strong> {selectedOrg.phone}</p>


                        <p className='intro'><strong>Ch???c n??ng v?? nhi???m v???</strong></p>
                        <p style={{wordWrap: "break-word"}}>{introduction[0]}</p>


                        <p className='intro'><strong>Ph???m vi ph???c v???</strong></p>
                        <p style={{wordWrap: "break-word"}}>{introduction[1]}</p>

                    </div>

                </div>
                


            </div>
            <Footer></Footer>

        </>
    )
}