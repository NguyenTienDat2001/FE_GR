import { useState, useEffect } from 'react';
import { Table, Card, Button, Form, Input, Select, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const getRandomValueFromArray = (arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const randomPrice = generateRandomNumber(30, 180) * 1000
    const data = {
        name: book_name,
        description: des,
        category: category,
        buy_price: randomPrice,
        sell_price: randomPrice*1.1,
        author: author,
        age: getRandomValueFromArray(["3", "4"]),
        published_at: generateRandomNumber(2018,2024),
        publisher: getRandomValueFromArray(["Hà Nội", "Kim Đồng", "Trẻ", "Lao động"]),
        count: generateRandomNumber(300, 400),
        totalsale: generateRandomNumber(200,500),
        img: photo,
    };
    const handleAdd = () => {
        console.log(data);
        axios.post(`http://127.0.0.1:8000/api/books`, data, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(result => {
                if(result.status === 200) {
                    setAuthor('')
                    setBook_name('')
                    setDes('')
                    setPhoto('')
                    console.log(result);
                    message.config({
                        top: 100, // Thay đổi giá trị top tùy thuộc vào vị trí mong muốn
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Add book successfully')
                    }, 2000)
                }
                if(result.status===201){
                    message.config({
                        top: 100, // Thay đổi giá trị top tùy thuộc vào vị trí mong muốn
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Sach da ton tai')
                    }, 2000)
                }
                
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
                    <div className='bg-white rounded-md flex justify-center items-center px-5 py-4'>
                        <Form
                            labelCol={{ span: 20 }}
                            wrapperCol={{ span: 150 }}
                            layout="vertical"
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Name">
                                        <Input value={book_name} onChange={e => setBook_name(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Author">
                                        <Input value={author} onChange={e => setAuthor(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Category" labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={category} onChange={e => setCategory(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Age" labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Select value={age} onChange={value => setAge(value)}>
                                            <Select.Option value="1">Từ 0-6 tuổi </Select.Option>
                                            <Select.Option value="2">Từ 6-15 tuổi</Select.Option>
                                            <Select.Option value="3">Từ 15-18 tuổi</Select.Option>
                                            <Select.Option value="4">Trên 18 tuổi</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            {/* <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Buy Price" labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={buyprice} onChange={e => setBuyprice(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Sell Price" labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={sellprice} onChange={e => setSellprice(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row> */}

                            {/* <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Publish at">
                                        <Input value={publish_at} onChange={e => setPublish_at(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Publisher">
                                        <Select value={publisher} onChange={value => setPublisher(value)}>
                                            <Select.Option value="Hà Nội">Ha Noi</Select.Option>
                                            <Select.Option value="Kim Đồng">Kim Dong</Select.Option>
                                            <Select.Option value="Trẻ">Tre</Select.Option>
                                            <Select.Option value="Lap động">Lao dong</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row> */}
                            <Form.Item label="Description">
                                {/* <Input value={des} onChange={e => setDes(e.target.value)} /> */}
                                <div className=' max-w-[640px]'>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={des}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {

                                            console.log(event);
                                            const newtext = editor.getData()
                                            console.log('texthtml is ', newtext);
                                            setDes(newtext)
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />
                                </div>
                            </Form.Item>

                            {/* <Form.Item label="Count">
                                <Input value={count} onChange={e => setCount(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Total sale">
                                <Input value={totalsale} onChange={e => setTotalsale(e.target.value)} />
                            </Form.Item> */}
                            <Form.Item label="Photo">
                                <Input value={photo} onChange={e => setPhoto(e.target.value)} />
                            </Form.Item>
                            {/* <Form.Item
                                name="upload"
                                label="Upload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                extra="longgggggggggggggggggggggggggggggggggg"
                            >
                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item> */}
                            <div className='flex justify-start gap-1'>
                                <Button className=' bg-green-500 text-white' onClick={handleAdd}>Add</Button>
                                <Button className=' bg-red-600 text-white' onClick={handleClose}>Close</Button>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>

        </div>
    )
};

export default ProductAdd