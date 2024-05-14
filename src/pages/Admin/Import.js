import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
const Import = () => {
    const navigate = useNavigate()
    const viewDetail = (id) => {
        navigate(`/admin/imexport/${id}`)
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case "0":
                        return 'Pending';
                    case "1":
                        return 'Acceptted';
                    case "2":
                        return 'Denied';
                    default:
                        return 'Unknown Type';
                }
            },
        },
        {
            title: 'Create',
            dataIndex: 'create_at',
            key: 'careate_at',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
            // width: '300px',
        },
        {
            title: 'Update',
            dataIndex: 'update_at',
            key: 'update_at',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
            // width: '300px',
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'action',
            render: (text, record) => {
                if (text !== '0') {
                    return <div>
                        <span className="btn btn-primary btn-sm" onClick={() => viewDetail(record.id)}>
                            <i className="fas fa-eye">
                            </i>
                            View
                        </span>
                    </div>
                }
                else {
                    return <div>
                        <span className="btn btn-primary btn-sm" onClick={() => viewDetail(record.id)} href='/'>
                            <i className="fas fa-eye">
                            </i>
                            View
                        </span>
                        <span className="btn btn-info btn-sm" onClick={() => updateHistory(record.id, 1)}>
                            <i className="fas fa-check-circle">
                            </i>
                            Accept
                        </span>
                        <span className="btn btn-danger btn-sm" onClick={() => updateHistory(record.id, 2)}>
                            <i className="fas fa-times-circle">
                            </i>
                            Deny
                        </span>
                    </div>
                }
            },
        },
    ];
    const handleAdd = () => {
        navigate('/admin/import/add')
    }
    const updateHistory = (id, status) => {
        axios.put(`http://localhost:8000/api/imexport/${id}/${status}`)
            .then(res => {
                if (res.data.status === 200) {
                    console.log('update sucessfully');
                }
            });
    }
    const [inports, setInports] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/import')
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setInports(data.imports)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Import List</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Imports</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Import list"
                    bordered={false}
                    extra={<Button className=' bg-green-500' onClick={handleAdd} type="primary">Thêm</Button>}
                >
                    <Table dataSource={inports} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Import