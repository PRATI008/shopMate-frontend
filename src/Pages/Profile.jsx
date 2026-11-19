import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import './CSS/Profile.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaUser,
  FaEnvelope,
  FaShieldHalved,
  FaRightFromBracket,
  FaLocationDot,
  FaPlus,
  FaCheck
} from 'react-icons/fa6';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, role, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [addresses, setAddresses] = useState(() => {
    return user?.savedAddresses || [];
  });

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user?.fullname || '',
    phone: user?.phone || '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'Home',
    isDefault: false
  });

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

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.phone || !newAddr.street || !newAddr.city || !newAddr.state || !newAddr.pincode) {
      toast.error('Please fill in all mandatory address fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const res = await axios.post(
        `${API_URL}/api/user/save-address`,
        newAddr,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data?.success) {
        setAddresses(res.data.savedAddresses);
        toast.success('Address saved successfully!');
        setShowAddressModal(false);
        setNewAddr({
          fullName: user?.fullname || '',
          phone: user?.phone || '',
          street: '',
          landmark: '',
          city: '',
          state: '',
          pincode: '',
          addressType: 'Home',
          isDefault: false
        });
      }
    } catch (err) {
      const updated = [...addresses, { ...newAddr, _id: Date.now().toString() }];
      setAddresses(updated);
      toast.success('Address saved locally!');
      setShowAddressModal(false);
    }
  };

  return (
    <>
      <Header />
      <div className="profile-wrapper">
        <div className="profile-card">
          {/* User Header */}
          <div className="profile-header-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff5000, #f95919)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '30px'
                }}
              >
                <FaUser />
              </div>
              <div>
                <h2 style={{ margin: '0 0 5px 0', color: '#131921', fontSize: '24px' }}>
                  {user?.fullname || user?.name || 'ShopMate User'}
                </h2>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span
                    style={{
                      background: role === 'admin' ? '#fee2e2' : '#e0e7ff',
                      color: role === 'admin' ? '#991b1b' : '#3730a3',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}
                  >
                    {role || 'Customer'}
                  </span>
                  <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '600' }}>● Active</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {role === 'admin' && (
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    background: '#131921',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px'
                  }}
                >
                  Admin Panel
                </button>
              )}
              <button
                onClick={handleLogout}
                style={{
                  background: '#fff',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px'
                }}
              >
                <FaRightFromBracket /> Sign Out
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid #e2e8f0', margin: '20px 0' }}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 16px',
                borderBottom: activeTab === 'profile' ? '3px solid #ff5000' : '3px solid transparent',
                color: activeTab === 'profile' ? '#ff5000' : '#64748b',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              Account Details
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 16px',
                borderBottom: activeTab === 'addresses' ? '3px solid #ff5000' : '3px solid transparent',
                color: activeTab === 'addresses' ? '#ff5000' : '#64748b',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              Saved Addresses ({addresses.length})
            </button>
          </div>

          {/* Profile Overview Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="profile-stats-grid">
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>
                    <FaEnvelope /> Email Address
                  </div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#0f172a' }}>{user?.email || 'N/A'}</p>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>
                    <FaShieldHalved /> Phone Number
                  </div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#0f172a' }}>{user?.phone || '+91 Not Linked'}</p>
                </div>
              </div>

              <div className="profile-actions-btns">
                <button
                  onClick={() => navigate('/my-orders')}
                  style={{
                    background: '#ff5000',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  My Orders
                </button>
                <button
                  onClick={() => navigate('/wishlist')}
                  style={{
                    background: '#fff',
                    color: '#ec4899',
                    border: '1px solid #ec4899',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  My Wishlist
                </button>
                <button
                  onClick={() => navigate('/seller')}
                  style={{
                    background: '#131921',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Seller Central
                </button>
              </div>
            </div>
          )}

          {/* Saved Addresses Tab */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#131921' }}>Your Delivery Addresses</h3>
                <button
                  onClick={() => setShowAddressModal(true)}
                  style={{
                    background: '#ff5000',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px'
                  }}
                >
                  <FaPlus /> Add New Address
                </button>
              </div>

              {addresses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: '12px' }}>
                  <FaLocationDot size={40} color="#94a3b8" />
                  <p style={{ color: '#64748b', marginTop: '10px' }}>No saved addresses found. Add one for quick checkout!</p>
                </div>
              ) : (
                <div className="addresses-grid">
                  {addresses.map((addr, idx) => (
                    <div
                      key={addr._id || idx}
                      style={{
                        border: '1px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '18px',
                        position: 'relative',
                        background: addr.isDefault ? '#fffbf5' : '#fff'
                      }}
                    >
                      {addr.isDefault && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: '#10b981',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '12px'
                          }}
                        >
                          DEFAULT
                        </span>
                      )}
                      <span
                        style={{
                          background: '#f1f5f9',
                          color: '#475569',
                          fontSize: '12px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {addr.addressType || 'Home'}
                      </span>
                      <h4 style={{ margin: '8px 0 4px 0', fontSize: '16px', color: '#131921' }}>
                        {addr.fullName}
                      </h4>
                      <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '13px' }}>
                        {addr.street}, {addr.landmark ? addr.landmark + ', ' : ''}{addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p style={{ margin: 0, color: '#334155', fontSize: '13px', fontWeight: '600' }}>
                        Phone: {addr.phone}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '550px',
              padding: '28px'
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#131921' }}>Add New Delivery Address</h3>
            <form onSubmit={handleSaveAddress} style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                />
                <input
                  type="text"
                  required
                  placeholder="10-digit Mobile *"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                />
              </div>

              <input
                type="text"
                required
                placeholder="House / Flat / Street / Area *"
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
              />

              <input
                type="text"
                placeholder="Landmark (Optional)"
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                value={newAddr.landmark}
                onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  required
                  placeholder="City *"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                />
                <input
                  type="text"
                  required
                  placeholder="State *"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                />
                <input
                  type="text"
                  required
                  placeholder="PIN Code *"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  value={newAddr.pincode}
                  onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '6px' }}>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="addressType"
                    checked={newAddr.addressType === 'Home'}
                    onChange={() => setNewAddr({ ...newAddr, addressType: 'Home' })}
                  />
                  Home
                </label>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="addressType"
                    checked={newAddr.addressType === 'Work'}
                    onChange={() => setNewAddr({ ...newAddr, addressType: 'Work' })}
                  />
                  Work / Office
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#ff5000',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Profile;
