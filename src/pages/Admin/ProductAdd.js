import { useState, useEffect } from 'react';
import { Table, Card, Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import "./Product.css";
import axios from 'axios';
const ProductAdd = () => {
    const navigate = useNavigate()
    const [book_name, setBook_name] = useState()
    const [des, setDes] = useState()
    const [category, setCategory] = useState()
    const [buyprice, setBuyprice] = useState()
    const [sellprice, setSellprice] = useState()
    const [author, setAuthor] = useState()
    const [age, setAge] = useState()
    const [publish_at, setPublish_at] = useState()
    const [publisher, setPublisher] = useState()
    const [count, setCount] = useState()
    const [totalsale, setTotalsale] = useState()
    const [photo, setPhoto] = useState()
    const handleClose = () => {
        navigate('/admin/product')
    }
    const data = {
        name: book_name,
        description: des,
        category: category,
        buy_price: buyprice,
        sell_price: sellprice,
        author: author,
        age: age,
        published_at: publish_at,
        publisher: publisher,
        count: count,
        totalsale: totalsale,
        img: photo,
    };
    const handleAdd = () => {
        console.log(data);
        axios.post(`http://127.0.0.1:8000/api/books`, data)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Product Add</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Products</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: "80%" }}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 600 }}
                        >
                            <Form.Item label="Name">
                                <Input value={book_name} onChange={e => setBook_name(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input value={des} onChange={e => setDes(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Category">
                                <Input value={category} onChange={e => setCategory(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Buy Price">
                                <Input value={buyprice} onChange={e => setBuyprice(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Sell Price">
                                <Input value={sellprice} onChange={e => setSellprice(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Author">
                                <Input value={author} onChange={e => setAuthor(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Age">
                                <Select value={age} onChange={value => setAge(value)}>
                                    <Select.Option value="1">0-6 </Select.Option>
                                    <Select.Option value="2">6-15</Select.Option>
                                    <Select.Option value="3">15-18</Select.Option>
                                    <Select.Option value="4">Over 18</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Publish at">
                                <Input value={publish_at} onChange={e => setPublish_at(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Publisher">
                                <Select value={publisher} onChange={value => setPublisher(value)}>
                                    <Select.Option value="Hà Nội">Ha Noi</Select.Option>
                                    <Select.Option value="Kim Đồng">Kim Dong</Select.Option>
                                    <Select.Option value="Trẻ">Tre</Select.Option>
                                    <Select.Option value="Lap động">Lao dong</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Count">
                                <Input value={count} onChange={e => setCount(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Total sale">
                                <Input value={totalsale} onChange={e => setTotalsale(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Photo">
                                <Input value={photo} onChange={e => setPhoto(e.target.value)} />
                            </Form.Item>
                            <Button onClick={handleAdd} color='blue'>Add</Button>
                            <Button onClick={handleClose} color='blue'>Close</Button>
                        </Form>
                    </Card>
                </div>

            </div>

        </div>
    )
};

export default ProductAdd