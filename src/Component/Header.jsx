import React, { useEffect, useState } from "react";
import "./Header.css";

import {
  FaCartArrowDown,
  FaRegHeart,
  FaBars,
  FaTimes
} from "react-icons/fa";

import { IoPerson } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sessionId")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <header className="header">

      <div className="logo">
        <img src="./shopmate-logo.png" alt="logo" />
      </div>

      <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>

        <li>
          <NavLink to="/" onClick={()=>setMenuOpen(false)}>Home</NavLink>
        </li>

        <li>
          <NavLink to="/product" onClick={()=>setMenuOpen(false)}>Products</NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={()=>setMenuOpen(false)}>About</NavLink>
        </li>

        <li>
          <NavLink to="/contact" onClick={()=>setMenuOpen(false)}>Contact</NavLink>
        </li>

      </ul>

      <div className="right-side">

        <FaCartArrowDown className="icon"/>

        <FaRegHeart className="icon"/>

        {
          isLogin
          ?
          <IoPerson className="icon"/>
          :
          <>
          <button onClick={()=>navigate('/login')} className="login-btn">
            Login
          </button>

          <button onClick={()=>navigate('/signup')} className="signup-btn">
            Signup
          </button>
          </>
        }

      </div>

      <div
      className="hamburger"
      onClick={()=>setMenuOpen(!menuOpen)}
      >
        {
          menuOpen ? <FaTimes/> : <FaBars/>
        }
      </div>

    </header>
  );
};

export default Header;