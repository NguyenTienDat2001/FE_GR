import './Cart.css'
import { Link, use } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Cart = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [order_id, setOrderid] = useState()
    const [total, setTotal] = useState(0)
    const [newtotal, setNewtotal] = useState(total)
    const [totalitem, setTotalitem] = useState(0)
    const [coupon, setCoupon] = useState()
    const [errMess, setErrMess] = useState()
    const url = 'http://localhost:8000/api/cart';
    const data = {
        user_id: localStorage.getItem('user_id'),
    };
    const handlePayment = () => {
        const data = {
            order_id: order_id,
            total_price: newtotal,
        };
        axios.post(`http://127.0.0.1:8000/api/payment`, data)
            .then(result => {
                console.log(result);
                window.location.href = result.data;

            })
            .catch(error => {
                console.error(error);
            })
    }
    const handleApply = () => {
        const data = {
            id: coupon,
            price: total,
        };
        axios.post(`http://127.0.0.1:8000/api/coupons/apply`, data)
            .then(result => {
                console.log(result);
                setNewtotal(result.data.price)
            })
            .catch(error => {
                console.error(error);
                if (error.response && error.response.status === 500) {
                    // Xử lý khi trả về status 500
                    const errorMessage = error.response.data.message;
                    console.log(errorMessage);
                    setErrMess(errorMessage);
                } else {
                    // Xử lý các trường hợp khác
                    setErrMess(error.message);
                }
            })
    }
    const handleIncrement = (book_id) => {
        setBooks(books => books.map((book) =>
            book_id === book.book_id ? { ...book, quantity: book.quantity + 1 } : book
        ))
        updateCart(book_id, 'inc')
    }
    const handleDecrement = (book_id) => {
        setBooks(books => books.map((book) =>
            book_id === book.book_id ? { ...book, quantity: book.quantity - (book.quantity >= 2 ? 1 : 0) } : book
        ))
        updateCart(book_id, 'des')
    }

    const updateCart = (book_id, scope) => {
        axios.put(`http://localhost:8000/api/cart/${book_id}/${scope}`)
            .then(res => {
                if (res.data.status === 200) {
                    console.log('update cart sucessfully');
                }
            });
    }
    const deleteCart = (book_id) => {
        axios.delete(`http://localhost:8000/api/cart/${book_id}`)
            .then(res => {
                if (res.data.status === 200) {
                    console.log('delete item in cart sucessfully');
                    window.location.reload();
                }
            })
        // navigate('/cart')

    }
    localStorage.setItem('total', totalitem)
    useEffect(() => {
        console.log('data:', data);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                setBooks(result.data);
                let x = result.data.reduce((acc, book) => acc + (book.price * book.quantity), 0)
                let y = result.data.reduce((acc, book) => acc + (book.quantity), 0)
                console.log(x);
                console.log(y);
                setTotal(x)
                setNewtotal(x)
                setTotalitem(y)
                setOrderid(result.data[0].order_id)
                console.log('books is', result);

            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    return (
        <div>
            <div className='cart_infor'>
                <h2 style={{ padding: '1px 0 2px 5px' }}>Giỏ hàng của bạn</h2>
                {books && books.length > 0 && (books.map((book) => (
                    <div className='cart_item'>
                        <img src={book.img} style={{ height: '150px', width: '120px', backgroundColor: 'rgba(217, 217, 217, 0.23)' }} alt='' />
                        <div className='item_text'>
                            <div>
                                <h4 className='text-name'>{book.name}</h4>
                                Tác giả : <Link style={{ textDecoration: 'none' }}>{book.author}</Link>
                            </div>
                            <div>
                                <Link onClick={() => deleteCart(book.book_id)} style={{ textDecoration: 'none' }}>Xóa</Link> | <Link style={{ textDecoration: 'none' }}>Thêm yêu thích</Link>
                            </div>
                        </div>
                        <div>{book.price}Đ X</div>
                        <div className='customize-button'>
                            <Button style={{ minWidth: '25px !important' }} onClick={() => handleDecrement(book.book_id)} type="primary" danger size='small'>
                                -
                            </Button>
                            <Input style={{ width: '40px', height: '25px', textAlign: 'center', borderRadius: '4px' }} value={book.quantity} />
                            <Button style={{ minWidth: '25px !important' }} onClick={() => handleIncrement(book.book_id)} type="primary" danger size='small'>
                                +
                            </Button>
                        </div>
                    </div>
                )))}
            </div>
            <div className='payment'>
                <div>
                    <div style={{ textAlign: 'center' }}>{totalitem} sản phẩm</div>
                    <div className='content'>
                    <div className='label'>
                        Tạm tính<br />
                        MGG<br />
                        Tổng tiền<br />
                    </div>
                    <div className='label-value'>
                        <div style={{ color: 'red' }}>{total}Đ</div>
                        <div>
                                <Input style={{ width: '100px', textAlign: 'center', borderRadius: '4px' }} value={coupon} onChange={e => setCoupon(e.target.value)} />
                                <Button onClick={handleApply}>Áp dụng</Button>
                            </div>
                        <div>
                            <span style={{ color: 'red' }}>{newtotal}Đ</span>
                        </div>
                    </div>
                </div>
                    {errMess && (<div style={{ color: 'red' }}>{errMess}</div>)}

                </div>
                <div>
                    <Button onClick={handlePayment} type="primary" primary >Thanh toán online</Button>
                    <Button onClick={handlePayment} type="primary" danger >Trả tiền mặt</Button>
                </div>
                
            </div>
        </div>
    );
};

export default Cart;