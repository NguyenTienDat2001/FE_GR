import { Tabs } from 'antd';
import CouponList from './CouponList';
import MyCoupon from './MyCoupon';
const CouponUser = () => {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Đổi mã giảm giá',
            children: <CouponList />,
        },
        {
            key: '2',
            label: 'Mã giảm giá của bạn',
            children: <MyCoupon />,
        },
    ];
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )

};
export default CouponUser;