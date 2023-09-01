import React from 'react'
import {  Link, NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  let navigate = useNavigate();
  const HandleLogout = () => {
   
    localStorage.removeItem('token');
    navigate("/login");
  }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">Inotebook</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/About">About <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            
          </ul>
          
          {!localStorage.getItem('token')?<form className="form-inline my-2 my-lg-0">
            
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-2" to="/signup"  role="button">Signup</Link>
          </form> : <button className="btn btn-primary" onClick={HandleLogout}>Logout</button> }
        </div>
      </nav>
    )
}

export default Navbar;