import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import CategoryPage from "./pages/CategoryPage";
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterLayout from './_component/FooterLayout';
import Navigation from './_component/Navigation.jsx';


function App() {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <>
      <ToastContainer toastClassName='toastContainerBox' transition={Flip} position='top-center' />
      <div className="d-flex flex-column min-vh-100">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path="/aboutus" element={< AboutUs />} />
            <Route path="/contactus" element={< ContactUs />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
            <Route path="/logout" element={!isAuthenticated ? <Navigate to="/" replace /> :  <Logout />} />
            <Route path="/cat/:id" element={<CategoryPage />} />
          </Routes>
        </BrowserRouter>
        <FooterLayout />
      </div >
    </>
  );
}

export default App;
