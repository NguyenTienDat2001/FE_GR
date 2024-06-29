import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Card, Button, message } from 'antd';
import { apiUrl } from '../../domain/domain';
import axios from 'axios';
import "./Product.css";
const Product = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => text.toString().padStart(4, '0'),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '300px',
        },
        {
            title: 'Giá mua',
            dataIndex: 'buy_price',
            key: 'buy_price',
        },
        {
            title: 'Giá bán',
            dataIndex: 'sell_price',
            key: 'sell_price',
        },
        {
            title: 'Số lượng ',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Đã bán',
            dataIndex: 'totalsale',
            key: 'totalsale',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span className='flex gap-1'>
                    {/* <a className="btn btn-primary btn-sm" href="#">
                        <i className="fas fa-eye">
                        </i>
                        View
                    </a> */}
                    <div onClick={() => editBook(record.id)} className="btn btn-info btn-sm">
                        <i className="fas fa-pencil-alt">
                        </i>
                        Sửa
                    </div>
                    <div onClick={() => deleteBook(record.id)} className="btn btn-danger btn-sm">
                        <i className="fas fa-trash">
                        </i>
                        Xóa
                    </div>
                </span>
            ),
        },
    ];
    const handleAdd = () => {
        axios.post(`${apiUrl}/api/books`, null, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => {
                if (res.status === 200) {
                    navigate('/admin/product/add')
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
    const deleteBook = (book_id) => {
        axios.delete(`${apiUrl}/api/books/${book_id}`, {
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
        // navigate('/cart')

    }
    const [books, setBooks] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch(`${apiUrl}/api/books`, {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem('token')
            },
          })
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setBooks(data.books)
            })
            .catch((error) => console.log(error));
    }, []);
    const editBook = (order_id) => {
        navigate(`/admin/product/edit/${order_id}`)
    }
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Danh sách sản phẩm</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active">Sản phẩm</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Danh sách sản phẩm"
                    bordered={false}
                    extra={
                        <div className='flex gap-2'>
                            <Button className=' bg-green-500' onClick={handleAdd} type="primary">Thêm sản phẩm</Button>
                            <Button className=' bg-blue-500' onClick={() => navigate('/admin/product/chapter/add')} type="primary">Thêm chương</Button>
                        </div>
                }
                >
                    <Table dataSource={books} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Product