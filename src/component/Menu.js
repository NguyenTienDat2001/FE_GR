import { useState, useEffect } from 'react';
import logo from '../img/logo.png';
import avatar from '../img/background_avatar.jpg';
import './Menu.css';
import { Link } from 'react-router-dom';
import { apiUrl } from '../domain/domain';
import axios from 'axios';
const Menu = () => {
    const [email, setEmail] = useState()
    const [menuStates, setMenuStates] = useState({
        dashboard: false,
        promotion: false,
        importExport: false,
        order: false,
        user: false
    });

    const toggleDropdown = (menu) => {
        setMenuStates(prevState => ({
            ...prevState,
            [menu]: !prevState[menu]
        }));
    };
    const links = document.querySelectorAll('.nav-link.item');
    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('active'))
            link.classList.add('active');
        });
    });
    useEffect(() => {
        axios.get(`${apiUrl}/api/users/profile`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then(res => {
                setEmail(res.data.user.email)
            })
            .catch(error => console.log(error));
    }, [])
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">MyBookstore</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className=" ml-3 mt-2 mb-3 flex items-center gap-1">
                        <div>
                            <img src={avatar} className=" h-6 w-6 rounded-full" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block text-base">{email}</a>
                        </div>
                    </div>
                    {/* SidebarSearch Form */}
                    {/* <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div> */}
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className={`nav-item ${menuStates.dashboard ? 'menu-open' : ''}`}>
                                <a onClick={() => toggleDropdown('dashboard')} href="#" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={'/admin'} className="nav-link item active">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Thống kê</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/admin/product'} className="nav-link item ">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Sản phẩm</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`nav-item ${menuStates.promotion ? 'menu-open' : ''}`}>
                                <a onClick={() => toggleDropdown('promotion')} href="#" className="nav-link">
                                    <i className="nav-icon fas fa-money-bill" />
                                    <p>
                                        Khuyến mại
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={'/admin/coupon'} className="nav-link item">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Coupon</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/admin/event'} className="nav-link item">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Sự kiện</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`nav-item ${menuStates.importExport ? 'menu-open' : ''}`}>
                                <a onClick={() => toggleDropdown('importExport')} href="#" className="nav-link">
                                    <i className="nav-icon fas fa-truck" />
                                    <p>
                                        Xuất nhập hàng
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={'/admin/import'} className="nav-link item">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Nhập hàng</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/admin/export'} className="nav-link item">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Xuất hàng</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`nav-item ${menuStates.user ? 'menu-open' : ''}`}>
                                <a onClick={() => toggleDropdown('user')} href="#" className="nav-link">
                                    <i className="nav-icon fas fa-user" />
                                    <p>
                                        Quản lý người dùng
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={'/admin/user'} className="nav-link item">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Khách hàng</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/admin/staff'} className="nav-link item">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Nhân viên</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`nav-item ${menuStates.order ? 'menu-open' : ''}`}>
                                <Link to={'/admin/order'} onClick={() => toggleDropdown('order')} class="nav-link">
                                    <i className="nav-icon fas fa-shopping-cart" />
                                    <p>
                                        Đơn hàng
                                        {/* <span class="badge badge-info right">2</span> */}
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

            </aside>
        </div>
    )
};

export default Menu