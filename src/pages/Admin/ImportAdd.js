import { useState } from 'react';
import { Card, message, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ImportAdd = () => {

    const [formData, setFormData] = useState({
        type: "0",
        books: [
        ],
    });

    const handleBookChange = (index, field, value) => {
        const updatedBooks = [...formData.books];
        updatedBooks[index][field] = value;
        setFormData({
            ...formData,
            books: updatedBooks,
        });
    };

    const handleAddBook = () => {
        setFormData({
            ...formData,
            books: [...formData.books, { book_id: null, quantity: null }],
        });
    };

    const handleRemoveBook = (index) => {
        const updatedBooks = [...formData.books];
        updatedBooks.splice(index, 1);
        setFormData({
            ...formData,
            books: updatedBooks,
        });
    };
    const navigate = useNavigate()
    const handleClose = () => {
        navigate('/admin/import')
    }
    const handleAdd = () => {
        console.log(formData);
        axios.post(`http://127.0.0.1:8000/api/imexports`, formData)
            .then(result => {
                console.log(result);
                if(result.status === 200) {
                    message.config({
                        top: 100,
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Tạo thành công')
                    }, 2000)
                } else if (result.status === 201) {
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
                                <h1>Thêm đơn nhập hàng</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                                    <li className="breadcrumb-item active">Nhập hàng</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: "80%" }}>
                        {formData.books.map((book, index) => (
                            <div key={index}>
                                <label>Book ID</label>
                                <input
                                    className='w-40 h-8'
                                    value={book.book_id || ''}
                                    onChange={(e) => handleBookChange(index, 'book_id', e.target.value)}
                                />
                                {/* <Input className='w-40' value={book.book_id || ''} onChange={(e) => handleBookChange(index, 'book_id', e.target.value)} /> */}

                                <label>Số lượng</label>
                                <input
                                    className='w-40 h-8'
                                    type="number"
                                    value={book.quantity || ''}
                                    onChange={(e) => handleBookChange(index, 'quantity', e.target.value)}
                                />

                                <div className='py-2 w-3'>
                                    <button className=' bg-red-500 w-16 flex items-center justify-center' type="button" onClick={() => handleRemoveBook(index)}>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className=''>
                            <button className='bg-green-500 w-16 flex items-center justify-center' type="button" onClick={handleAddBook}>
                                Thêm
                            </button>
                        </div>
                        <div className='pt-2 flex gap-1'>
                            <button className=' bg-blue-500 w-16 flex items-center justify-center' type="button" onClick={handleAdd}>
                                Tạo
                            </button>
                            <button className=' bg-red-500 w-16 flex items-center justify-center' type="button" onClick={handleClose}>
                                Đóng
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    )
};

export default ImportAdd