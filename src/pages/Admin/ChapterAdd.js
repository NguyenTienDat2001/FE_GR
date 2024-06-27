import { useState, useEffect } from 'react';
import { Table, Card, Button, Form, Input, Select, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./Product.css";
import axios from 'axios';
const ChapterAdd = () => {
    const navigate = useNavigate()
    const [book_name, setBook_name] = useState()
    const [des, setDes] = useState()
    const [chapter, setChapter] = useState()
    const [title, setTitle] = useState()

    const handleClose = () => {
        navigate('/admin/product')
    }
    const data = {
        book_id: parseInt(book_name, 10),
        chapter_id: parseInt(chapter, 10),
        title: title,
        description: des,
    };
    const handleAdd = () => {
        console.log(data);
        axios.post(`http://127.0.0.1:8000/api/books/chapter`, data, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(result => {
                console.log(result);
                if(result.status === 200) {
                    message.config({
                        top: 100, 
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Thành công')
                    }, 2000)
                    setBook_name("")
                    setDes('')
                    setTitle('')
                    setChapter('')
                }
                if(result.status === 202) {
                    console.log(result.data.message);
                    message.config({
                        top: 100, 
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success(result.data.message)
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
                                <h1>Thêm chương</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Thêm chương</li>
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
                                    <Form.Item label="Book ID">
                                        <Input value={book_name} onChange={e => setBook_name(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Chapter">
                                        <Input value={chapter} onChange={e => setChapter(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Title">
                                        <Input value={title} onChange={e => setTitle(e.target.value)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="Mô tả">
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

export default ChapterAdd