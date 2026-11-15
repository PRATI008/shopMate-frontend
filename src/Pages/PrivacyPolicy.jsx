import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';
import { FaShieldHalved, FaLock, FaUserCheck, FaFileLines } from 'react-icons/fa6';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', minHeight: '70vh' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <FaShieldHalved style={{ fontSize: '36px', color: '#ff5000' }} />
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', color: '#131921' }}>Privacy Policy</h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Last updated: November 2026</p>
            </div>
          </div>

          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            At <strong>ShopMate</strong>, we consider the privacy and security of our customers to be paramount. This Privacy Policy details how we collect, use, protect, and handle your personally identifiable information when you visit and purchase from our e-commerce platform.
          </p>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaUserCheck style={{ color: '#10b981' }} /> 1. Information We Collect
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            When you register, place an order, or browse our platform, we collect relevant contact information including your full name, shipping and billing address, email address, phone number, and transaction history.
          </p>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaLock style={{ color: '#ff5000' }} /> 2. Payment Security & Encryption
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            All electronic payment transactions are encrypted using end-to-end 256-bit SSL protocols. We do not store sensitive credit card CVVs or bank PINs on our servers. All digital payments are processed through RBI-compliant, PCI-DSS certified payment gateways (e.g., Razorpay / UPI).
          </p>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaFileLines style={{ color: '#ec4899' }} /> 3. Data Protection & Sharing
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            We strictly do not sell, rent, or trade customer information with third parties. Your data is used exclusively to process orders, dispatch courier packages, deliver real-time shipment SMS/Email tracking updates, and improve your marketplace browsing experience.
          </p>

          <div style={{ marginTop: '30px', padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#131921' }}>Questions regarding privacy?</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
              Reach out directly to our Data Protection Officer at <a href="mailto:privacy@shopmate.com" style={{ color: '#ff5000', fontWeight: '600' }}>privacy@shopmate.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

