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
    // const data = {
    //     user_id: localStorage.getItem('user_id'),
    // };
    const handlePayment = () => {
        const data = {
            order_id: 13211,
            total_price: 100000,
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
    const handleDecrement = (item) => {
        if(item.quantity > 1) {
            setBooks(books => books.map((book) =>
                item.book_id === book.book_id ? { ...book, quantity: book.quantity -  1 } : book
            ))
            updateCart(item.book_id, 'des')
        }
    }

    const updateCart = (book_id, scope) => {
        console.log(book_id);
        console.log(scope);
        axios.put(`http://localhost:8000/api/cart/${book_id}/${scope}`)
            .then(res => {
                    console.log('update cart sucessfully');
                    window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }
    const deleteCart = (book_id) => {
        console.log(typeof book_id);
        axios.delete(`http://localhost:8000/api/cart/${book_id}`)
            .then(res => {
                    console.log('delete item in cart sucessfully');
                    window.location.reload();
                
            })
            .catch(err => {
                console.log(err);
            })
        // navigate('/cart')

    }
    localStorage.setItem('total', totalitem)
    const token = localStorage.getItem('token');
    useEffect(() => {
        // console.log('data:', data);
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
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
        <div className='flex gap-1'>
            <div className=' w-4/5 cart_infor rounded-lg mt-2'>
                <h2 className=' pl-3 pt-3 flex items-center text-lg'>Giỏ hàng của bạn</h2>
                {books && books.length > 0 && (books.map((book) => (
                    <div className='cart_item mt-3 mb-3 shadow rounded-lg ml-3 mr-3'>
                        <img className='pt-1 pb-1' src={book.img} style={{ height: '150px', width: '120px', backgroundColor: 'rgba(217, 217, 217, 0.23)' }} alt='' />
                        <div className='item_text'>
                            <div>
                                <h4 className='text-name'>{book.name}</h4>
                                Tác giả : <Link style={{ textDecoration: 'none' }}>{book.author}</Link>
                            </div>
                            <div className='h-full pt-1 pb-1'>
                                <Link onClick={() => deleteCart(book.book_id)} className=' text-blue-500 decoration-0 hover:underline'>Xóa</Link> | <Link className=' text-blue-500 decoration-0 hover:underline'>Thêm yêu thích</Link>
                            </div>
                        </div>
                        <div>{book.price}đ X</div>
                        <div className='flex items-center gap-0'>
                            <Button className="flex items-center h-7 rounded-none text-center" onClick={() => handleDecrement(book)} type="primary" danger size='small'>
                                -
                            </Button>
                            <Input className="rounded-none w-12 text-center" size='small' value={book.quantity} />
                            <Button className="flex items-center h-7 rounded-none text-center" onClick={() => handleIncrement(book.book_id)} type="primary" danger size='small'>
                                +
                            </Button>
                        </div>
                    </div>
                )))}
            </div>
            <div className='pt-2 pb-2 self-start w-1/5 bg-white shadow mt-2 rounded-lg flex flex-col gap-2 justify-between'>
                <div style={{ textAlign: 'center' }}>{totalitem} sản phẩm</div>
                <div>
                    <div className='flex gap-2 pl-4 pr-1'>
                        <div className='w-1/4 flex flex-col gap-3'>
                            <div>Tạm tính</div>
                            <div>MGG</div>
                            <div>Tổng tiền</div>
                        </div>
                        <div className='w-3/4 flex flex-col gap-3'>
                            <div style={{ color: 'red' }}>{total}Đ</div>
                            <div className='flex items-center'>
                                <Input className='h-6' style={{ width: '100px', textAlign: 'center', borderRadius: '4px' }} value={coupon} onChange={e => setCoupon(e.target.value)} />
                                <Button className='h-6 flex items-center bg-green-400' onClick={handleApply}>Áp dụng</Button>
                            </div>
                            <div>
                                <span style={{ color: 'red' }}>{newtotal}Đ</span>
                            </div>
                        </div>
                    </div>
                    {errMess && (<div style={{ color: 'red' }}>{errMess}</div>)}

                </div>
                <div className=' pl-4 pr-4 flex justify-between items-center '>
                    <Button className=' bg-blue-500 w-24' onClick={handlePayment} type="primary" primary >Trả online</Button>
                    <Button className='w-24' onClick={handlePayment} type="primary" danger >Trực tiếp</Button>
                </div>

            </div>
        </div>
    );
};

export default Cart;