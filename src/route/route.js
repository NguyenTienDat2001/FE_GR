import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Bookmark from '../pages/Bookmark';
import LoginForm from '../pages/LoginForm';
import SignupForm from '../pages/SignupForm';
import SearchPage from '../pages/SearchPage';
import Password from '../pages/Password';
import Detail from '../pages/Detail';
import OrderHistory from '../pages/OrderHistory';
import PaymentResult from '../pages/PaymentResult';
import CouponUser from '../pages/CouponUser';
import EventUser from '../pages/EventUser';
import Product from '../pages/Admin/Product';
import ProductAdd from '../pages/Admin/ProductAdd';
import ProductEdit from '../pages/Admin/ProductEdit';
import Coupon from '../pages/Admin/Coupon';
import CouponAdd from '../pages/Admin/CouponAdd';
import Order from '../pages/Admin/Order';
import OrderDetail from '../pages/Admin/OrderDetail';
import ExportAdd from '../pages/Admin/ExportAdd';
import Export from '../pages/Admin/Export';
import Import from '../pages/Admin/Import';
import ImportAdd from '../pages/Admin/ImportAdd';
import ImexportDetail from '../pages/Admin/ImexportDetail';
import EventAdd from '../pages/Admin/EventAdd';
import Event from '../pages/Admin/Event';
import User from '../pages/Admin/User';
import Staff from '../pages/Admin/Staff';
import DefaultLayout from '../layout/defaultlayout';
import AdminLayout from '../layout/adminlayout';
import Dashboard from '../pages/Admin/Dashboard';
import ChapterAdd from '../pages/Admin/ChapterAdd';
import Rent from '../pages/Rent';
import Chapter from '../pages/Chapter';
import OrderHistoryDetail from '../pages/OrderHistoryDetail';

export const publicRoutes = [
    { path: '/cart', element: Cart, layout: DefaultLayout },
    { path: '/', element: Home, layout: DefaultLayout },
    { path: '/rent', element: Rent, layout: DefaultLayout },
    { path: '/rent/view/:id', element: Chapter, layout: DefaultLayout },
    { path: '/profile', element: Profile, layout: DefaultLayout },
    { path: '/search', element: SearchPage, layout: DefaultLayout },
    { path: '/login', element: LoginForm },
    { path: '/signup', element: SignupForm },
    { path: '/coupon', element: CouponUser, layout: DefaultLayout },
    { path: '/event', element: EventUser, layout: DefaultLayout },
    { path: '/bookmark', element: Bookmark, layout: DefaultLayout },
    { path: '/history', element: OrderHistory, layout: DefaultLayout },
    { path: '/history/:order_id', element: OrderHistoryDetail, layout: DefaultLayout },
    { path: '/payment/infor', element: PaymentResult },
    { path: '/password', element: Password, layout: DefaultLayout },
    { path: '/detail/:id', element: Detail, layout: DefaultLayout },
    { path: '/admin/', element: Dashboard, layout: AdminLayout },
    { path: '/admin/product', element: Product, layout: AdminLayout },
    { path: '/admin/product/add', element: ProductAdd, layout: AdminLayout },
    { path: '/admin/product/edit/:id', element: ProductEdit, layout: AdminLayout },
    { path: '/admin/product/chapter/add', element: ChapterAdd, layout: AdminLayout },
    { path: '/admin/coupon', element: Coupon, layout: AdminLayout },
    { path: '/admin/coupon/add', element: CouponAdd, layout: AdminLayout },
    { path: '/admin/order', element: Order, layout: AdminLayout },
    { path: '/admin/order/:order_id', element: OrderDetail, layout: AdminLayout },
    { path: '/admin/user', element: User, layout: AdminLayout },
    { path: '/admin/staff', element: Staff, layout: AdminLayout },
    { path: '/admin/imexport/:id', element: ImexportDetail, layout: AdminLayout },
    { path: '/admin/export/add', element: ExportAdd, layout: AdminLayout },
    { path: '/admin/import/add', element: ImportAdd, layout: AdminLayout },
    { path: '/admin/import', element: Import, layout: AdminLayout },
    { path: '/admin/export', element: Export, layout: AdminLayout },
    { path: '/admin/event/add', element: EventAdd, layout: AdminLayout },
    { path: '/admin/event', element: Event, layout: AdminLayout },
]