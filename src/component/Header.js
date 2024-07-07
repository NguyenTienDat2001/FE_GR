import './Header.css'
import logo from '../img/logo.png';
import heart from '../img/bookmark.webp';
import avatar from '../img/background_avatar.jpg'
import hot_photo from '../img/hot_phto.png';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined, PhoneOutlined } from '@ant-design/icons';
import { Input, Select, Button, Dropdown, Popover, Modal } from 'antd';
import { BiSolidHelpCircle, BiGift, BiLogIn } from 'react-icons/bi'
import { TbChristmasTree } from 'react-icons/tb'
import { AiTwotoneBell, AiOutlineUserAdd } from 'react-icons/ai'
import ReactAudioPlayer from 'react-audio-player';
import { apiUrl } from '../domain/domain';
import axios from 'axios';
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const Header = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [keySearch, setKeySearch] = useState("");
    const [books, setBooks] = useState("");
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imgurl, setImgurl] = useState("");
    const location = useLocation();
    //
    const [open, setOpen] = useState(false);
    useEffect(() => {
        axios.get(`${apiUrl}/api/users/profile`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then(res => {
                setName(res.data.user.name)
                setEmail(res.data.user.email)
                setImgurl(res.data.user.avatar)
            })
            .catch(error => console.log(error));
    }, [])
    const showModal = () => {
        setOpen(true);
        startSpeechRecognition()
    };

    const hideModal = () => {
        setOpen(false);
    };
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'vi-VN';
    const startSpeechRecognition = () => {
        recognition.start();
    }
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        console.log('Transcript:', transcript)
        setKeySearch(transcript)
    }

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    }

    const stopSpeechRecognition = () => {
        recognition.stop();
    }
    //
    const viewdetail = (book_id) => {
        const currentPath = location.pathname;
        console.log("path is", currentPath);
        if (currentPath.includes('/detail')) {
            navigate('/')
        }
        navigate(`/detail/${book_id}`)
    }
    const content = (
        <div className="bg-white shadow rounded-sm">
            <div className="bg-white shadow rounded-sm p-4">
                {books && books.length > 0 ? (
                    books.slice(0, 5).map((book) => (
                        <div key={book.id} onClick={() => viewdetail(book.id)} className='flex gap-3 pb-3 hover:cursor-pointer'>
                            <div>
                                <img className='h-16 w-12' src={book.img} alt='' />
                            </div>
                            <div className='text-name'>{book.name}</div>
                        </div>

                    ))
                ) : (
                    <div>Không tìm thấy kết quả</div>
                )}
            </div>
        </div>
    );
    useEffect(() => {
        const search = async () => {
            try {
                if (!keySearch.trim()) {
                    setBooks([])
                    return
                }
                axios.post(`${apiUrl}/api/books/search`, {
                    book_name: keySearch,
                })
                    .then(res => {
                        console.log(res.data.books);
                        setBooks(res.data.books)
                    })
            } catch (error) {

            }
        }
        search()
    }, [keySearch])

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    if (localStorage.getItem('user_id')) {
        var total = localStorage.getItem('total')
    } else {
        var total = 0;
    }
    const handleLogout = () => {
        localStorage.removeItem('user_id')
        navigate('/login')
    }

    const handleCoupon = () => {
        navigate('/coupon')
    }
    const handleEvent = () => {
        navigate('/event')
    }
    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => navigate('/profile')}>
                    Tài khoản của tôi
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => navigate('/password')}>
                    Đổi mật khẩu
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={() => navigate('/history')}>
                    Đơn hàng
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div target="_self" onClick={handleLogout} href="/login">
                    Đăng xuất
                </div>
            ),
        },
    ];
    const handleCart = () => {
        navigate('/cart')
    }
    const handleLogin = () => {
        navigate('/login')
    }
    const handleSignup = () => {
        navigate('/signup')
    }

    const returntohome = () => {
        navigate('/')
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div style={{
                backgroundImage: `url("https://bookbuy.vn/Images/frontend/sieu-sale-thang-10.jpg")`,
                height: '80px'
            }}>
            </div>
            <div className='search-wrap'>
                <img className='bg-transparent' onClick={returntohome} style={{ height: '80px', width: '100px',backgroundColor: 'none',  cursor: 'pointer' }} src={logo} alt='' />
                <div className='relative flex items-center gap-1' >
                    <Popover placement="bottom" content={content} overlayStyle={{ left: '290px', width: '490px' }} title="Kết quả tìm kiếm" trigger="click">
                        <Search
                            placeholder="Bạn cần tìm gì"
                            allowClear
                            onSearch={onSearch}
                            value={keySearch}
                            onChange={(e) => setKeySearch(e.target.value)}
                            style={{ width: 400 }}
                        />
                    </Popover>
                    <i className='hover:cursor-pointer fas fa-microphone' onClick={showModal}></i>
                    <Modal
                        title="Tìm kiếm giọng nói"
                        open={open}
                        onOk={startSpeechRecognition}
                        onCancel={hideModal}
                        okText="Nghe lại"
                        cancelText="Ok"
                        okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                        cancelButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
                    >
                        <div className='h-4'>{keySearch}</div>
                    </Modal>
                </div>
                <div className='phone-icon'>
                    <div>
                        <PhoneOutlined style={{ color: 'green', fontSize: '35px', padding: '0 10px' }} />
                    </div>
                    <span className='phone-icon-text'>
                        <p>Hotline</p>
                        <p>0123456789</p>
                    </span>
                </div>
                <div className='cart-icon'>
                    <ShoppingCartOutlined onClick={handleCart} style={{ color: 'orange', fontSize: '35px' }} />
                    {/* <span className='cart-icon-notice'>0</span> */}
                </div>
                {(!localStorage.getItem('user_id')) ? (
                    <>
                        <div onClick={handleLogin} className='icon-text-right'>
                            <BiLogIn style={{ color: "blue" }} /><span>Đăng nhập</span>
                        </div>
                        <div onClick={handleSignup} className='icon-text-right'>
                            <AiOutlineUserAdd style={{ color: "blue" }} /><span>Đăng ký</span>
                        </div>
                    </>
                ) : (
                    <div className='icon-text-right flex items-center gap-1'>

                        <div style={{ color: 'blue' }}>
                            <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                <div className='flex items-center gap-1'>
                                    <img className='h-11 w-11 rounded-full' src={imgurl} alt='' />
                                    <span>{username ? username: email}</span>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                )}
            </div>
            <div className='side-bar flex justify-between' style={{ backgroundColor: '#f18121' }}>
                <div onClick={() => navigate('/coupon')} className='flex items-center gap-1 hover:cursor-pointer'>
                    <img className=' h-8 w-8 rounded-full' src='https://png.pngtree.com/png-clipart/20230105/original/pngtree-beautiful-pink-close-gift-box-png-image_8872744.png' alt="Hình ảnh 2" />
                    <span className=' font-bold text-base text-white'>Ưu đãi</span>
                </div>
                <div onClick={handleEvent} className='flex items-center gap-1 hover:cursor-pointer'>
                    <img className=' h-8 w-8 rounded-full' src={hot_photo} alt="Hình ảnh 2" />
                    <span className=' font-bold text-base text-white'>Chương trình khuyến mãi</span>
                </div>
                <div onClick={() => navigate('/rent')} className='flex items-center gap-1 hover:cursor-pointer'>
                    <img className=' h-8 w-8 rounded-full' src='https://png.pngtree.com/png-vector/20190412/ourmid/pngtree-vector-book-icon-png-image_933086.jpg' alt="Hình ảnh 2" />
                    <span className=' font-bold text-base text-white'>Sách đã thuê</span>
                </div>
                <div onClick={() => navigate('/bookmark')} className='flex items-center gap-1 hover:cursor-pointer'>
                    <img className=' h-7 w-7' src={heart} alt="Hình ảnh 2" />
                    <span className=' font-bold text-base text-white'>Yêu thích</span>
                </div>
            </div>
        </div>
    );
};

export default Header;