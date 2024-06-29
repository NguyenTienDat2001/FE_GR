import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUrl } from "../../domain/domain";
import { Select } from "antd";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";
// import { Chart, CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, DoughnutController, ArcElement } from 'chart.js';
import { Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
const { Option } = Select;


const Dashboard = () => {
  // Chart.register(CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, DoughnutController, ArcElement);
  ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title, Tooltip, Legend);
  const navigate = useNavigate()
  const [revenue2023, setRevenue2023] = useState();
  const [revenue2024, setRevenue2024] = useState();
  const [order, setOrder] = useState();
  const [year, setYear] = useState("2024")
  const [userage, setUserage] = useState()
  const [usernum, setUsernum] = useState()
  const [ordernum, setOrdernum] = useState()
  const [totalnum, setTotalnum] = useState()
  const [books, setBooks] = useState()

  useEffect(() => {
    getLine();
    getAge();
    getNum();
    getBooks();
  }, []);
  useEffect(() => {
    getColumn(year);
  }, [year]);

  const getBooks = () => {
    fetch(`${apiUrl}/api/books/bestseller`, {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate('/login');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log('books is', data);
        setBooks(data.books)
      })
      .catch((error) => {
        console.log(error)
      }
      );
  }
  const getColumn = (year) => {
    axios.post(`${apiUrl}/api/reports/order`, {
      year: parseInt(year)
    })
      .then(result => {
        console.log(result);
        setOrder(result.data.data);
      })
      .catch(error => {
        console.error(error);
      })
  }
  const getNum = () => {
    fetch(`${apiUrl}/api/reports/number`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {

        setUsernum(data.user)
        setOrdernum(data.order)
        setTotalnum(data.total)
      })
      .catch((error) => {
        console.log(error)
      }
      );
  }
  const getLine = () => {
    fetch(`${apiUrl}/api/reports/revenue`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {

        setRevenue2023(data.monthlyOrders2023)
        setRevenue2024(data.monthlyOrders2024)
      })
      .catch((error) => {
        console.log(error)
      }
      );
  }
  const getAge = () => {
    fetch(`${apiUrl}/api/reports/age`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserage(data.data)
      })
      .catch((error) => {
        console.log(error)
      }
      );
  }
  const handleUser = () => {
    navigate('/admin/user')
  }
  const handleChange = (value) => {
    setYear(value);
  };
  return (
    <div>
      <div className="content-wrapper">

        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Thống kê</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active">Thống kê</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="content">
          <div className="container-fluid">
            <div className="flex justify-between gap-0">
              {/* <div className="col-lg-3 col-6">
                
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>New Orders</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div> */}

              <div className="col-lg-3 col-6">

                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{totalnum}Đ</h3>
                    <p>Tổng doanh thu</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  {/* <a href="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
                </div>
              </div>

              <div className="col-lg-3 col-6">

                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{usernum}</h3>
                    <p>Số khách hàng đăng ký</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  {/* <div onClick={handleUser} className="small-box-footer">Xem thêm <i className="fas fa-arrow-circle-right" /></div> */}
                </div>
              </div>

              <div className="col-lg-3 col-6">

                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{ordernum}</h3>
                    <p>Tổng đơn hàng hoàn thành</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  {/* <a href="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header border-0">
                    <div className="d-flex justify-content-between">
                      <h3 className="card-title text-lg font-bold">Thống kê doanh thu</h3>

                    </div>
                  </div>
                  <div className="card-body">
                    <Line
                      data={{
                        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        datasets: [
                          {
                            data: revenue2023,
                            label: "Năm 2023",
                            borderColor: "#3e95cd",
                            fill: false
                          },
                          {
                            data: revenue2024,
                            label: "Năm 2024",
                            borderColor: "#8e5ea2",
                            fill: false
                          },
                        ]
                      }}
                      options={{
                        title: {
                          display: true,
                          text: "World population per region (in millions)"
                        },
                        legend: {
                          display: true,
                          position: "bottom"
                        }
                      }}
                    />
                    <div className="d-flex flex-row justify-content-end">
                      <span className="mr-2">
                        {/* <i className="fas fa-square text-primary" /> Các tháng trong năm */}
                        Các tháng trong năm
                      </span>
                    </div>
                  </div>
                </div>
                {/* /.card */}
                <div className="card">
                  <div className="card-header border-0">
                    <h3 className="card-title text-lg font-bold">Sản phẩm bán chạy</h3>
                    {/* <div className="card-tools">
                      <a href="/" className="btn btn-tool btn-sm">
                        <i className="fas fa-download" />
                      </a>
                      <a href="/" className="btn btn-tool btn-sm">
                        <i className="fas fa-bars" />
                      </a>
                    </div> */}
                  </div>
                  <div className="card-body table-responsive p-0 pt-3">
                    <table className="table table-striped table-valign-middle">
                      <thead>
                        <tr>
                          <th>Tên sản phẩm</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books && books.slice(0, 8).map(book => (
                          <tr>
                            <td>
                              <div className="flex items-center">
                              <img src={book.img} alt="Product 1" className=" img-size-32 mr-2" />
                              <div>
                              {book.name}
                              </div>
                              </div>
                            </td>
                            <td>{book.sell_price}đ</td>
                            <td>
                              {book.totalsale}
                            </td>
                          </tr>
                        ))}


                      </tbody>
                    </table>
                  </div>
                </div>
                {/* /.card */}
              </div>
              {/* /.col-md-6 */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header border-0">
                    <div className="d-flex justify-content-between">
                      <h3 className="card-title text-lg font-bold">Thống kê đơn hàng</h3>

                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <Bar
                        data={{
                          labels: [
                            "T1",
                            "T2",
                            "T3",
                            "T4",
                            "T5",
                            "T6",
                            "T7",
                            "T8",
                            "T9",
                            "T10",
                            "T11",
                            "T12",

                          ],
                          datasets: [
                            {
                              label: "Số đơn hàng trong tháng",
                              backgroundColor: [
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                                "#3e95cd",
                              ],
                              data: order
                            }
                          ]
                        }}
                        options={{
                          legend: { display: false },
                          title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                          }
                        }}
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                      <span className="mr-2">
                        Năm <Select value={year} onChange={handleChange} className=' w-28 h-6'>
                          <Option value="2024">2024</Option>
                          <Option value="2023">2023</Option>
                        </Select>
                      </span>
                    </div>
                  </div>
                </div>
                {/* /.card */}
                <div className="card">
                  <div className="card-header border-0">
                    <h3 className="card-title text-lg font-bold">Thống kê số lượng người dùng theo độ tuổi</h3>
                    {/* <div className="card-tools">
                      <a href="/" className="btn btn-sm btn-tool">
                        <i className="fas fa-download" />
                      </a>
                      <a href="/" className="btn btn-sm btn-tool">
                        <i className="fas fa-bars" />
                      </a>
                    </div> */}
                  </div>
                  <div className="card-body">
                    <div>
                      <Doughnut
                        data={{
                          labels: [
                            "Dưới 18",
                            "Từ 18 đến 30",
                            "Trên 30",
                          ],
                          datasets: [
                            {
                              label: "Số khách hàng",
                              backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f"
                              ],
                              data: userage
                            }
                          ]
                        }}
                        option={{
                          title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                          }
                        }}
                      />

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard