import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import './CSS/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, totalItemsCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.warn('Please login to place an order!');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const shipping = subtotal > 0 ? (subtotal > 999 ? 0 : 99) : 0;
  const grandTotal = subtotal + shipping;

  return (
    <>
      <Header />
      <div className="cart-page-container">
        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <FaShoppingBag className="empty-cart-icon" />
            <h2>Your cart is currently empty!</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/product')}>
              <FaArrowLeft /> Explore Products
            </button>
          </div>
        ) : (
          <div className="cart-main-grid">
            <div className="cart-items-column">
              <div className="cart-table-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span>Action</span>
              </div>

              {cartItems.map((item) => {
                const id = item._id || item.id || item.productTitle;
                const price = Number(item.productPrice) || 0;
                const qty = item.quantity || 1;

                return (
                  <div key={id} className="cart-item-row">
                    <div className="item-details">
                      <img src={item.Image || '/placeholder.png'} alt={item.productTitle} />
                      <div>
                        <h3>{item.productTitle}</h3>
                        {item.category && <p className="item-category">{item.category}</p>}
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
                        title="Remove item"
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

            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItemsCount}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong style={{ color: 'green' }}>FREE</strong> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="free-shipping-tip">
                  Add ₹{(1000 - subtotal).toLocaleString()} more for FREE Delivery!
                </p>
              )}
              <hr />
              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

