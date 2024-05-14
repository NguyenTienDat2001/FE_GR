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
const Dashboard = () => {
  // Chart.register(CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, DoughnutController, ArcElement);
  ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title, Tooltip, Legend);
  return (
    <div>
      <div className="content-wrapper">

        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Event List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active">Events</li>
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
                    <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                    <p>Bounce Rate</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
             
              <div className="col-lg-3 col-6">
              
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>User Registrations</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
             
              <div className="col-lg-3 col-6">
               
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>Unique Visitors</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
             
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header border-0">
                    <div className="d-flex justify-content-between">
                      <h3 className="card-title">Online Store Visitors</h3>

                    </div>
                  </div>
                  <div className="card-body">
                    <Line
                      data={{
                        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                        datasets: [
                          {
                            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                            label: "Africa",
                            borderColor: "#3e95cd",
                            fill: false
                          },
                          {
                            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                            label: "Asia",
                            borderColor: "#8e5ea2",
                            fill: false
                          },
                          {
                            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                            label: "Europe",
                            borderColor: "#3cba9f",
                            fill: false
                          },
                          {
                            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                            label: "Latin America",
                            borderColor: "#e8c3b9",
                            fill: false
                          },
                          {
                            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                            label: "North America",
                            borderColor: "#c45850",
                            fill: false
                          }
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
                        <i className="fas fa-square text-primary" /> This Week
                      </span>
                    </div>
                  </div>
                </div>
                {/* /.card */}
                <div className="card">
                  <div className="card-header border-0">
                    <h3 className="card-title">Products</h3>
                    <div className="card-tools">
                      <a href="/" className="btn btn-tool btn-sm">
                        <i className="fas fa-download" />
                      </a>
                      <a href="/" className="btn btn-tool btn-sm">
                        <i className="fas fa-bars" />
                      </a>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-striped table-valign-middle">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Sales</th>
                          <th>More</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img src="dist/img/default-150x150.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                            Some Product
                          </td>
                          <td>$13 USD</td>
                          <td>
                            <small className="text-success mr-1">
                              <i className="fas fa-arrow-up" />
                              12%
                            </small>
                            12,000 Sold
                          </td>
                          <td>
                            <a href="/" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>

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
                      <h3 className="card-title">Sales</h3>

                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <Bar
                        data={{
                          labels: [
                            "Africa",
                            "Asia",
                            "Europe",
                            "Latin America",
                            "North America"
                          ],
                          datasets: [
                            {
                              label: "Population (millions)",
                              backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                              ],
                              data: [2478, 5267, 734, 784, 433]
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
                        <i className="fas fa-square text-primary" /> This year
                      </span>
                      <span>
                        <i className="fas fa-square text-gray" /> Last year
                      </span>
                    </div>
                  </div>
                </div>
                {/* /.card */}
                <div className="card">
                  <div className="card-header border-0">
                    <h3 className="card-title">Online Store Overview</h3>
                    <div className="card-tools">
                      <a href="/" className="btn btn-sm btn-tool">
                        <i className="fas fa-download" />
                      </a>
                      <a href="/" className="btn btn-sm btn-tool">
                        <i className="fas fa-bars" />
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <Doughnut
                        data={{
                          labels: [
                            "Africa",
                            "Asia",
                            "Europe",
                            "Latin America",
                            "North America"
                          ],
                          datasets: [
                            {
                              label: "Population (millions)",
                              backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                              ],
                              data: [2478, 5267, 734, 784, 433]
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