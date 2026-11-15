import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';
import { FaCompass, FaHouse, FaBagShopping } from 'react-icons/fa6';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: '65vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            fontSize: '96px',
            fontWeight: '900',
            color: '#ff5000',
            lineHeight: 1,
            marginBottom: '10px'
          }}
        >
          404
        </div>
        <h2 style={{ fontSize: '28px', color: '#131921', margin: '0 0 12px 0' }}>
          Page Not Found
        </h2>
        <p style={{ maxWidth: '500px', color: '#64748b', fontSize: '16px', lineHeight: '1.6', marginBottom: '28px' }}>
          The page or product you were looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#131921',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px'
            }}
          >
            <FaHouse /> Back to Home
          </button>
          <button
            onClick={() => navigate('/product')}
            style={{
              background: '#ff5000',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px'
            }}
          >
            <FaBagShopping /> Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;

