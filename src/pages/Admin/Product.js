import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import axios from 'axios';
import "./Product.css";
const Product = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '300px',
        },
        {
            title: 'Buy Price',
            dataIndex: 'buy_price',
            key: 'buy_price',
        },
        {
            title: 'Sell Price',
            dataIndex: 'sell_price',
            key: 'sell_price',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Total Sale',
            dataIndex: 'totalsale',
            key: 'totalsale',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a className="btn btn-primary btn-sm" href="#">
                        <i className="fas fa-folder">
                        </i>
                        View
                    </a>
                    <a className="btn btn-info btn-sm" href="#">
                        <i className="fas fa-pencil-alt">
                        </i>
                        Edit
                    </a>
                    <a onClick={() => deleteBook(record.id)} className="btn btn-danger btn-sm" href="#">
                        <i className="fas fa-trash">
                        </i>
                        Delete
                    </a>
                </span>
            ),
        },
    ];
    const handleAdd = () => {
        navigate('/admin/product/add')
    }
    const deleteBook = (book_id) => {
        axios.delete(`http://localhost:8000/api/books/${book_id}`)
        .then(res=> {
            if(res.data.status === 200) {
                console.log('delete item in cart sucessfully');
                window.location.reload();
            }
        })
        // navigate('/cart')
        
    }
    const [books, setBooks] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/books')
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setBooks(data.books)
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
                                <h1>Product List</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Products</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card 
                title="Product list"  
                bordered={false}
                extra={<Button onClick={handleAdd} type="primary">Add product</Button>}
                >
                    <Table dataSource={books} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Product