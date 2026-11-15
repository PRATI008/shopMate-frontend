import React, { useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaShoppingBag,
  FaTag,
  FaShieldAlt,
  FaCheck
} from 'react-icons/fa';
import './CSS/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, totalItemsCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.warn('Please enter a coupon code!');
      return;
    }

    try {
      setCouponLoading(true);
      const res = await axios.post(`${api_url}/api/coupons/apply`, {
        code: couponCode.trim(),
        cartSubtotal: subtotal
      });

      if (res.data && res.data.success) {
        setAppliedCoupon({
          code: res.data.couponCode,
          discountAmount: res.data.discountAmount
        });
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.message || 'Invalid coupon');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  const discountVal = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountVal);
  const shipping = subtotal > 0 ? (discountedSubtotal > 999 ? 0 : 99) : 0;
  const grandTotal = discountedSubtotal + shipping;

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.warn('Please login to place an order!');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    // Pass coupon details to checkout state if applied
    navigate('/checkout', { state: { appliedCoupon, discountAmount: discountVal } });
  };

  return (
    <>
      <Header />
      <div className="cart-page-container">
        <h1>Shopping Cart ({totalItemsCount} items)</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <FaShoppingBag className="empty-cart-icon" />
            <h2>Your ShopMate Cart is empty</h2>
            <p>Your shopping cart is waiting for great finds. Explore deals and top categories!</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/product')}>
              <FaArrowLeft /> Explore Products
            </button>
          </div>
        ) : (
          <div className="cart-main-grid">
            {/* Products Table Column */}
            <div className="cart-items-column">
              <div className="cart-table-header">
                <span>Product Item</span>
                <span>Unit Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Action</span>
              </div>

              {cartItems.map((item) => {
                const id = item._id || item.id || item.productTitle;
                const price = Number(item.productPrice) || 0;
                const qty = item.quantity || 1;

                return (
                  <div key={id} className="cart-item-row">
                    <div className="item-details" onClick={() => navigate(`/product/${item._id || ''}`)} style={{ cursor: 'pointer' }}>
                      <img src={item.Image || '/placeholder.png'} alt={item.productTitle} />
                      <div>
                        <h3>{item.productTitle}</h3>
                        {item.category && <p className="item-category">Category: {item.category}</p>}
                        <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold' }}>✓ In Stock</span>
                      </div>
                    </div>

                    <div className="item-price">₹{price.toLocaleString()}</div>

                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(id, -1)} aria-label="Decrease quantity">
                        <FaMinus size={10} />
                      </button>
                      <span>{qty}</span>
                      <button onClick={() => updateQuantity(id, 1)} aria-label="Increase quantity">
                        <FaPlus size={10} />
                      </button>
                    </div>

                    <div className="item-subtotal">₹{(price * qty).toLocaleString()}</div>

                    <div className="item-action">
                      <button
                        className="delete-btn"
                        onClick={() => removeFromCart(id)}
                        title="Delete product"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="cart-bottom-actions">
                <button className="continue-btn" onClick={() => navigate('/product')}>
                  <FaArrowLeft /> Continue Shopping
                </button>
                <button className="clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary Column with Coupon */}
            <div className="cart-summary-card">
              <h3>Order Summary</h3>

              {/* Promo Coupon Box */}
              <div className="coupon-box-wrapper">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <FaTag color="#ff5000" /> Apply Discount Coupon
                </label>
                {appliedCoupon ? (
                  <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: '800', color: '#047857', fontSize: '13px' }}>{appliedCoupon.code}</span>
                      <p style={{ margin: 0, fontSize: '11px', color: '#065f46' }}>Saved ₹{appliedCoupon.discountAmount}!</p>
                    </div>
                    <button onClick={removeCoupon} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '13px' }}
                    />
                    <button
                      type="submit"
                      disabled={couponLoading}
                      style={{ padding: '8px 14px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </form>
                )}
                <span style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', display: 'block' }}>
                  Try coupons: <strong>WELCOME10</strong> (10% off) or <strong>SHOPFREE</strong>
                </span>
              </div>

              <div className="summary-row" style={{ marginTop: '16px' }}>
                <span>Subtotal ({totalItemsCount} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {appliedCoupon && (
                <div className="summary-row" style={{ color: '#16a34a', fontWeight: '700' }}>
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-₹{discountVal.toLocaleString()}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? <strong style={{ color: '#16a34a' }}>FREE</strong> : `₹${shipping}`}</span>
              </div>

              {shipping > 0 && (
                <p className="free-shipping-tip">
                  Add ₹{(1000 - discountedSubtotal).toLocaleString()} more for FREE Delivery!
                </p>
              )}

              <hr style={{ margin: '14px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span style={{ color: '#ff5000' }}>₹{grandTotal.toLocaleString()}</span>
              </div>

              <button className="checkout-btn" onClick={handleProceedToCheckout}>
                Proceed to Buy ({totalItemsCount} items)
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
                <FaShieldAlt color="#10b981" /> 100% Safe & Secure Checkouts
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
