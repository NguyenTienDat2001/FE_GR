import './Cart.css'
import { Link } from 'react-router-dom';
import { Button, Input, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DeleteFilled } from '@ant-design/icons';
const Cart = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [order_id, setOrderid] = useState()
    const [total, setTotal] = useState(0)
    const [newtotal, setNewtotal] = useState(total)
    const [totalitem, setTotalitem] = useState(0)
    const [coupon, setCoupon] = useState()
    const [errMess, setErrMess] = useState()
    const [successMess, setSuccessMess] = useState()
    const [address, setAddress] = useState()
    const [receiver, setReceiver] = useState()
    const [phone_number, setPhone_number] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const url = 'http://localhost:8000/api/cart';

    const showModal = () => {
        if (books) {
            setIsModalOpen(true);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const addOrder = () => {
        const data = {
            order_id: order_id,
            account: newtotal,
            address: address,
            receiver: receiver,
            phone_number: phone_number,
            code: coupon,
        };
        axios.post(`http://127.0.0.1:8000/api/orders`, data)
            .then(result => {
                console.log(result);
                setIsModalOpen(false);
                getCart();

            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleApply = () => {
        const data = {
            code: coupon,
            price: total,
        };
        axios.post(`http://127.0.0.1:8000/api/coupons/apply`, data)
            .then(result => {
                if (result.status === 200) {
                    console.log(result);
                    setNewtotal(result.data.price)


                    setErrMess('');
                    setSuccessMess('Áp dụng mã thành công')
                }
                if (result.status === 201) {
                    setErrMess('Mã không hợp lệ');
                    setSuccessMess('')
                }
                if (result.status === 202) {
                    setErrMess('Không đủ điều kiện');
                    setSuccessMess('')
                }
                if (result.status === 203) {
                    setErrMess('Đã được sử dụng');
                    setSuccessMess('')
                }
            })
            .catch(error => {
                console.error(error);

            })
    }
    const handleIncrement = (book_id) => {
        setBooks(books => books.map((book) =>
            book_id === book.book_id ? { ...book, quantity: book.quantity + 1 } : book
        ))
        updateCart(book_id, 'inc')
    }
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            setBooks(books => books.map((book) =>
                item.book_id === book.book_id ? { ...book, quantity: book.quantity - 1 } : book
            ))
            updateCart(item.book_id, 'des')
        }
    }

    const updateCart = (book_id, scope) => {
        console.log(book_id);
        console.log(scope);
        console.log(localStorage.getItem('token'));
        axios.post('http://localhost:8000/api/cart/update', {
            book_id: book_id,
            scope: scope
        },
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
            })
            .then(res => {
                console.log('update cart sucessfully');
                getCart()
            })
            .catch(err => {
                console.log(err);
            })
    }
    const deleteCart = (book_id) => {
        console.log(typeof book_id);
        axios.delete(`http://localhost:8000/api/cart/${book_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then(res => {
                console.log('delete item in cart sucessfully');
                getCart()

            })
            .catch(err => {
                console.log(err);
            })
    }
    localStorage.setItem('total', totalitem)
    useEffect(() => {
        getCart()
    }, []);
    useEffect(() => {
        setNewtotal(total)
        setErrMess()
        setSuccessMess()
    }, [coupon]);
    const getCart = () => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
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
                setOrderid(result.order_id)
                console.log('books is', result);

            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <div className='flex gap-1'>
            <div className=' w-4/5 cart_infor rounded-lg mt-2'>
                <h2 className=' pl-3 pt-3 flex items-center text-lg'>Giỏ hàng của tôi</h2>
                {books && books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.book_id} className='cart_item mt-3 mb-3 shadow rounded-lg ml-3 mr-3'>
                            <img className='pt-1 pb-1' src={book.img} style={{ height: '150px', width: '120px', backgroundColor: 'rgba(217, 217, 217, 0.23)' }} alt={book.name} />
                            <div className='item_text'>
                                <div>
                                    <h4 className='text-name'>{book.name}</h4>
                                    Tác giả : <Link style={{ textDecoration: 'none' }}>{book.author}</Link>
                                </div>
                                <div onClick={() => deleteCart(book.book_id)} className='h-full pt-1 pb-1 flex gap-1 hover:cursor-pointer'>
                                    <DeleteFilled style={{ color: "red" }} />
                                    <div className='text-red-500 no-underline hover:text-red-300'>Xóa khỏi giỏ hàng</div>
                                </div>
                            </div>
                            <div>{book.price}đ</div>
                            <div className='flex items-center gap-0'>
                                <Button className="flex items-center h-7 rounded-none text-center" onClick={() => handleDecrement(book)} type="primary" danger size='small'>
                                    -
                                </Button>
                                <Input className="rounded-none w-12 text-center bg-white disabled:bg-white" size='small' value={book.quantity} disabled />
                                <Button className="flex items-center h-7 rounded-none text-center" onClick={() => handleIncrement(book.book_id)} type="primary" danger size='small'>
                                    +
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center mt-5 text-lg'>
                        Bạn chưa có sản phẩm nào trong giỏ hàng
                    </div>
                )}
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
                    {errMess && (<div className=' text-rose-500 pl-4'>{errMess}</div>)}
                    {successMess && (<div className=' text-green-500 pl-4'>{successMess}</div>)}

                </div>
                <div className=' pl-4 pr-4 items-center m-auto '>
                    <Button className=' bg-blue-500 w-24' onClick={showModal} type="primary" primary >Tạo đơn</Button>
                </div>
                <Modal
                    title="Thuê sách"
                    open={isModalOpen}
                    onOk={addOrder}
                    onCancel={handleCancel}
                    okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
                    width={400}
                >
                    {/* <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Basic usage" />
                    <Input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="Basic usage" />
                    <Input value={phone_number} onChange={e => setPhone_number(e.target.value)} placeholder="Basic usage" /> */}
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Basic usage" />
                        </Form.Item>
                        <Form.Item
                            label="Người nhận"
                            name="receiver"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="Basic usage" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input value={phone_number} onChange={e => setPhone_number(e.target.value)} placeholder="Basic usage" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Cart;