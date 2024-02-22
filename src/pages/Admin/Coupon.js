import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
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
        navigate('/admin/coupon/add')
    }
    const deleteCoupon = (book_id) => {
        axios.delete(`http://localhost:8000/api/coupons/${book_id}`)
        .then(res=> {
            if(res.data.status === 200) {
                console.log('delete item in cart sucessfully');
                window.location.reload();
            }
        })
        // navigate('/cart')
        
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
                extra={<Button onClick={handleAdd} type="primary">Add coupon</Button>}
                >
                    <Table dataSource={coupons} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Coupon