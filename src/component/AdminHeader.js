import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user_id')
        navigate('/login')
    }
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <div onClick={() => navigate('/admin')} className="nav-link hover:cursor-pointer">Home</div>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <div onClick={handleLogout} className="nav-link hover:cursor-pointer">Đăng xuất</div>
                    </li>
                   
                </ul>
              
            </nav>

        </div>
    )
};

export default AdminHeader