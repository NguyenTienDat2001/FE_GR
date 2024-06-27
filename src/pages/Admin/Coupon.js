import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button, message, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';
const { Option } = Select;
const Coupon = () => {
    const navigate = useNavigate()
    const [selectedValue, setSelectedValue] = useState('all');
    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Mô tả',
            dataIndex: 'des',
            key: 'des',
            width: '300px',
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (text) => {
                switch (text) {
                    case "0":
                        return 'Free ship';
                    case "1":
                        return 'Giam theo %';
                    case "2":
                        return 'Giam theo so tien co dinh';
                    default:
                        return 'Unknown Type';
                }
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let color;
                let statusText;

                switch (text) {
                    case "0":
                        color = 'green';
                        statusText = 'CHƯA ĐỔI';
                        break;
                    case "1":
                        color = 'blue';
                        statusText = 'ĐÃ ĐỔI';
                        break;
                    case "2":
                        color = 'red';
                        statusText = 'ĐÃ SỬ DỤNG';
                        break;
                    default:
                        color = 'red';
                        statusText = 'Unknown Type';
                }

                return <span style={{ color }}>{statusText}</span>;
            },
        },

        {
            title: 'Điểm',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
                    <div onClick={() => deleteCoupon(record.id)} className="btn btn-danger btn-sm " href="#">
                        <i className="fas fa-trash">
                        </i>
                        <span>Xóa</span>
                    </div>
                </span>
            ),
        },
    ];
    const handleChange = (value) => {
        setSelectedValue(value);
    };
    const handleAdd = () => {
        axios.post(`http://127.0.0.1:8000/api/coupons`, null, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => {
                if (res.status === 200) {
                    navigate('/admin/coupon/add')
                } else if (res.status === 201) {
                    message.config({
                        top: 100,
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Bạn chưa được cấp quyền thêm')
                    }, 2000)
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
    const deleteCoupon = (coupon_id) => {
        axios.delete(`http://localhost:8000/api/coupons/${coupon_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => {
                if (res.status === 200) {
                    getCoupon();
                    message.config({
                        top: 100,
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Xóa thành công')
                    }, 2000)
                } else if (res.status === 201) {
                    console.log('You do not have permission to delete this item.');
                    message.config({
                        top: 100,
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Bạn chưa được cấp quyền xóa')
                    }, 2000)
                }
            })


    }
    const [coupons, setCoupons] = useState([])
    useEffect(() => {
        getCoupon();
    }, []);
    const getCoupon = () => {
        fetch('http://127.0.0.1:8000/api/coupons')
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setCoupons(data.coupon)
            })
            .catch((error) => console.log(error));
    }
    let filteredCoupons = coupons;
    if (selectedValue !== 'all') {
        filteredCoupons = coupons.filter(coupon => coupon.status === selectedValue);
    }
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Danh sách coupon</h1>
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
                <Card
                    title="Danh sách coupon"
                    bordered={false}
                    extra={
                        <div className='flex gap-1'>
                            <Select value={selectedValue} onChange={handleChange} className=' w-36'>
                                <Option value="all">Tất cả</Option>
                                <Option value="0">Chưa đổi</Option>
                                <Option value="1">Đã đổi</Option>
                                <Option value="2">Đã sử dụng</Option>
                            </Select>
                            <Button className=' bg-green-500' onClick={handleAdd} type="primary">Thêm</Button>
                        </div>
                    }
                >
                    <Table dataSource={filteredCoupons} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Coupon