import { useState, useEffect } from 'react';
import { Table, Card, Button, Form, Input, Select, DatePicker, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CouponAdd = () => {
    const navigate = useNavigate()
    const [type, setType] = useState()
    const [des, setDes] = useState()
    const [start_date, setStart_date] = useState()
    const [end_date, setEnd_date] = useState()
    const handleClose = () => {
        navigate('/admin/coupon')
    }
    const data = {
        type: type,
        des: des,
        start_date: start_date,
        end_date: end_date,
    };
    const handleAdd = () => {
        console.log(data);
        axios.post(`http://127.0.0.1:8000/api/coupons`, data)
            .then(result => {
                console.log(result);
                message.config({
                    top: 100, // Thay đổi giá trị top tùy thuộc vào vị trí mong muốn
                    duration: 2,
                  });
                setTimeout(() => {
                    message.success('Add coupon successfully')
                }, 2000)
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Coupon Add</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Coupons</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: "80%" }}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 600 }}
                        >
                            <Form.Item label="Type">
                                <Select value={type} onChange={value => setType(value)}>
                                    <Select.Option value="0">Free ship </Select.Option>
                                    <Select.Option value="1">Theo %</Select.Option>
                                    <Select.Option value="2">Theo so tien</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input value={des} onChange={e => setDes(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Start at">
                            <DatePicker onChange = {(date, dateString) => setStart_date(dateString)}/>
                            </Form.Item>
                            <Form.Item label="End at">
                            <DatePicker onChange = {(date, dateString) => setEnd_date(dateString)}/>
                            </Form.Item>
                            
                            <Button onClick={handleAdd} color='blue'>Add</Button>
                            <Button onClick={handleClose} color='blue'>Close</Button>
                        </Form>
                    </Card>
                </div>

            </div>

        </div>
    )
};

export default CouponAdd