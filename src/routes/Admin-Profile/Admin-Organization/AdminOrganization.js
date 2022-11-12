import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, notification, Table, Tabs } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { AdBread } from '../AdminBreadcrumbs'
import styles from '../admin.module.css';
import './AdminOrganization.css'


// check status of org to render on table
function checkOrgStatus(org) {
    if (org.approve === "APPROVED")
        return "Đã duyệt"
    else if (org.approve === "PENDING") {
        return "Chờ duyệt"
    }
    else
        return "Đã từ chối"

}

const columns = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },

    {
        title: 'Tên tổ chức hiến máu',
        dataIndex: 'orgName',
        key: 'orgName',

    },
    {
        title: 'Mã số thuế',
        dataIndex: 'taxNumber',
        key: 'taxNumber',

    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
];


export default function AdminManageOrganization() {
    const [tableRow, setTableRow] = useState([]);
    const [message, setMessage] = useState('')

    const navigate = useNavigate();
    const [organizations, setOrganizations] = useState({})

    // fetch data function
    function getOrgFromAPI() {
        const asyncFn = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/organization`)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            if (response.status === 200) {
                console.log("response", response)
                setOrganizations(response)
                setTableRow(
                    response.body.map(row => ({
                        orgName: row.name,
                        taxNumber: row.taxCode,
                        id: row.id,
                        email: row.email,
                        phone: row.phone,
                        status: checkOrgStatus(row)
                    })))
                console.log("camps", tableRow)
                // navigate("/organization/manageCampaign")

            }

        }
        asyncFn();
    }


    // call etch API function
    useEffect(() => {
        getOrgFromAPI();
    }, []
    )

    // SEARCH fnction
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(
            /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
            " "
        );
        return str;
    }
    const keys = ["orgName", "taxNumber", "email", "phone"];
    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) =>
                removeVietnameseTones(item[key])
                    .toLowerCase()
                    .includes(removeVietnameseTones(query.toLowerCase()))
            )
        );
    };
    const [query, setQuery] = useState("");

    const filterStatus = (data, keys) => {
        return data.filter((item) => item.status.includes(keys));
    };


    return (
        <>
            <div className={styles.breadcrumb}><AdBread name="Quản lý tổ chức hiến máu" /></div>

            <div className='ad-manage-org-container'>
                <h2 className="admin-manage-org-title">DANH SÁCH TỔNG HỢP CÁC TỔ CHỨC HIẾN MÁU</h2>
                <div className="admin-org-search-box">
                    <Input
                        className="admin-org-search-box"
                        suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                        id="admin-org-search-box"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Điền tên chiến dịch hoặc tổ chức bạn muốn tìm..."
                    />

                </div>

                <Tabs
                    className="admin-manage-org-content"
                    defaultActiveKey="1"
                    items={[
                        {
                            label: `Tất cả`,
                            key: '1',
                            children: <>


                                <Table columns={columns} dataSource={search(tableRow)}
                                    pagination={{
                                        pageSize: 5,
                                        position: ["bottomCenter"]

                                    }}
                                    scroll={{ x: "100wh" }}

                                    onRow={record => ({
                                        onClick: (e) => {
                                            if (record.status === `Chờ duyệt`) {
                                                navigate("/admin/manage_organization/approveOrganization", { state: { organizations: organizations, id: record.id, status: record.status } })
                                            } else {
                                                navigate("/admin/manage_organization/InfoOrganization", { state: { organizations: organizations, id: record.id, status: record.status } })
                                            }
                                        }

                                    })}
                                />

                            </>,
                        },

                        {
                            label: `Đã duyệt`,
                            key: '2',
                            children: <>


                                <Table columns={columns}
                                    dataSource={filterStatus(search(tableRow), 'Đã duyệt')}
                                    pagination={{
                                        pageSize: 5,
                                        position: ["bottomCenter"]
                                    }}
                                    scroll={{ x: "100wh" }}

                                    onRow={record => ({
                                        onClick: (e) => {

                                            navigate("/admin/manage_organization/InfoOrganization", { state: { organizations: organizations, id: record.id, status: record.status } })

                                        }

                                    })}
                                />

                            </>,
                        },
                        {
                            label: `Chờ duyệt`,
                            key: '3',
                            children: <>


                                <Table columns={columns} dataSource={filterStatus(search(tableRow), 'Chờ duyệt')}
                                    pagination={{
                                        pageSize: 5,
                                        position: ["bottomCenter"]
                                    }}
                                    scroll={{ x: "100wh" }}


                                    onRow={record => ({
                                        onClick: (e) => {

                                            navigate("/admin/manage_organization/approveOrganization", { state: { organizations: organizations, id: record.id, status: record.status } })

                                        }

                                    })}

                                />

                            </>,
                        },
                        {
                            label: `Đã từ chối`,
                            key: '4',
                            children: <>


                                <Table columns={columns} dataSource={filterStatus(search(tableRow), 'Đã từ chối')}
                                    pagination={{
                                        pageSize: 5,
                                        position: ["bottomCenter"]
                                    }}
                                    scroll={{ x: "100wh" }}


                                    onRow={record => ({
                                        onClick: (e) => {

                                            navigate("/admin/manage_organization/InfoOrganization", { state: { organizations: organizations, id: record.id, status: record.status } })

                                        }

                                    })}

                                />

                            </>,
                        }
                    ]}
                />
            </div>
        </>
    )
}