import { useState, useEffect } from 'react';
import { Table, Card, Button, Form, Input, Select, DatePicker, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../domain/domain';
import axios from 'axios';
const CouponAdd = () => {
    const navigate = useNavigate()
    const [number, setNumber] = useState()
    const [type, setType] = useState()
    const [des, setDes] = useState()
    const [value, setValue] = useState()
    const [point, setPoint] = useState()
    const [condition, setCondition] = useState()
    const [start_date, setStart_date] = useState()
    const [end_date, setEnd_date] = useState()
    const handleClose = () => {
        navigate('/admin/coupon')
    }
    const data = {
        number: number,
        type: type,
        des: des,
        value: value,
        point: point,
        condition: condition,
        status: '0',
    };
    const handleAdd = () => {
        console.log(data);
        axios.post(`${apiUrl}/api/coupons`, data, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
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
                                <h1>Thêm Coupon</h1>
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
                    <Card style={{ width: 600 }}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 600 }}
                        >
                            <Form.Item label="Số lượng">
                                <Input value={number} onChange={e => setNumber(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Loại">
                                <Select value={type} onChange={value => setType(value)}>
                                    <Select.Option value="1">Giảm theo %</Select.Option>
                                    <Select.Option value="2">Giảm theo số tiền cố định</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mô tả">
                                <Input value={des} onChange={e => setDes(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Value">
                                <Input value={value} onChange={e => setValue(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Điểm">
                                <Input value={point} onChange={e => setPoint(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Điều kiện">
                                <Input value={condition} onChange={e => setCondition(e.target.value)} />
                            </Form.Item>
                            {/* <Form.Item label="Start at">
                            <DatePicker onChange = {(date, dateString) => setStart_date(dateString)}/>
                            </Form.Item>
                            <Form.Item label="End at">
                            <DatePicker onChange = {(date, dateString) => setEnd_date(dateString)}/>
                            </Form.Item> */}
                            <div className='flex justify-between'>
                            <Button className=' bg-green-500 text-white' onClick={handleAdd}>Thêm</Button>
                            <Button className=' bg-red-600 text-white' onClick={handleClose}>Đóng</Button>
                            </div>
                        </Form>
                    </Card>
                </div>

            </div>

        </div>
    )
};

export default CouponAdd