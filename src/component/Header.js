import './Header.css'
import logo from '../img/logo.png';
import heart from '../img/heart.jpg';
import avatar from '../img/background_avatar.jpg'
import hot_photo from '../img/hot_phto.png';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined, PhoneOutlined } from '@ant-design/icons';
import { Input, Select, Button, Dropdown } from 'antd';
import { BiSolidHelpCircle, BiGift, BiLogIn } from 'react-icons/bi'
import { TbChristmasTree } from 'react-icons/tb'
import { AiTwotoneBell, AiOutlineUserAdd } from 'react-icons/ai'
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
                        <div className='icon-text-left'>
                            <BiSolidHelpCircle style={{ color: "blue" }} /> <span>Trợ giúp </span>
                        </div>
                        <div className='icon-text-left'>
                            <TbChristmasTree style={{ color: "blue" }} /><span>Khuyến mãi </span>
                        </div>
                        <div onClick={handleCoupon} className='icon-text-left'>
                            <BiGift style={{ color: "blue" }} /><span>Ưu đãi</span>
                        </div>
                    </div>

                    <div className='menu-right'>
                        <div className='icon-text-right'>
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
                            <div className='icon-text-right'>
                                <div className='avatar'>
                                    <img src={avatar} alt='' />
                                </div>
                                <div style={{ color: 'blue' }}>
                                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                        <span>Tien Dat</span>
                                    </Dropdown>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className='search-wrap'>
                <img onClick={returntohome} style={{ height: '80px', width: '100px', backgroundColor: 'rgba(217, 217, 217, 0.23)', cursor: 'pointer' }} src={logo} alt='' />
                <div >
                    <Search
                        addonBefore={selectBefore}
                        placeholder="Bạn cần tìm gì"
                        allowClear
                        onSearch={onSearch}
                        style={customStyle}
                    />
                </div>
                <div className='cart-icon'>
                    <ShoppingCartOutlined onClick={handleCart} style={{ color: 'orange', fontSize: '35px' }} />
                    <span className='cart-icon-notice'>{total}</span>
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
            <div className='side-bar'>
                <div>
                    <Button
                        type="primary"
                        onClick={toggleCollapsed}
                        style={{ marginRight: 5 }}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <span>Danh mục sách</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ width: '10%', borderRadius: '50%' }} src={hot_photo} alt="Hình ảnh 2" />
                    <span>Chương trình khuyến mãi</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <img style={{ width: '5%', borderRadius: '50%' }} src={heart} alt="Hình ảnh 2" /> */}
                    <span>Yêu thích</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
