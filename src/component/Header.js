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
import axios from 'axios';
const { Search } = Input;
const { Option } = Select;
const selectBefore = (
    <Select defaultValue="Tất cả">
        <Option value="all">Tất cả</Option>
        <Option value="category">Danh mục</Option>
        <Option value="age">Độ tuổi</Option>
        <Option value="author">Tác giả</Option>
    </Select>
);
const customStyle = {
    width: 600,
};

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [keySearch, setKeySearch] = useState("");
    const [books, setBooks] = useState("");
    const location = useLocation();
    //
    const [open, setOpen] = useState(false);
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
                    books.map((book) => (
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
                axios.post(`http://127.0.0.1:8000/api/books/search`, {
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
    const items = [
        {
            key: '1',
            label: (
                <Link target="_self" to="/profile">
                    Tài khoản của tôi
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_self" href="/password">
                    Đổi mật khẩu
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_self" href="/history">
                    Đơn hàng
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a target="_self" onClick={handleLogout} href="/login">
                    Đăng xuất
                </a>
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
            <div style={{ backgroundColor: "#D9D9D9" }}>

                <div className='menu'>
                    <div className='menu-left'>
                        <div className='icon-text-left flex items-center gap-1 hover:cursor-pointer'>
                            <BiSolidHelpCircle style={{ color: "blue" }} /> <span>Trợ giúp </span>
                        </div>
                        <div className='icon-text-left flex items-center gap-1 hover:cursor-pointer'>
                            <TbChristmasTree style={{ color: "blue" }} /><span>Khuyến mãi </span>
                        </div>
                        <div onClick={handleCoupon} className='icon-text-left flex items-center gap-1 hover:cursor-pointer'>
                            <BiGift style={{ color: "blue" }} /><span>Ưu đãi</span>
                        </div>
                    </div>

                    <div className='menu-right'>
                        <div className='icon-text-right flex items-center gap-1'>
                            <AiTwotoneBell style={{ color: "blue" }} /><span>Thông báo</span>
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
                                            <img className='h-8 w-8 rounded-full' src={avatar} alt='' />
                                            <span>Tiến Đạt</span>
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className='search-wrap'>
                <img className='bg-gray-300 bg-opacity-23' onClick={returntohome} style={{ height: '80px', width: '100px', backgroundColor: 'rgba(217, 217, 217, 0.23)', cursor: 'pointer' }} src={logo} alt='' />
                <div className='relative flex items-center gap-1' >
                    <Popover placement="bottom" content={content} overlayStyle={{ left: '442px', width: '490px' }} title="Kết quả tìm kiếm" trigger="click">
                        <Search
                            addonBefore={selectBefore}
                            placeholder="Bạn cần tìm gì"
                            allowClear
                            onSearch={onSearch}
                            value={keySearch}
                            onChange={(e) => setKeySearch(e.target.value)}
                            style={customStyle}
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

                <div className='cart-icon'>
                    <ShoppingCartOutlined onClick={handleCart} style={{ color: 'orange', fontSize: '35px' }} />
                    <span className='cart-icon-notice'>0</span>
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
            </div>
            <div className='side-bar flex justify-between'>
                <div className='flex items-center gap-1'>
                    <Button className=' bg-blue-500 flex items-center h-7 w-9 justify-center'
                        type="primary"
                        onClick={toggleCollapsed}
                        style={{ marginRight: 5 }}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <span>Danh mục sách</span>
                </div>
                {/* <div className='flex items-center gap-1 hover:cursor-pointer self-start'>
                    <img style={{ width: '10%', borderRadius: '50%' }} src={hot_photo} alt="Hình ảnh 2" />
                    <span>Chương trình khuyến mãi</span>
                </div> */}
                <div className='flex items-center gap-1 hover:cursor-pointer'>
                    <img className=' h-8 w-8 rounded-full' src={hot_photo} alt="Hình ảnh 2" />
                    <span>Chương trình khuyến mãi</span>
                </div>
                <div onClick={() => navigate('/rent')} className='flex items-center gap-1 hover:cursor-pointer'>
                    <img className=' h-8 w-8 rounded-full' src='https://png.pngtree.com/png-vector/20190412/ourmid/pngtree-vector-book-icon-png-image_933086.jpg' alt="Hình ảnh 2" />
                    <span>Sách đã thuê</span>
                </div>
                <div className='flex items-center gap-1 hover:cursor-pointer'>
                    <img className=' h-7 w-7' src={heart} alt="Hình ảnh 2" />
                    <span>Yêu thích</span>
                </div>
            </div>
        </div>
    );
};

export default Header;