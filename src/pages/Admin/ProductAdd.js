import { useState, useEffect } from 'react';
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
  const [progress, setProgress] = useState(0);

    // const [photo, setPhoto] = useState()
    const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
    const handleClose = () => {
        navigate('/admin/product')
    }
    // const generateRandomNumber = (min, max) => {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    // const getRandomValueFromArray = (arr) => {
    //     const randomIndex = Math.floor(Math.random() * arr.length);
    //     return arr[randomIndex];
    // }

    // const randomPrice = generateRandomNumber(30, 180) * 1000
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
        name: book_name,
        description: des,
        category: category,
        buy_price: buyprice,
        sell_price: sellprice,
        author: author,
        age: age,
        published_at: publish_at,
        publisher: publisher,
        count: 0,
        totalsale: 0,
        img: imageUrl,
    };
    const handleAdd = () => {
        console.log(data);
        axios.post(`${apiUrl}/api/books`, data, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(result => {
                if (result.status === 200) {
                    setAuthor('')
                    setBook_name('')
                    setDes('')
                    // setPhoto('')
                    setImageUrl('')
                    setCategory('')
                    setAge('')
                    setBuyprice('')
                    setSellprice('')
                    setPublish_at('')
                    setPublisher('')
                    console.log(result);
                    message.config({
                        top: 100, // Thay đổi giá trị top tùy thuộc vào vị trí mong muốn
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Thêm thành công')
                    }, 2000)
                }
                if (result.status === 201) {
                    message.config({
                        top: 100, // Thay đổi giá trị top tùy thuộc vào vị trí mong muốn
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Sách đã tồn tại')
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
                            onFinish={handleAdd}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên sách"
                                        name="Tên sách"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập tên sách',
                                            },
                                        ]}
                                    >
                                        <Input value={book_name} onChange={e => setBook_name(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tác giả"
                                        name="Tác giả"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập tác giả',
                                            },
                                        ]}
                                    >
                                        <Input value={author} onChange={e => setAuthor(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Thể loại"
                                        name="Thể loại"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập thể loại',
                                            },
                                        ]}
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
                                        name="Tuổi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập tuổi',
                                            },
                                        ]}
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
                                        name="Buy Price"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập giá mua',
                                            },
                                        ]}
                                        labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={buyprice} onChange={e => setBuyprice(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Giá bán"
                                        name="Sell Price"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập giá bán',
                                            },
                                        ]}
                                        labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                                        <Input value={sellprice} onChange={e => setSellprice(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Năm xuất bản"
                                        name="Năm xuất bản"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập năm xuất bản',
                                            },
                                        ]}
                                    >
                                        <Input value={publish_at} onChange={e => setPublish_at(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="NXB"
                                        name="Publisher"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập tên NXB',
                                            },
                                        ]}
                                    >
                                        <Select value={publisher} onChange={value => setPublisher(value)}>
                                            <Select.Option value="Hà Nội">Ha Noi</Select.Option>
                                            <Select.Option value="Kim Đồng">Kim Dong</Select.Option>
                                            <Select.Option value="Trẻ">Tre</Select.Option>
                                            <Select.Option value="Lap động">Lao dong</Select.Option>
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
                                    <Button className=' bg-green-500 text-white' type="primary" htmlType="submit">Thêm</Button>
                                    <Button className=' bg-red-600 text-white' onClick={handleClose}>Đóng</Button>
                                </div>
                            </Form.Item>
                        </Form>
                        {/* <Form
                            labelCol={{ span: 20 }}
                            wrapperCol={{ span: 150 }}
                            layout="vertical"
                            onFinish={handleAdd}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên sách"
                                        name='Tên sách'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập tên sách',
                                            },
                                        ]}
                                    >
                                        <Input value={book_name} onChange={e => setBook_name(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Please enter a valid email address',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên sách"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập tên sách',
                                            },
                                        ]}
                                    >
                                        <Input value={book_name} onChange={e => setBook_name(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tác giả"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input value={author} onChange={e => setAuthor(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item wrapperCol={{ offset: 6 }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form> */}
                    </div>
                </div>

            </div>

        </div>
    )
};

export default ProductAdd