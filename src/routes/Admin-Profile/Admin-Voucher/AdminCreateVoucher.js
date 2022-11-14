import { ArrowLeftOutlined } from "@ant-design/icons"
import styles from '../../Admin-Profile/admin.module.css'
import stylesVoucher from '../Admin-Voucher/adminVoucherList.module.css'
import { AdBread } from '../AdminBreadcrumbs'
import { Link, useNavigate } from "react-router-dom"
import { Button, DatePicker, Form, Input, notification } from "antd"
import TextArea from "antd/lib/input/TextArea";

export default function AdminCreateVoucher() {
    //Breadcrumb props
    const breadName = <><Link to="/admin/manage_vouchers"><ArrowLeftOutlined style={{ marginRight: '2%', color: 'black' }} /></Link>Tạo voucher</>
    const layer1 = <Link to="/admin/manage_vouchers">Quản lý voucher</Link>

    //Others define
    const [form] = Form.useForm();
    const navigate = useNavigate();

    //Submit Button
    const onFinish = async () => {
        const formData = form.getFieldsValue(true)
        // console.log(formData)
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36));
        }
        //Still need to handle duplicate with existed voucher's code, but that's usually rare

        const requestData = {
            "expiredDate": formData.expiredDate.format("YYYY-MM-DD"),
            "level": formData.level,
            "sponsor": formData.sponsor,
            "code": code,
            "status": true,
            "details": formData.details,
            "amount": formData.amount
        }
        // console.log(requestData)
        let json = {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/rewards`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        // console.log(response)
        if (response.status === 200) {
            notification.success({
                message: 'Tạo voucher thành công',
                placement: "top"
            });
            navigate("/admin/manage_vouchers")
        }
    }

    return (
        <>
            <div className={styles.breadcrumb}><AdBread layer1={layer1} layer2="Tạo voucher" name={breadName} /></div>
            <div className={styles.mainContainer}>
                <div className={stylesVoucher.voucherContainer} style={{ marginTop: '2rem' }}>
                    <h1 style={{ textAlign: 'center', padding: '2%' }}><strong>TẠO VOUCHER</strong></h1>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item className={stylesVoucher.formLabel} label="Mô tả voucher" name="details">
                            <TextArea rows={2} allowClear showCount maxLength={100} />
                        </Form.Item>
                        <Form.Item className={stylesVoucher.formLabel} label="Hạn của voucher" name="expiredDate" rules={[{ required: true, message: 'Vui lòng chọn' }]}>
                            <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày" />
                        </Form.Item>
                        <Form.Item className={stylesVoucher.formLabel}>
                            <Form.Item label="Công ty tài trợ" name="sponsor" rules={[{ required: true, message: 'Vui lòng nhập công ty' },
                            {
                                validator: (rule, value, callback) => {
                                    if (value.trim().length === 0) {
                                        callback('Không được phép nhập dữ liệu chỉ có dấu cách')
                                    } else {
                                        callback()
                                    }
                                }
                            }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', }}>
                                <Input placeholder="Nhập công ty" />
                            </Form.Item>
                            <Form.Item label="Số điểm quy đổi" name="level" rules={[{ required: true, message: 'Vui lòng nhập số điểm' },
                            {
                                validator: (rule, value, callback) => {
                                    if (value.trim().length === 0) {
                                        callback('Không được phép nhập dữ liệu chỉ có dấu cách')
                                    } else {
                                        callback()
                                    }
                                }
                            }]} style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', }}>
                                <Input placeholder="Nhập số điểm" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item className={stylesVoucher.formLabel} label="Số lượng voucher" name="amount" rules={[{ required: true, message: 'Vui lòng nhập số lượng' },
                        {
                            validator: (rule, value, callback) => {
                                if (value.trim().length === 0) {
                                    callback('Không được phép nhập dữ liệu chỉ có dấu cách')
                                } else {
                                    callback()
                                }
                            }
                        }]}>
                            <Input placeholder="Nhập số lượng" />
                        </Form.Item>
                        <Form.Item className={stylesVoucher.buttonLabel}>
                            <Button id={styles.btn3} style={{ margin: '0 2%' }} type="primary" htmlType="submit" size="large">
                                Hoàn thành
                            </Button>
                            <Button id={styles.btn4} style={{ margin: '0 2%' }} size="large" onClick={() => form.resetFields()}>
                                Hủy lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}