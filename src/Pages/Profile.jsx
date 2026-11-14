import React, { useEffect } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaEnvelope, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, role, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', minHeight: '65vh' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '35px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f1f5f9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
            <FaUserCircle size={75} color="#e11d48" />
            <div>
              <h2 style={{ margin: '0 0 5px 0', color: '#1e293b', fontSize: '24px' }}>
                {user?.fullname || user?.name || 'ShopMate User'}
              </h2>
              <span
                style={{
                  display: 'inline-block',
                  background: role === 'admin' ? '#fee2e2' : '#e0e7ff',
                  color: role === 'admin' ? '#991b1b' : '#3730a3',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}
              >
                {role || 'Customer'}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '25px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                <FaEnvelope /> Email Address
              </div>
              <p style={{ margin: 0, fontWeight: '600', color: '#0f172a' }}>{user?.email || 'N/A'}</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                <FaShieldAlt /> Account Status
              </div>
              <p style={{ margin: 0, fontWeight: '600', color: '#16a34a' }}>Active</p>
            </div>
          </div>

          <div style={{ marginTop: '35px', display: 'flex', gap: '15px' }}>
            {role === 'admin' && (
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: '#1e293b',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Go to Admin Dashboard
              </button>
            )}

            <button
              onClick={() => navigate('/product')}
              style={{
                background: '#e11d48',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Browse Products
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: '#fff',
                color: '#ef4444',
                border: '1px solid #ef4444',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
