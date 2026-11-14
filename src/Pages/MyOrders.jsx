import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBoxOpen, FaTruck, FaArrowRight, FaShoppingBag } from 'react-icons/fa';

const MyOrders = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api_url}/api/order/user-orders/${user?.email}`);
      if (res.data && res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: '1000px', margin: '30px auto 60px', padding: '0 20px', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          My Order History
        </h1>
        <p style={{ color: '#64748b', marginBottom: '28px' }}>
          Check details, live tracking, and status of your past orders.
        </p>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '50px' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1.5px dashed #cbd5e1'
            }}
          >
            <FaBoxOpen size={56} color="#cbd5e1" style={{ marginBottom: '14px' }} />
            <h2 style={{ fontSize: '20px', color: '#1e293b' }}>No orders placed yet!</h2>
            <p style={{ color: '#64748b', margin: '10px 0 20px' }}>
              Your order history will appear here once you make your first purchase.
            </p>
            <button
              onClick={() => navigate('/product')}
              style={{
                padding: '11px 24px',
                background: '#f95919',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((ord) => (
              <div
                key={ord._id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f1f5f9',
                    paddingBottom: '14px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <span
                      style={{
                        background: '#fff2ed',
                        color: '#f95919',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '800'
                      }}
                    >
                      {ord.orderId}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '13px', marginLeft: '12px' }}>
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        background: ord.orderStatus === 'Delivered' ? '#dcfce7' : '#fef9c3',
                        color: ord.orderStatus === 'Delivered' ? '#15803d' : '#a16207'
                      }}
                    >
                      Status: {ord.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {ord.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={item.image || '/placeholder.png'}
                        alt={item.productTitle}
                        style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>{item.productTitle}</h4>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Qty: {item.quantity}</span>
                      </div>
                      <span style={{ fontWeight: '700', fontSize: '14px' }}>
                        ₹{(item.quantity * item.productPrice).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f8fafc',
                    paddingTop: '14px'
                  }}
                >
                  <div>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>Total Amount: </span>
                    <strong style={{ fontSize: '16px', color: '#0f172a' }}>
                      ₹{ord.grandTotal?.toLocaleString()}
                    </strong>
                    <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '8px' }}>
                      ({ord.paymentMethod})
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/track-order/${ord.orderId}`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#f95919',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaTruck /> Track Package <FaArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;

