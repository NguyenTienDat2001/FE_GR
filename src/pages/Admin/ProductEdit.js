import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Table, Card, Button, Form, Input, Select, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { storage } from '../../firebase/config';
import { apiUrl } from '../../domain/domain';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import "./Product.css";
import axios from 'axios';
const ProductEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
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
    const [progress, setProgress] = useState(0);
    const [book, setBook] = useState()

    // const [photo, setPhoto] = useState()
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const handleClose = () => {
        navigate('/admin/product')
    }
    const token = localStorage.getItem('token');
    useEffect(() => {
        getBook();
    }, []);
    const getBook = () => {
        axios.get(`${apiUrl}/api/books/${id}`, {
            headers: {
                'Authorization': token
            }
        },)
            .then(res => {
                setBook_name(res.data.book.name)
                setAuthor(res.data.book.author)
                setCategory(res.data.book.category)
                setBuyprice(res.data.book.buy_price)
                setSellprice(res.data.book.sell_price)
                setAge(res.data.book.age)
                setPublish_at(res.data.book.published_at)
                setPublisher(res.data.book.publisher)
                setPublisher(res.data.book.publisher)
                setImageUrl(res.data.book.img)
                setCount(res.data.book.count)
                setTotalsale(res.data.book.totalsale)
                setDes(res.data.book.description)
            })
            .catch(error => console.log(error));
    }
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!image) return;

        const imageRef = ref(storage, `avatars/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImageUrl(url);
                    console.log('File available at', url);
                });
            }
        );
    };
    const data = {
        book_id: id,
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
        img: imageUrl,
    };
    const handleUpdate = () => {
        console.log(data);
        axios.post(`${apiUrl}/api/books/update`, data)
            .then(result => {
                console.log(result);

                getBook();
                message.config({
                    top: 100, 
                    duration: 2,
                });
                setTimeout(() => {
                    message.success('Sửa thành công')
                }, 2000)

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
                                <h1>Thêm sản phẩm</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Thêm sản phẩm</li>
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
                            onFinish={handleUpdate}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên sách"

                                    >
                                        <Input value={book_name} onChange={e => setBook_name(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tác giả"

                                    >
                                        <Input value={author} onChange={e => setAuthor(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Thể loại"

                                        labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        {/* <Input value={category} onChange={e => setCategory(e.target.value)} /> */}
                                        <Select value={category} onChange={value => setCategory(value)}>
                                            <Select.Option value="Truyện tranh">Truyện tranh </Select.Option>
                                            <Select.Option value="Truyện chữ">Truyện chữ</Select.Option>
                                            <Select.Option value="Văn học">Văn học</Select.Option>
                                            <Select.Option value="Kinh tế">Kinh tế</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tuổi"

                                        labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Select value={age} onChange={value => setAge(value)}>
                                            <Select.Option value="1">Từ 0-6 tuổi </Select.Option>
                                            <Select.Option value="2">Từ 6-15 tuổi</Select.Option>
                                            <Select.Option value="3">Từ 15-18 tuổi</Select.Option>
                                            <Select.Option value="4">Trên 18 tuổi</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Giá mua"

                                        labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={buyprice} onChange={e => setBuyprice(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Giá bán"

                                        labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={sellprice} onChange={e => setSellprice(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Số lượng"

                                        labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={count} onChange={e => setCount(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Đã bán"

                                        labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={totalsale} onChange={e => setTotalsale(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Năm xuất bản"

                                    >
                                        <Input value={publish_at} onChange={e => setPublish_at(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="NXB"

                                    >
                                        <Select value={publisher} onChange={value => setPublisher(value)}>
                                            <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                                            <Select.Option value="Kim Đồng">Kim Đồng</Select.Option>
                                            <Select.Option value="Trẻ">Trẻ</Select.Option>
                                            <Select.Option value="Lap động">Lao động</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                label="Description"
                                name="Description"

                            >
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
                            <Form.Item label="Ảnh">
                                {/* <Input value={photo} onChange={e => setPhoto(e.target.value)} /> */}
                                <div>
                                    {imageUrl && (
                                        <div>
                                            <img className=' pb-3' src={imageUrl} alt="Uploaded Avatar" height="150px" width="150px" />
                                            <a className='font-bold text-base' href={imageUrl} target="_blank" rel="noopener noreferrer">Xem ảnh</a>
                                        </div>
                                    )}
                                    <div className='pt-2 pb-2'>
                                        <input type="file" onChange={handleChange} />
                                    </div>
                                    <div className='mt-[12px]' >
                                        <Button className=' bg-green-400' onClick={handleUpload}><span className='text-bold text-base text-white'>Upload</span></Button>
                                    </div>
                                    <br />

                                </div>
                            </Form.Item>

                            <Form.Item>
                                <div className='flex justify-start gap-1'>
                                    <Button className=' bg-green-500 text-white' type="primary" htmlType="submit">Sửa</Button>
                                    <Button className=' bg-red-600 text-white' onClick={handleClose}>Đóng</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>

        </div>
    )
};

export default ProductEdit