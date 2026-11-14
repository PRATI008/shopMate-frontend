import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaCartPlus, FaHeartBroken, FaArrowLeft } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '30px auto 60px', padding: '0 20px', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '25px' }}>
          My Wishlist ({wishlist.length} items)
        </h1>

        {wishlist.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1.5px dashed #cbd5e1'
            }}
          >
            <FaHeartBroken size={50} color="#cbd5e1" style={{ marginBottom: '15px' }} />
            <h2 style={{ fontSize: '20px', color: '#1e293b' }}>Your wishlist is empty</h2>
            <p style={{ color: '#64748b', margin: '10px 0 20px' }}>Save items you love to revisit anytime.</p>
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
              <FaArrowLeft /> Explore Products
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '25px'
            }}
          >
            {wishlist.map((item) => (
              <div
                key={item._id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  style={{
                    height: '200px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#f8fafc',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <img
                    src={item.Image || '/placeholder.png'}
                    alt={item.productTitle}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '12px 0' }}>
                  <h3
                    onClick={() => navigate(`/product/${item._id}`)}
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a',
                      cursor: 'pointer',
                      margin: '0 0 6px 0'
                    }}
                  >
                    {item.productTitle}
                  </h3>
                  <p style={{ fontSize: '18px', fontWeight: '800', color: '#f95919', margin: 0 }}>
                    ₹{Number(item.productPrice || 0).toLocaleString()}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: '#f95919',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaCartPlus /> Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(item)}
                    title="Remove"
                    style={{
                      padding: '10px 14px',
                      background: '#fee2e2',
                      color: '#ef4444',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaTrash />
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

export default Wishlist;

