// LoginForm.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const handleLogout = (event) => {
    localStorage.setItem('isAuthenticated', false);
  };

  useEffect(() => {
    // Gọi API để lấy dữ liệu danh sách cuốn sách
    fetch('http://127.0.0.1:8000/book')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Gọi API để lấy dữ liệu danh sách cuốn sách
    fetch('http://127.0.0.1:8000/borrow')
      .then((response) => response.json())
      .then((data) => setBorrows(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(borrows);
  const checkBorrow = (book_id) => {
    const result = borrows.find(borrow => borrow.book._id === book_id && borrow.user._id === localStorage.getItem("user_id"));
    if (result) {
      console.log(result.status);
      return result.status;
    } else {
      return -1; // Giá trị trả về khi không tìm thấy
    }
  };

  const handlePending = (book_id) => {
    const result = borrows.find(borrow => borrow.book._id === book_id && borrow.user._id === localStorage.getItem("user_id"));
    const url = `http://localhost:8000/borrow/${result._id}`;
    const data = {
      status: -1
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

        window.location.reload();
        console.log(result);

      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });


  };

  const handleBook = (book) => {

    const url = 'http://localhost:8000/borrow';
    const data = {
      user: localStorage.getItem("user_id"),
      book: book,
      status: 0
    };
    console.log(data);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        window.location.reload();
        // console.log(result);

      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });


  };

  const handleCart = (id) => {
    // localStorage.setItem('book_id', id);
    
    const url = 'http://localhost:8000/order/add';
    const data = {
      user: localStorage.getItem("user_id"),
      books: [{book:id, quantity: 1}],
    };
    console.log(data);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        window.location.reload();
        // console.log(result);

      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });



    navigate('/cart');

  }

  // Chuyển hướng đến trang Dashboard

  return (
    <div>
      <h3>Hello <Link style={{ textDecoration: "none" }} to="/info">{username}</Link></h3>
      <Link to='/cart' >
        <button type="submit">Cart</button>
      </Link>
      <form onSubmit={handleLogout}>
        <Link to='/login' >

          <button type="submit">Log out</button>
        </Link>
      </form>
      <h4>Our book </h4>
      <ul>

      </ul>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Book</th>
            <th scope="col">Status</th>
            <th scope="col">Buy</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr>
              <td>{book._id}</td>
              <td>{book.name}</td>
              <td>

                {checkBorrow(book._id) === 1 && <button style={{ backgroundColor: 'grey' }}>Borrowed</button>}
                {checkBorrow(book._id) === 0 && <button onClick={() => handlePending(book._id)} style={{ backgroundColor: 'green' }}>Pending</button>}
                {checkBorrow(book._id) === -1 && <button onClick={() => handleBook(book._id)} style={{ backgroundColor: 'red' }}>Borrow</button>}
              </td>
              <td>
                
                <button onClick={()=>handleCart(book._id)}>Buy</button>
                
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginForm;
