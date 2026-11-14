import React, { useState } from "react";
import "./Header.css";
import {
  FaCartShopping,
  FaHeart,
  FaBars,
  FaXmark,
  FaMagnifyingGlass,
  FaArrowRightFromBracket,
  FaBagShopping,
  FaUser
} from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, role } = useAuth();
  const { totalItemsCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [headerSearch, setHeaderSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      navigate(`/product?q=${encodeURIComponent(headerSearch.trim())}`);
    } else {
      navigate("/product");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      {/* Top Banner Ticker */}
      <div className="top-ticker-strip">
        <span>⚡ Mega Deals: Get Free Express Delivery on all orders above ₹999! Code: <strong>SHOPFREE</strong></span>
      </div>

      {/* Main Header Bar */}
      <div className="main-header-bar">
        {/* Logo */}
        <div className="site-logo" onClick={() => navigate("/")}>
          <span className="logo-text-shop">Shop</span>
          <span className="logo-text-mate">Mate</span>
          <span className="logo-dot"></span>
        </div>

        {/* Search Bar */}
        <form className="header-search-form" onSubmit={handleSearchSubmit}>
          <FaMagnifyingGlass className="search-icon-inside" />
          <input
            type="text"
            placeholder="Search for fashion, electronics, shoes & deals..."
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Right Action Icons */}
        <div className="header-actions">
          {/* Wishlist */}
          <div
            className="action-pill wishlist-pill"
            onClick={() => navigate("/wishlist")}
            title="Wishlist"
          >
            <div className="icon-badge-box">
              <FaHeart className="pink-heart" />
              {wishlistCount > 0 && <span className="action-counter">{wishlistCount}</span>}
            </div>
            <span className="action-name">Wishlist</span>
          </div>

          {/* Cart */}
          <div
            className="action-pill cart-pill"
            onClick={() => navigate("/cart")}
            title="Shopping Cart"
          >
            <div className="icon-badge-box">
              <FaCartShopping />
              {totalItemsCount > 0 && <span className="action-counter cart-count">{totalItemsCount}</span>}
            </div>
            <span className="action-name">Cart</span>
          </div>

          {/* Orders */}
          {isAuthenticated && (
            <div
              className="action-pill orders-pill"
              onClick={() => navigate("/my-orders")}
              title="My Orders"
            >
              <FaBagShopping />
              <span className="action-name">Orders</span>
            </div>
          )}

          {/* User Profile / Auth */}
          {isAuthenticated ? (
            <div className="user-logged-box">
              <div
                className="user-profile-trigger"
                onClick={() => navigate("/profile")}
                title="View Profile"
              >
                <div className="user-avatar">
                  <FaUser />
                </div>
                <div className="user-meta">
                  <span className="hello-msg">Hello,</span>
                  <span className="user-first-name">{user?.fullname?.split(" ")[0] || "User"}</span>
                </div>
              </div>

              <button className="logout-icon-btn" onClick={handleLogout} title="Logout">
                <FaArrowRightFromBracket />
              </button>
            </div>
          ) : (
            <div className="auth-btn-group">
              <button className="sign-in-nav-btn" onClick={() => navigate("/login")}>
                Sign In
              </button>
              <button className="register-nav-btn" onClick={() => navigate("/signup")}>
                Join Free
              </button>
            </div>
          )}

          {/* Hamburger for mobile */}
          <div className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaXmark /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Navigation Sub-menu */}
      <nav className={`nav-sub-menu ${menuOpen ? "open" : ""}`}>
        <div className="nav-menu-inner">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/product" onClick={() => setMenuOpen(false)}>
            All Products
          </NavLink>
          <NavLink to="/product?q=Fashion" onClick={() => setMenuOpen(false)}>
            Fashion
          </NavLink>
          <NavLink to="/product?q=Electronics" onClick={() => setMenuOpen(false)}>
            Electronics
          </NavLink>
          <NavLink to="/track-order" onClick={() => setMenuOpen(false)}>
            Track Order
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
          {role === "admin" && (
            <NavLink to="/dashboard" className="admin-menu-link" onClick={() => setMenuOpen(false)}>
              Admin Panel
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
