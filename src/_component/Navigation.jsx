import { Outlet, Link } from "react-router-dom";
import React, { useState } from 'react';
import CategoryList from './CategoryList';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const [seeCategories, setseeCategories] = useState(false);
  const isAuthenticated = localStorage.getItem('token');

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
        navigate('/');
  }

  return (
    <>
      <div className="row" >
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutus"> &gt; About Us</Link>
            </li>
            <li>
              <Link to="/contactus"> &gt; Contact Us</Link>
            </li>
            <li onMouseEnter={() => { setseeCategories(true) }}
              onMouseLeave={() => { setseeCategories(false) }}>&gt; Categories
              {seeCategories == true && <CategoryList />}
            </li>
            <li>
              {!isAuthenticated ? <Link to="/login"> &gt; Login</Link> : <><Link to="/myaccount"> &gt; My Account</Link> <span onClick={logout}> &gt; Logout</span> </>}
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  )
};

export default Layout;