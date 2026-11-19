import React, { useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import './CSS/Seller.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaStore,
  FaBoxOpen,
  FaIndianRupeeSign,
  FaChartLine,
  FaPlus,
  FaCircleCheck,
  FaBuilding,
  FaCreditCard,
  FaTruck
} from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Seller = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, role } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: user?.email || '',
    businessPhone: user?.phone || '',
    businessAddress: '',
    gstin: '',
    pan: '',
    bankAccount: '',
    ifscCode: '',
    bankName: '',
    accountHolder: ''
  });

  // Mock initial seller stats connected with live context
  const [sellerProfile, setSellerProfile] = useState(() => {
    const saved = localStorage.getItem('shopmate_seller_info');
    if (saved) return JSON.parse(saved);
    if (role === 'seller') {
      return {
        businessName: `${user?.fullname || 'My'} Store`,
        approvalStatus: 'approved',
        totalSales: 48,
        totalEarnings: 34500,
        availableBalance: 12800,
        commissionRate: 10
      };
    }
    return null;
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.businessEmail || !formData.businessPhone || !formData.businessAddress) {
      toast.error('Please fill in all required business fields');
      return;
    }

    const newSeller = {
      businessName: formData.businessName,
      businessEmail: formData.businessEmail,
      businessPhone: formData.businessPhone,
      businessAddress: formData.businessAddress,
      gstin: formData.gstin,
      pan: formData.pan,
      approvalStatus: 'approved',
      totalSales: 0,
      totalEarnings: 0,
      availableBalance: 0,
      commissionRate: 10
    };

    localStorage.setItem('shopmate_seller_info', JSON.stringify(newSeller));
    setSellerProfile(newSeller);
    setIsRegistering(false);
    toast.success('Congratulations! Your Seller account is now active.');
  };

  const handlePayoutRequest = () => {
    if (sellerProfile?.availableBalance <= 0) {
      toast.info('No balance available for withdrawal at this time.');
      return;
    }
    toast.success(`Payout request of ₹${sellerProfile.availableBalance} submitted! Bank transfer scheduled.`);
  };

  return (
    <>
      <Header />
      <div className="seller-container">
        {/* Banner */}
        <div className="seller-banner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <FaStore style={{ color: '#ff5000', fontSize: '28px' }} />
              <h1 style={{ margin: 0, fontSize: '26px' }}>ShopMate Seller Central</h1>
            </div>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px' }}>
              Grow your e-commerce business across millions of customers with 0% setup fee and automated payouts.
            </p>
          </div>

          {!sellerProfile ? (
            <button
              onClick={() => setIsRegistering(true)}
              style={{
                background: '#ff5000',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              Start Selling Today
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  background: '#10b981',
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <FaCircleCheck /> Verified Seller
              </span>
            </div>
          )}
        </div>

        {/* Registration Modal Form */}
        {isRegistering && (
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
                maxWidth: '650px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '30px'
              }}
            >
              <h2 style={{ margin: '0 0 10px 0', color: '#131921', fontSize: '22px' }}>
                Register as a ShopMate Seller
              </h2>
              <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '14px' }}>
                Enter your business & tax details to activate your vendor shop.
              </p>

              <form onSubmit={handleRegister} style={{ display: 'grid', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                    Business / Store Name *
                  </label>
                  <input
                    type="text"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Electronics Ltd"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      placeholder="seller@domain.com"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                      Business Phone *
                    </label>
                    <input
                      type="text"
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      value={formData.businessPhone}
                      onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                    Pickup & Business Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    placeholder="Plot / Warehouse No, Industrial Area, City, State, PIN"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                      GSTIN (Optional)
                    </label>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                      placeholder="22AAAAA0000A1Z5"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                      PAN Card Number
                    </label>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginTop: '6px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#131921' }}>Bank Details for Payouts</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Account Number"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="IFSC Code"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    style={{
                      background: '#f1f5f9',
                      border: 'none',
                      padding: '10px 18px',
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
                      padding: '10px 22px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Submit & Start Selling
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Seller Dashboard Stats */}
        {sellerProfile ? (
          <div style={{ marginTop: '25px' }}>
            <div className="seller-stats-grid">
              <div className="seller-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Store Name</span>
                  <FaStore style={{ color: '#ff5000' }} />
                </div>
                <h3 style={{ margin: '10px 0 0 0', fontSize: '22px', color: '#131921' }}>
                  {sellerProfile.businessName}
                </h3>
                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>● Active Shop</span>
              </div>

              <div className="seller-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Total Orders Sold</span>
                  <FaBoxOpen style={{ color: '#ff5000' }} />
                </div>
                <h3 style={{ margin: '10px 0 0 0', fontSize: '22px', color: '#131921' }}>
                  {sellerProfile.totalSales} Units
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Fulfilled via ShopMate Logistics</span>
              </div>

              <div className="seller-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Gross Sales</span>
                  <FaChartLine style={{ color: '#10b981' }} />
                </div>
                <h3 style={{ margin: '10px 0 0 0', fontSize: '22px', color: '#10b981' }}>
                  ₹{Number(sellerProfile.totalEarnings).toLocaleString('en-IN')}
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Platform Fee: 10%</span>
              </div>

              <div className="seller-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Available Payout</span>
                  <FaIndianRupeeSign style={{ color: '#ec4899' }} />
                </div>
                <h3 style={{ margin: '10px 0 0 0', fontSize: '22px', color: '#ec4899' }}>
                  ₹{Number(sellerProfile.availableBalance).toLocaleString('en-IN')}
                </h3>
                <button
                  onClick={handlePayoutRequest}
                  style={{
                    marginTop: '8px',
                    background: '#131921',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Request Payout
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="seller-actions-bar">
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: '#ff5000',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FaPlus /> Add New Product Listing
              </button>
              <button
                onClick={() => navigate('/product')}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#131921',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View Marketplace Catalog
              </button>
            </div>
          </div>
        ) : (
          /* Pitch features for non-registered users */
          <div style={{ marginTop: '35px' }}>
            <h2 style={{ textAlign: 'center', color: '#131921', marginBottom: '24px', fontSize: '22px' }}>
              Why Sell on ShopMate?
            </h2>
            <div className="seller-features-grid">
              <div className="seller-feature-card">
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#fff1e6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    color: '#ff5000',
                    fontSize: '24px'
                  }}
                >
                  <FaBuilding />
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: '#131921' }}>Lowest Commission</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                  Industry-leading commission rates with transparent accounting and zero hidden charges.
                </p>
              </div>

              <div className="seller-feature-card">
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#e0f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    color: '#0284c7',
                    fontSize: '24px'
                  }}
                >
                  <FaTruck />
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: '#131921' }}>Pan-India Fulfillment</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                  Doorstep courier pickup and express deliveries to 28,000+ pin codes nationwide.
                </p>
              </div>

              <div className="seller-feature-card">
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    color: '#10b981',
                    fontSize: '24px'
                  }}
                >
                  <FaCreditCard />
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: '#131921' }}>7-Day Payout Cycles</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                  Get automated fund settlements deposited directly into your linked bank account every week.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Seller;

