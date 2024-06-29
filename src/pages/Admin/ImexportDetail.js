import { useParams } from "react-router-dom";
import { Card, Table } from 'antd';
import { apiUrl } from "../../domain/domain";
import axios from "axios";
import { useState, useEffect } from "react";
function ImexportDetail() {
    const { id } = useParams()
    const [books, setBooks] = useState()
    useEffect(() => {
        axios.get(`${apiUrl}/api/imexports/detail/${id}`)
            .then(res => {
                setBooks(res.data.books)
            })
            .catch(error => console.log(error));
    }, [id]);
    console.log('item is', books);
    const columns = [
        {
            title: 'Mã ID',
            dataIndex: 'book_id',
            key: 'book_id',
            width: '100px',
        },
        {
            title: 'Tên sách',
            dataIndex: 'name',
            key: 'name',
            width: '500px',
        },
        {
            title: 'Số lượng',
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
                                <h1>Thông tin chi tiết</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Thông tin chi tiết</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Danh sách sản phẩm"
                    bordered={false}
                >
                    <Table dataSource={books} columns={columns} />
                </Card>
            </div>

        </div>
    );
}

export default ImexportDetail;
