import React from 'react';
import "../Pages/CSS/Footer.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaLocationDot, FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-page">
      <div className="first-links">
        <h1>Shop<span>Mate</span></h1>
        <p>Discover fashion, electronics, and lifestyle products that define you. Quality guaranteed at the best competitive prices.</p><br />
        <p><span><FaPhoneAlt /></span> +91 9129937416</p>
        <p><span><MdMessage /> </span>support@shopmate.com</p>
        <p><span><FaLocationDot /></span> 123 MG Road, Lucknow, UP, India</p>
      </div>

      <div className="quick-links">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/product" style={{ color: 'inherit', textDecoration: 'none' }}>Shop All</Link></li>
          <li><Link to="/track-order" style={{ color: 'inherit', textDecoration: 'none' }}>Track Order</Link></li>
          <li><Link to="/seller" style={{ color: '#ff5000', textDecoration: 'none', fontWeight: 'bold' }}>Become a Seller</Link></li>
          <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</Link></li>
        </ul>
      </div>

      <div className="customers">
        <h1>Customer Support</h1>
        <ul>
          <li><Link to="/shipping-returns" style={{ color: 'inherit', textDecoration: 'none' }}>Shipping & Delivery</Link></li>
          <li><Link to="/shipping-returns" style={{ color: 'inherit', textDecoration: 'none' }}>Returns & Refunds</Link></li>
          <li><Link to="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link></li>
          <li><Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</Link></li>
          <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About ShopMate</Link></li>
        </ul>
      </div>

      <div className="fourth-links">
        <h2>Follow Us</h2>
        <div className="links">
          <FaInstagram />
          <FaTwitter />
          <FaFacebook />
          <FaLinkedin />
        </div>
        <br />
        <h2>We Accept</h2>
        <div className='accept' style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Visa Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 7l3 10h2l3-10" />
            <path d="M11 7h2v10h-2" />
            <path d="M17 7c1.5 0 3 .5 3 2.5s-1.5 2-3 2.5 3 .5 3 2.5-1.5 2.5-3 2.5h-2V7h2z" />
          </svg>

          {/* Mastercard Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="12" r="5" />
            <circle cx="16" cy="12" r="5" />
          </svg>

          {/* UPI Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8v5c0 1.5 1 2.5 2.5 2.5h1V8" />
            <path d="M10 8v8M10 12h3c1.5 0 2.5-1 2.5-2V8" />
            <path d="M18 8v8" />
          </svg>

          {/* RuPay Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h10l-2 6H6M5 18l2-6" />
            <path d="M15 6l-2 12M19 6l-2 12" />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
