import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { AiOutlineHome, AiOutlineUserAdd } from 'react-icons/ai';

function Layout() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="full-content d-flex w-full justify-between">
        <div className="left-side fixed-top">
          <div className="links">
            <AiOutlineHome className="icons" />
            <p onClick={() => navigate('/')}>Home</p>  
          </div>
          <div className="links">
            <AiOutlineUserAdd className="icons" />
            <p onClick={() => navigate('/add')}>Add User</p>  
          </div>
        </div>
        <div className="right-side position-relative">
          <div className="header">
            <Header />
          </div>
          <div className="main-content">
            <Outlet />
          </div>
            <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout