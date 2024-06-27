import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Card, Button, Select, Tag, message } from 'antd';
const Staff = () => {
    const [updatedStaffs, setUpdatedStaffs] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [staffs, setStaffs] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const handleSave = () => {
        let index = -1
        for (let i = 0; i < updatedStaffs.length; i++) {
            if (JSON.stringify(updatedStaffs[i]) !== JSON.stringify(staffs[i])) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            console.log(updatedStaffs[index]);
            axios.post(`http://127.0.0.1:8000/api/users/permiss`, {
                userId: updatedStaffs[index].id,
                permiss: updatedStaffs[index].permiss,

            })
            .then(res => {
                message.config({
                    top: 100,
                    duration: 2,
                });
                message.success('Cập nhật quyền thành công, chờ tải lại trang...');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
                console.error(error);
            })
            // setStaffs(updatedStaffs);
        }

        // Reset editingIndex về null sau khi lưu
        setEditingIndex(null);
    };


    const handlePermissionChange = (index, value) => {
        const updatedStaff = { ...staffs[index], permiss: value };
        const newStaffs = [...staffs];
        newStaffs[index] = updatedStaff;
        setUpdatedStaffs(newStaffs);
        setEditingIndex(index);
    };
    const options = [
        {
            value: 1,
            label: 'Thêm sách',
            color: 'green',
        },
        {
            value: 2,
            label: 'Xóa sách',
            color: 'red',
        },
        {
            value: 3,
            label: 'Thêm coupon',
            color: 'green',
        },
        {
            value: 4,
            label: 'Xóa coupon',
            color: 'red',
        },
    ];

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const option = options.find(option => option.value === value); // Tìm tùy chọn tương ứng với giá trị của tag
        const color = option ? option.color : ''; // Lấy màu từ tùy chọn nếu tồn tại, nếu không trả về một giá trị mặc định (trong trường hợp này là chuỗi rỗng)

        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                }}
            >
                {label}
            </Tag>
        );
    };


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '100px',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '300px',
        },
        {
            title: 'Permission',
            dataIndex: 'permiss',
            key: 'permiss',
            width: '400px',
            render: (permiss, record, index) => {
                const permissOptions = permiss.map((value) => {
                    const option = options.find((opt) => opt.value === value);
                    return option;
                });

                return (
                    <Select
                        mode="multiple"
                        tagRender={tagRender}
                        defaultValue={permissOptions}
                        style={{ width: '100%' }}
                        options={options}
                        onChange={(value) => handlePermissionChange(index, value)}
                        disabled={!isAdmin}
                    />

                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <Button className=' bg-blue-600' type="primary" onClick={handleSave} disabled={editingIndex !== index}>
                    Save
                </Button>
            ),
        },

    ];

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users/profile', {
          headers: {
            'Authorization': localStorage.getItem('token')
          },
        })
          .then(res => {
                if(res.data.user.role === "0") {
                    setIsAdmin(true)
                }
          })
          .catch(error => console.log(error));
      }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/users/admin')
            .then((response) => response.json())
            .then((data) => {
                setStaffs(data.admins)
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
                                <h1>Quản lý nhân viên</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active">Nhân viên</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Danh sách nhân viên"
                    bordered={false}
                >
                    <Table dataSource={staffs} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Staff