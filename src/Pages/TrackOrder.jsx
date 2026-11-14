import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTruck, FaBox, FaHome, FaSearch, FaShoppingBag, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './CSS/TrackOrder.css';

const TrackOrder = () => {
  const { orderId: paramOrderId } = useParams();
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState(paramOrderId || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchOrderDetails = async (idToFetch) => {
    if (!idToFetch) return;
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await axios.get(`${api_url}/api/order/track/${idToFetch.trim()}`);
      if (res.data && res.data.success) {
        setOrder(res.data.order);
      } else {
        setOrder(null);
        setErrorMsg('Order not found with this tracking ID');
      }
    } catch (err) {
      console.error(err);
      setOrder(null);
      setErrorMsg('No order found with Order ID: ' + idToFetch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paramOrderId) {
      fetchOrderDetails(paramOrderId);
    }
  }, [paramOrderId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId) {
      navigate(`/track-order/${searchId}`);
      fetchOrderDetails(searchId);
    }
  };

  const getStepStatus = (stepName) => {
    const steps = ['Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentStepIndex = steps.indexOf(order?.orderStatus || 'Placed');
    const thisStepIndex = steps.indexOf(stepName);

    if (thisStepIndex <= currentStepIndex) return 'completed';
    return 'pending';
  };

  return (
    <>
      <Header />
      <div className="track-order-page">
        <div className="track-header-box">
          <h1>Track Your Order</h1>
          <p>Enter your Order ID to check the real-time shipping status.</p>

          <form className="track-search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. SM-123456)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button type="submit">
              <FaSearch /> Track Order
            </button>
          </form>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p style={{ color: '#64748b' }}>Fetching order details...</p>
          </div>
        )}

        {errorMsg && (
          <div className="track-error-card">
            <h3>{errorMsg}</h3>
            <p>Please double-check your Order ID and try again.</p>
          </div>
        )}

        {order && (
          <div className="order-details-card">
            <div className="order-summary-banner">
              <div>
                <span className="order-badge">Order ID: {order.orderId}</span>
                <h2>Status: <span style={{ color: '#f95919' }}>{order.orderStatus}</span></h2>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Payment ({order.paymentMethod}):</p>
                <span className={`payment-status-badge ${order.paymentStatus?.toLowerCase()}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="stepper-wrapper">
              <div className={`step-item ${getStepStatus('Placed')}`}>
                <div className="step-circle"><FaShoppingBag /></div>
                <p>Order Placed</p>
              </div>
              <div className={`step-line ${getStepStatus('Confirmed')}`} />

              <div className={`step-item ${getStepStatus('Confirmed')}`}>
                <div className="step-circle"><FaBox /></div>
                <p>Confirmed</p>
              </div>
              <div className={`step-line ${getStepStatus('Shipped')}`} />

              <div className={`step-item ${getStepStatus('Shipped')}`}>
                <div className="step-circle"><FaTruck /></div>
                <p>Shipped</p>
              </div>
              <div className={`step-line ${getStepStatus('Out for Delivery')}`} />

              <div className={`step-item ${getStepStatus('Out for Delivery')}`}>
                <div className="step-circle"><FaTruck /></div>
                <p>Out for Delivery</p>
              </div>
              <div className={`step-line ${getStepStatus('Delivered')}`} />

              <div className={`step-item ${getStepStatus('Delivered')}`}>
                <div className="step-circle"><FaHome /></div>
                <p>Delivered</p>
              </div>
            </div>

            {/* Grid for items and delivery address */}
            <div className="order-info-grid">
              <div className="ordered-items-box">
                <h3>Items in this Order ({order.items?.length})</h3>
                <div className="items-list">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="track-item-row">
                      <img src={item.image || '/placeholder.png'} alt={item.productTitle} />
                      <div className="track-item-info">
                        <h4>{item.productTitle}</h4>
                        <p>Qty: {item.quantity} × ₹{item.productPrice.toLocaleString()}</p>
                      </div>
                      <span className="track-item-total">
                        ₹{(item.quantity * item.productPrice).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bill-summary">
                  <div className="bill-row">
                    <span>Subtotal:</span>
                    <span>₹{order.subtotal?.toLocaleString()}</span>
                  </div>
                  <div className="bill-row">
                    <span>Shipping Fee:</span>
                    <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
                  </div>
                  <div className="bill-row grand-total">
                    <span>Total Amount Paid:</span>
                    <span>₹{order.grandTotal?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="delivery-address-box">
                <h3>Delivery Address</h3>
                <div className="address-content">
                  <p className="recipient-name">
                    <strong>{order.shippingDetails?.fullname}</strong>
                  </p>
                  <p className="address-line">
                    <FaMapMarkerAlt /> {order.shippingDetails?.address}, {order.shippingDetails?.city},{' '}
                    {order.shippingDetails?.state} - {order.shippingDetails?.pincode}
                  </p>
                  <p className="contact-line">
                    <FaPhoneAlt /> {order.shippingDetails?.phone}
                  </p>
                  <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>
                    Email: {order.shippingDetails?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TrackOrder;

