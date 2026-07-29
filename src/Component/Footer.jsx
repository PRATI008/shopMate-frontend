import React from 'react'
import "../Pages/CSS/Footer.css"
import { FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaLocationDot , FaInstagram ,FaTwitter , FaFacebook , FaLinkedin} from "react-icons/fa6";
import { SiVisa } from "react-icons/si";
import { IndianRupee } from 'lucide-react';

const Footer = () => {
  return (
    <>
    <div className="footer-page">
        <div className="first-links">
            <h1>Shop<span>Mate</span></h1>
            <p>Discover fashion that defines you. Quality products at the best prices.</p><br />
            <p><span><FaPhoneAlt /></span> +91 9129937416</p>
            <p><span><MdMessage /> </span>support@shopmate.com</p>
            <p><span><FaLocationDot /></span> 123 MG Road, Lucknow</p>
            <br /><br /><br />

    

          

        </div>

        <div className="quick-links">
            <h3>Quick Links</h3>
            <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>Categories</li>
                <li>Deals</li>
                <li>Contact</li>
            </ul>
            
        </div>

        <div className="customers">
            <h1>Customer Support</h1>
            <ul>
                <li>FAQs</li>
                <li>Shipping & Delivery</li>
                <li>Returns & Refunds</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>

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
  
  {/* 1. Visa Icon */}
  <svg xmlns="http://w3.org" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l3 10h2l3-10" />
    <path d="M11 7h2v10h-2" />
    <path d="M17 7c1.5 0 3 .5 3 2.5s-1.5 2-3 2.5 3 .5 3 2.5-1.5 2.5-3 2.5h-2V7h2z" />
  </svg>

  {/* 2. Mastercard Icon */}
  <svg xmlns="http://w3.org" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="12" r="5" />
    <circle cx="16" cy="12" r="5" />
  </svg>

  {/* 3. UPI Icon */}
  <svg xmlns="http://w3.org" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8v5c0 1.5 1 2.5 2.5 2.5h1V8" />
    <path d="M10 8v8M10 12h3c1.5 0 2.5-1 2.5-2V8" />
    <path d="M18 8v8" />
  </svg>

  {/* 4. RuPay Icon */}
  <svg xmlns="http://w3.org" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h10l-2 6H6M5 18l2-6" />
    <path d="M15 6l-2 12M19 6l-2 12" />
  </svg>

</div>
        </div>
        {/* <br /><br /><br /><br />
            <p>@ 2026 ShopMate. All Right Reserverd</p> */}
    </div>

    </>
  )
}

export default Footer