import React, { useState, useEffect } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaShieldAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaLock,
  FaArrowLeft,
  FaCheckCircle,
  FaSpinner,
  FaMapMarkerAlt,
  FaPlus
} from 'react-icons/fa';
import { SiGooglepay, SiPaytm, SiPhonepe } from 'react-icons/si';
import './CSS/Checkout.css';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication Guard
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to access checkout!');
      navigate('/login', { state: { from: '/checkout' }, replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Read applied coupon from Cart navigation state
  const appliedCoupon = location.state?.appliedCoupon || null;
  const discountAmount = location.state?.discountAmount || 0;

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shipping = subtotal > 0 ? (discountedSubtotal > 999 ? 0 : 99) : 0;
  const grandTotal = discountedSubtotal + shipping;

  const [savedAddresses, setSavedAddresses] = useState(user?.savedAddresses || []);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const [shippingDetails, setShippingDetails] = useState({
    fullname: user?.fullname || user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Online'); // 'Online' or 'COD'
  const [onlineType, setOnlineType] = useState('UPI'); // 'UPI' or 'Card'
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  // Gateway Modal & Verification states
  const [processing, setProcessing] = useState(false);
  const [gatewayStep, setGatewayStep] = useState(null); // 'connecting', 'verifying', 'otp_modal', null
  const [otp, setOtp] = useState('');
  const [pendingGatewayData, setPendingGatewayData] = useState(null);

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleInputChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
    }
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleInitiateAndPay = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Cart is empty!');
      navigate('/product');
      return;
    }

    if (!shippingDetails.fullname || !shippingDetails.address || !shippingDetails.phone || !shippingDetails.pincode) {
      toast.warn('Please fill in complete delivery address details.');
      return;
    }

    if (paymentMethod === 'Online') {
      if (onlineType === 'UPI' && (!upiId || !upiId.includes('@'))) {
        toast.warn('Please enter a valid UPI ID (e.g., yourname@okhdfcbank)');
        return;
      }
      if (onlineType === 'Card' && (cardDetails.cardNumber.length < 16 || !cardDetails.cvv)) {
        toast.warn('Please enter a valid 16-digit Card Number and CVV.');
        return;
      }
    }

    try {
      setProcessing(true);
      setGatewayStep('connecting');

      // 1. Initiate Razorpay / ShopMate Gateway from Backend
      const initRes = await axios.post(`${api_url}/api/order/payment/initiate`, {
        amount: grandTotal,
        customerEmail: shippingDetails.email,
        customerPhone: shippingDetails.phone
      });

      if (!initRes.data || !initRes.data.success) {
        throw new Error(initRes.data?.message || 'Gateway initialization failed');
      }

      const gatewayInfo = initRes.data;

      // Cash On Delivery (COD) Bypass
      if (paymentMethod === 'COD') {
        finalizeOrder(gatewayInfo, 'COD');
        return;
      }

      // Online Gateway: Trigger simulated Bank 2FA Authentication
      setPendingGatewayData(gatewayInfo);
      setTimeout(() => {
        setProcessing(false);
        setGatewayStep('otp_modal');
      }, 1000);
    } catch (error) {
      console.error('Payment error:', error);
      setProcessing(false);
      setGatewayStep(null);
      toast.error(error.response?.data?.message || error.message || 'Payment server failed to connect.');
    }
  };

  const finalizeOrder = async (gatewayInfo, chosenMethod) => {
    setProcessing(true);
    setGatewayStep('verifying');

    try {
      const orderPayload = {
        gatewayOrderId: gatewayInfo.gatewayOrderId,
        paymentToken: gatewayInfo.paymentToken,
        paymentMethod: chosenMethod || (paymentMethod === 'COD' ? 'COD' : onlineType),
        shippingDetails,
        items: cartItems.map((item) => ({
          productId: item._id || item.id || null,
          productTitle: item.productTitle,
          productPrice: Number(item.productPrice) || 0,
          quantity: item.quantity || 1,
          image: item.Image || ''
        })),
        subtotal,
        discountAmount,
        couponCode: appliedCoupon?.code || '',
        shippingFee: shipping,
        grandTotal
      };

      // 2. Server-side Verification & Final Order Placement in MongoDB
      const verifyRes = await axios.post(`${api_url}/api/order/payment/verify-and-order`, orderPayload);

      if (verifyRes.data && verifyRes.data.success) {
        toast.success('Payment Verified! Order Placed Successfully 🎉');
        const createdOrderId = verifyRes.data.order.orderId;
        clearCart();
        setGatewayStep(null);
        navigate(`/track-order/${createdOrderId}`);
      } else {
        throw new Error(verifyRes.data?.message || 'Order could not be saved');
      }
    } catch (err) {
      console.error('Verification error:', err);
      toast.error(err.response?.data?.message || 'Payment verification failed');
      setGatewayStep(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast.warn('Please enter 4-digit OTP (e.g. 1234)');
      return;
    }
    finalizeOrder(pendingGatewayData, onlineType);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '80px 20px', minHeight: '60vh' }}>
          <h2>No items in cart to checkout!</h2>
          <p style={{ color: '#64748b', margin: '15px 0 25px' }}>Add products first to proceed.</p>
          <button
            onClick={() => navigate('/product')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ff5000',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Browse Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="checkout-container">
        <button className="back-btn" onClick={() => navigate('/cart')}>
          <FaArrowLeft /> Back to Cart
        </button>

        <h1>Secure Checkout</h1>

        <div className="checkout-grid">
          {/* Left Column: Delivery & Payment Details */}
          <div className="checkout-left">
            {/* 1. Address Section */}
            <div className="checkout-card">
              <h3>1. Delivery Address</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="E.g. Rahul Sharma"
                    value={shippingDetails.fullname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="rahul@gmail.com"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address (House No, Building, Street) *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Flat 204, Green Heights, MG Road"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row three-cols">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Lucknow"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Uttar Pradesh"
                    value={shippingDetails.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="226001"
                    maxLength="6"
                    value={shippingDetails.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number (for delivery SMS & updates) *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 9876543210"
                  maxLength="13"
                  value={shippingDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* 2. Payment Method Section */}
            <div className="checkout-card">
              <h3>2. Select Payment Method</h3>

              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'Online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={paymentMethod === 'Online'}
                    onChange={() => setPaymentMethod('Online')}
                  />
                  <div className="option-content">
                    <div className="option-title">
                      <FaCreditCard color="#ff5000" /> Instant Online Payment (UPI / Cards / NetBanking)
                    </div>
                    <span className="badge-secure"><FaShieldAlt /> 100% Secure & Encrypted</span>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <div className="option-content">
                    <div className="option-title">
                      <FaMoneyBillWave color="#16a34a" /> Cash on Delivery (COD)
                    </div>
                    <span className="badge-cod">Pay cash at doorstep</span>
                  </div>
                </label>
              </div>

              {/* Online Options */}
              {paymentMethod === 'Online' && (
                <div className="online-payment-box">
                  <div className="online-tabs">
                    <button
                      type="button"
                      className={`tab-btn ${onlineType === 'UPI' ? 'active' : ''}`}
                      onClick={() => setOnlineType('UPI')}
                    >
                      Instant UPI (PhonePe / GPay / Paytm)
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${onlineType === 'Card' ? 'active' : ''}`}
                      onClick={() => setOnlineType('Card')}
                    >
                      Credit / Debit Card
                    </button>
                  </div>

                  {onlineType === 'UPI' ? (
                    <div className="upi-fields">
                      <div className="upi-icons">
                        <SiGooglepay size={38} color="#4285F4" title="Google Pay" />
                        <SiPhonepe size={32} color="#5f259f" title="PhonePe" />
                        <SiPaytm size={38} color="#00b9f5" title="Paytm" />
                      </div>
                      <div className="form-group">
                        <label>Enter UPI ID (VPA)</label>
                        <input
                          type="text"
                          placeholder="e.g. mobileNumber@upi or user@okhdfcbank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                        <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                          A secure payment verification request will be triggered.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="card-fields">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="4532 8920 1234 5678"
                          value={cardDetails.cardNumber}
                          onChange={handleCardChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                          type="text"
                          name="cardName"
                          placeholder="Name printed on card"
                          value={cardDetails.cardName}
                          onChange={handleCardChange}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV / CVC</label>
                          <input
                            type="password"
                            name="cvv"
                            placeholder="•••"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary with Discounts */}
          <div className="checkout-right">
            <div className="order-summary-card">
              <h3>Order Summary ({cartItems.length} items)</h3>

              <div className="summary-items-list">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="summary-item">
                    <img src={item.Image || '/placeholder.png'} alt={item.productTitle} />
                    <div className="summary-item-info">
                      <h4>{item.productTitle}</h4>
                      <p>Qty: {item.quantity || 1} × ₹{Number(item.productPrice || 0).toLocaleString()}</p>
                    </div>
                    <span className="summary-item-price">
                      ₹{((item.quantity || 1) * Number(item.productPrice || 0)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-divider" />

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                {appliedCoupon && (
                  <div className="price-row" style={{ color: '#16a34a', fontWeight: 'bold' }}>
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="price-row">
                  <span>Delivery Charge</span>
                  <span>
                    {shipping === 0 ? <strong style={{ color: '#16a34a' }}>FREE</strong> : `₹${shipping}`}
                  </span>
                </div>

                <div className="price-row total-row">
                  <span>Grand Total</span>
                  <span style={{ color: '#ff5000' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                className="pay-btn"
                onClick={handleInitiateAndPay}
                disabled={processing}
              >
                {processing ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaSpinner className="spin-anim" /> Connecting to Gateway...
                  </span>
                ) : (
                  <>
                    <FaLock /> Pay ₹{grandTotal.toLocaleString()} & Place Order
                  </>
                )}
              </button>

              <div className="security-badges">
                <span><FaShieldAlt /> 256-bit Encrypted</span>
                <span><FaCheckCircle /> RBI & PCI-DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Factor Authentication Modal */}
      {gatewayStep === 'otp_modal' && (
        <div className="gateway-modal-overlay">
          <div className="gateway-modal-card">
            <div className="gateway-modal-header">
              <FaShieldAlt size={28} color="#ff5000" />
              <div>
                <h3>Bank Payment Gateway Verification</h3>
                <p>Merchant: ShopMate Official Store</p>
              </div>
            </div>

            <div className="gateway-modal-body">
              <p className="gateway-amount-label">
                Amount to Authorize: <strong>₹{grandTotal.toLocaleString()}</strong>
              </p>
              <p className="gateway-info-text">
                An authentication code (OTP) was simulated for your registered number <strong>{shippingDetails.phone}</strong>.
              </p>

              <form onSubmit={handleOtpSubmit}>
                <div className="otp-box">
                  <label>Enter 4-Digit OTP</label>
                  <input
                    type="password"
                    maxLength="6"
                    placeholder="Enter 1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    autoFocus
                  />
                  <span className="demo-hint">💡 Demo Hint: Enter <strong>1234</strong> to approve transaction</span>
                </div>

                <div className="gateway-modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setGatewayStep(null);
                      toast.info('Payment was cancelled.');
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="confirm-otp-btn">
                    Verify & Pay ₹{grandTotal.toLocaleString()}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Verifying Loader Screen */}
      {gatewayStep === 'verifying' && (
        <div className="gateway-modal-overlay">
          <div className="gateway-modal-card verifying-card">
            <FaSpinner className="spin-anim big-spinner" />
            <h3>Verifying Transaction with Bank...</h3>
            <p>Please do not refresh or close this tab.</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Checkout;
