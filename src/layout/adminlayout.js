
import AdminHeader from "../component/AdminHeader";
import Menu from "../component/Menu";
function AdminLayout({ children }) {
    return (
        <div>
            <AdminHeader/>
            <Menu/>
            {children}
        </div>
    );
}

export default AdminLayout;