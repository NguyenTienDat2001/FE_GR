import { useState } from 'react';
import { Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ImportAdd = () => {

    const [formData, setFormData] = useState({
        type: "0",
        books: [
            { book_id: 1, quantity: 2 },
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
        navigate('/admin/export')
    }
    const handleAdd = () => {
        console.log(formData);
        axios.post(`http://127.0.0.1:8000/api/imexport`, formData)
            .then(result => {
                console.log(result);
                message.config({
                    top: 100, // Thay đổi giá trị top tùy thuộc vào vị trí mong muốn
                    duration: 2,
                });
                setTimeout(() => {
                    message.success('Add export bill successfully')
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
                                <h1>Export Add</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                                    <li className="breadcrumb-item active">Exports</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: "80%" }}>
                        {formData.books.map((book, index) => (
                            <div key={index}>
                                <label>Book ID:</label>
                                <input
                                    type="number"
                                    value={book.book_id || ''}
                                    onChange={(e) => handleBookChange(index, 'book_id', e.target.value)}
                                />

                                <label>Quantity:</label>
                                <input
                                    type="number"
                                    value={book.quantity || ''}
                                    onChange={(e) => handleBookChange(index, 'quantity', e.target.value)}
                                />

                                <button type="button" onClick={() => handleRemoveBook(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddBook}>
                            Add Book
                        </button>
                        <button type="button" onClick={handleAdd}>
                            Submit
                        </button>
                        <button type="button" onClick={handleClose}>
                            Close
                        </button>
                    </Card>
                </div>
            </div>

        </div>
    )
};

export default ImportAdd