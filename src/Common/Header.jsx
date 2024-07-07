import React, { useState } from 'react';
import Headerdropdown from './Headerdropdown';
import { useNavigate,Navigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };



    return(
        <>
<nav id="navbar-main" className="navbar is-fixed-top">
  <div className="navbar-brand">
    <a className="navbar-item mobile-aside-button">
      <span className="icon"><i className="mdi mdi-forwardburger mdi-24px"></i></span>
    </a>
    <div className="navbar-item">
      <div className="control"><input placeholder="Search everywhere..." className="input"/></div>
    </div>
  </div>
  <div className="navbar-brand is-right">
    <a className="navbar-item --jb-navbar-menu-toggle" data-target="navbar-menu">
      <span className="icon"><i className="mdi mdi-dots-vertical mdi-24px"></i></span>
    </a>
  </div>
  <div className="navbar-menu" id="navbar-menu">
    <div className="navbar-end">
      
      <Headerdropdown/> 
      
     
   
      <a title="Log out" onClick={handleLogout} className="navbar-item desktop-icon-only">
        <span className="icon"><i className="mdi mdi-logout"></i></span>
        <span>Log out</span>
      </a>
    </div>
  </div>
</nav>
        
        </>
    );
}
export default Header;