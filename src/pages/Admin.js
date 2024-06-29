import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../domain/domain';
import './Admin.css';
const Admin = () => {
  const [borrows, setBorrows] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${apiUrl}/borrow`)
      .then((response) => response.json())
      .then((data) => setBorrows(data))
      .catch((error) => console.log(error));
  }, []);

  const handleCheck = (borrow_id) => {
    const url = `${apiUrl}/borrow/${borrow_id}`;
    const data = {
      status: 1
    };
    console.log(data);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        navigate('/admin');
        window.location.reload();
        console.log(result);

      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
  };
  return (
    <div>
      <Link to='/login' >
        <button type="submit">Log out</button>
      </Link>
      <h3>Role: Admin</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Book</th>
            <th>Status</th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => (
            <tr key={borrow._id}>
              <td>{borrow._id}</td>
              <td>{borrow.user.user}</td>
              <td>{borrow.book.name}</td>
              <td>
                {borrow.status ? (
                  <button style={{ backgroundColor: 'green' }}>Checked</button>
                ) : (
                  <button style={{ backgroundColor: 'gray' }}>Not Check</button>
                )}
              </td>

              <td>
                {borrow.status ? (
                  <div></div>
                ) : (
                  <button onClick={() => handleCheck(borrow._id)} style={{ backgroundColor: 'green' }}> Check</button>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;


