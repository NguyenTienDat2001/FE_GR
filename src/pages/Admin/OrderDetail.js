import { useParams } from "react-router-dom";
import { Button, Input, Card, Table } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";
function OrderDetail() {
    const { order_id } = useParams()
    const [infor, setInfor] = useState()
    const [items, setItems] = useState()
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/order/${order_id}`)
            .then(res => {
                setInfor(res.data)
                setItems(res.data.items)
            })
            .catch(error => console.log(error));
    }, []);
    console.log('item is', items);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'book_id',
            key: 'book_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '300px',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Order Detail</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Order Detail</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Product items"
                    bordered={false}
                >
                    <Table dataSource={items} columns={columns} />
                </Card>
                <div style={{padding: "15px"}}>
                {infor && (
                    <div>
                        {infor.cash && <div>Đã thanh toán tiền mặt</div>}
                        {infor.trans && <div>Đã thanh toán qua ngân hàng<br />
                            <p>Số tiền: {infor.trans.amount}</p>
                            <p>Mã ngân hàng: {infor.trans.bank_code}</p>
                            <p>Thông tin thanh toán: {infor.trans.infor}</p></div>}
                    </div>
                )}
                </div>
            </div>

        </div>
    );
}

export default OrderDetail;
