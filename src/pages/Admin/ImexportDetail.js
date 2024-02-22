import { useParams } from "react-router-dom";
import { Card, Table } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";
function ImexportDetail() {
    const { id } = useParams()
    const [books, setBooks] = useState()
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/imexport/${id}`)
            .then(res => {
                setBooks(res.data.books)
            })
            .catch(error => console.log(error));
    }, []);
    console.log('item is', books);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'book_id',
            key: 'book_id',
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
                                <h1>Imexport Detail</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Imexport Detail</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Book list"
                    bordered={false}
                >
                    <Table dataSource={books} columns={columns} />
                </Card>
            </div>

        </div>
    );
}

export default ImexportDetail;
