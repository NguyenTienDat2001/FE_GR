import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button, Select } from 'antd';
import { apiUrl } from '../../domain/domain';
import axios from 'axios';
const { Option } = Select;
const Import = () => {
    const navigate = useNavigate()
    const [imports, setImports] = useState([])
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
            key: 'createdAt',
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
        navigate('/admin/import/add')
    }
    const updateHistory = (id, status) => {
        axios.post(`${apiUrl}/api/imexports/update`, {
            id: id,
            status: status
        })
            .then(res => {
                getImport()
            });
    }
    useEffect(() => {
        getImport()
    }, []);

    const getImport = () => {
        fetch(`${apiUrl}/api/imexports/import`)
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setImports(data.imports)
            })
            .catch((error) => console.log(error));
    }
    let filteredImports = imports;
    if (selectedValue !== 'all') {
        filteredImports = imports.filter(item => item.status === selectedValue);
    }
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Đơn nhập hàng</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Nhập hàng</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Đơn nhập hàng"
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
                    <Table dataSource={filteredImports} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Import