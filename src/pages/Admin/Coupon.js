import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button, message } from 'antd';
import axios from 'axios';
const Coupon = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'des',
            width: '300px',
        },
        {
            title: 'Type',
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
            title: 'Start',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'End',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a className="btn btn-info btn-sm" href="#">
                        <i className="fas fa-pencil-alt">
                        </i>
                        Edit
                    </a>
                    <a onClick={() => deleteCoupon(record.id)} className="btn btn-danger btn-sm" href="#">
                        <i className="fas fa-trash">
                        </i>
                        Delete
                    </a>
                </span>
            ),
        },
    ];
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
                    console.log('Delete item in cart successfully');
                    window.location.reload();
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
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/coupons')
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setCoupons(data.coupon)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Coupon List</h1>
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
                title="Product list"  
                bordered={false}
                extra={<Button className=' bg-green-500' onClick={handleAdd} type="primary">Thêm</Button>}
                >
                    <Table dataSource={coupons} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Coupon