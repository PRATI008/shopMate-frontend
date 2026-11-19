import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import './CSS/Policy.css';
import { FaFileContract, FaCheckDouble, FaScaleBalanced } from 'react-icons/fa6';

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div className="policy-page-wrapper">
        <div className="policy-page-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <FaFileContract style={{ fontSize: '36px', color: '#ff5000' }} />
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', color: '#131921' }}>Terms & Conditions</h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Effective Date: November 2026</p>
            </div>
          </div>

          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            Welcome to <strong>ShopMate</strong>. By accessing or using our website, services, and online catalog, you agree to comply with and be bound by the following terms of service.
          </p>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCheckDouble style={{ color: '#10b981' }} /> 1. Customer Accounts
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            Customers must provide accurate, current, and complete registration information. You are responsible for safeguarding your login credentials and for all activities conducted under your registered account.
          </p>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaScaleBalanced style={{ color: '#ff5000' }} /> 2. Product Pricing & Availability
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            All prices listed on ShopMate are denominated in Indian Rupees (₹) and include applicable taxes unless specified otherwise. We reserve the right to correct typographical pricing errors and cancel orders placed under incorrect price listings before dispatch.
          </p>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaFileContract style={{ color: '#ec4899' }} /> 3. Governing Law & Jurisdiction
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            These terms are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Lucknow / New Delhi, India.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;

