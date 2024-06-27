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
        <div style={{ width: '80%', margin: 'auto' }}>
            <Tabs defaultActiveKey="1" onChange={onChange}>
                {items.map(item => (
                    <Tabs.TabPane tab={<span className=' text-base font-bold'>{item.label}</span>} key={item.key}>
                        {item.children}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </div>
    )

};
export default CouponUser;