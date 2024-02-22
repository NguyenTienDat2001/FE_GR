import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './route/route';
import { Fragment } from 'react';
import './App.css';
// import { AuthContextProvider } from './context/AuthContext';
function App() {
  return (
      
          <div style={{ backgroundColor:'rgba(217, 217, 217, 0.23)'}}>
              <Routes>
                  {publicRoutes.map((route, index) => {
                      const Page = route.element;
                      let Layout = Fragment;

                      if (route.layout) {
                          Layout = route.layout;
                      }

                      return (
                          <Route
                              key={index}
                              path={route.path}
                              element={
                                      <Layout>
                                          <Page />
                                      </Layout>
                              }
                          />
                      );
                  })}
              </Routes>
          </div>
      
  );
}

export default App;



















// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import './App.css';
// import Detail from './pages/Detail'
// import Home from './pages/Home'
// import LoginForm from './pages/LoginForm';
// import SignupForm from './pages/SignupForm';
// import ProtectedRoute from './pages/ProtectedRoute';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import Admin from './pages/Admin';
// import SuperAdmin from './pages/SuperAdmin';
// import Cart from './pages/Cart';
// import Header from './component/Header';

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route element={<ProtectedRoute />}>
//           <Route path='/home' element={<Home />} />
//         </Route>
//         <Route path='/detail/:job' element={<Detail />} />
//         <Route path='/login' element={<LoginForm  />} />
//         <Route path='/signup' element={<SignupForm  />} />
//         <Route path='/' element={<Dashboard  />} />
//         <Route path='/info' element={<Profile  />} />
//         <Route path='/admin' element={<Admin  />} />
//         <Route path='/superadmin' element={<SuperAdmin />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/header' element={<Header />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
