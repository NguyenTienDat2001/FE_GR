import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button, message, Select } from 'antd';
import axios from 'axios';
const { Option } = Select;
const Export = () => {
    const navigate = useNavigate()
    const [exports, setExports] = useState([])
    const [selectedValue, setSelectedValue] = useState('all');
    const viewDetail = (id) => {
        navigate(`/admin/imexport/${id}`)
    }
    const handleChange = (value) => {
        setSelectedValue(value);
    };
    const columns = [
        {
            title: 'Mã Id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => text.toString().padStart(5, '0'),
        },
        {
            title: 'Ngày tạo đơn',
            dataIndex: 'createdAt',
            key: 'careatedAt',
            // width: '300px',
        },
        {
            title: 'Cập nhật lần cuối',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            // width: '300px',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let color;
                let statusText;

                switch (text) {
                    case "0":
                        statusText = 'CHỜ XỬ LÝ';
                        color = 'blue';
                        break;
                    case "1":
                        statusText = 'ĐỒNG Ý';
                        color = 'green';
                        break;
                    case "2":
                        statusText = 'TỪ CHỐI';
                        color = 'red';
                        break;
                    default:
                        statusText = 'Unknown Type';
                        color = 'black';
                }

                return <span style={{ color, fontWeight: 'bold' }}>{statusText}</span>;
            },
        },
        {
            title: '',
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
                        <span className="btn btn-info btn-sm" onClick={() => updateHistory(record.id, '1')}>
                            <i className="fas fa-check-circle">
                            </i>
                            Accept
                        </span>
                        <span className="btn btn-danger btn-sm" onClick={() => updateHistory(record.id, '2')}>
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
        navigate('/admin/export/add')
    }
    const updateHistory = (id, status) => {
        axios.post('http://localhost:8000/api/imexports/update', {
            id: id,
            status: status
        })
            .then(res => {
                if (res.status === 200) {
                    getExport()
                } else if (res.status === 201) {
                    message.config({
                        top: 100,
                        duration: 2,
                    });
                    setTimeout(() => {
                        message.success('Sản phẩm trong kho không đủ')
                    }, 2000)
                }
            });
    }
    useEffect(() => {
        getExport()
    }, []);
    const getExport = () => {
        fetch('http://127.0.0.1:8000/api/imexports/export')
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setExports(data.exports)
            })
            .catch((error) => console.log(error));
    }
    let filteredExports = exports;
    if (selectedValue !== 'all') {
        filteredExports = exports.filter(item => item.status === selectedValue);
    }
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Đơn xuất hàng</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Xuất hàng</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Đơn xuất hàng"
                    bordered={false}
                    extra={
                        <div className='flex gap-1'>
                            <Select value={selectedValue} onChange={handleChange} className=' w-36'>
                                <Option value="all">Tất cả</Option>
                                <Option value="0">Chờ xử lý</Option>
                                <Option value="1">Đồng ý</Option>
                                <Option value="2">Từ chối</Option>
                            </Select>
                            <Button className=' bg-green-500' onClick={handleAdd} type="primary">Thêm</Button>
                        </div>
                    }
                >
                    <Table dataSource={filteredExports} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Export