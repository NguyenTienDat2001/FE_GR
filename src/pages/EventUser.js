import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button, Row, Col } from 'antd';
import axios from 'axios';
const { Meta } = Card;
const EventUser = () => {
    const [events, setEvents] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/events/active')
            .then(res => {
                setEvents(res.data.events)
                console.log(res.data.events);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div style={{ width: '80%', margin: 'auto', paddingTop: "10px" }}>
            <div className='flex justify-between pb-1 pt-1 items-center pl-1 pr-1 rounded-sm mb-1'>
                <span className=' font-bold text-lg text-red-500'>Chương trình khuyến mãi</span>
            </div>
            <Row gutter={[16, 16]}>
                {events && events.length > 0 && events.map((item, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                        <Card
                            hoverable
                            style={{ width: '100%' }}
                            cover={<img alt={item.des} src='https://bookbuy.vn/Res/Images/Promotion/5bc2730d-4064-46b1-90dd-f6e410089ee7.jpg?width=500&height=250&quality=90&Cache=Always&mode=crop' />}
                        >
                            <Meta title={item.des} description={`Khi mua sắm tại cửa hàng, với mỗi ${item.value}Đ trong hóa đơn thanh toán bạn sẽ nhận được ${item.point} điểm`} />
                            <div
                                style={{ paddingTop: 5, color: 'red', cursor: 'pointer', fontWeight: 'bold' }}
                                onClick={() => navigate('/')}
                            >
                                Nhanh tay mua sắm ngay
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
};

export default EventUser