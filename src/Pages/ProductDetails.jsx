import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
  FaStar,
  FaCartPlus,
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaUserCircle
} from 'react-icons/fa';
import './CSS/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  // New Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProductAndReviews();
  }, [id]);

  const fetchProductAndReviews = async () => {
    try {
      setLoading(true);
      // Fetch Product
      const prodRes = await axios.get(`${api_url}/api/products/get-product/${id}`);
      if (prodRes.data && prodRes.data.success) {
        setProduct(prodRes.data.product);
      } else {
        // Fallback: search in get-products list
        const allRes = await axios.get(`${api_url}/api/products/get-products`);
        const found = allRes.data.products?.find((p) => p._id === id);
        setProduct(found || null);
      }

      // Fetch Reviews
      const revRes = await axios.get(`${api_url}/api/reviews/product/${id}`);
      if (revRes.data && revRes.data.success) {
        setReviews(revRes.data.reviews || []);
        setAvgRating(revRes.data.avgRating || 0);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.warn('Please login to write a review!');
      navigate('/login');
      return;
    }
    if (!comment.trim()) {
      toast.warn('Please write a comment');
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await axios.post(`${api_url}/api/reviews/add`, {
        productId: id,
        userName: user?.fullname || user?.name || user?.email || 'Verified Customer',
        userEmail: user?.email,
        rating,
        comment
      });

      if (res.data && res.data.success) {
        toast.success('Thank you! Review added successfully ⭐');
        setComment('');
        fetchProductAndReviews();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not post review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
          <h3>Loading product details...</h3>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
          <h2>Product Not Found</h2>
          <p style={{ color: '#64748b', margin: '15px 0' }}>This item might have been removed.</p>
          <button
            onClick={() => navigate('/product')}
            style={{
              padding: '10px 20px',
              background: '#f95919',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const isLiked = isInWishlist(product._id);

  return (
    <>
      <Header />
      <div className="product-details-container">
        <button className="back-btn" onClick={() => navigate('/product')}>
          <FaArrowLeft /> Back to Products
        </button>

        <div className="product-details-grid">
          {/* Product Image */}
          <div className="product-image-box">
            <img
              src={product.Image || '/placeholder.png'}
              alt={product.productTitle}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600';
              }}
            />
          </div>

          {/* Product Meta */}
          <div className="product-info-box">
            <div className="rating-badge">
              <FaStar color="#f59e0b" />
              <span>{avgRating > 0 ? `${avgRating} / 5` : 'New'}</span>
              <span className="reviews-count">({reviews.length} customer reviews)</span>
            </div>

            <h1>{product.productTitle}</h1>
            <p className="product-price">₹{Number(product.productPrice || 0).toLocaleString()}</p>

            <div className="product-desc-box">
              <h3>Description</h3>
              <p>
                {product.productDescription ||
                  'Experience top-notch quality and ultimate comfort with this carefully crafted product. Perfect for everyday lifestyle and modern looks.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="product-actions-row">
              <button className="add-cart-btn" onClick={() => addToCart(product)}>
                <FaCartPlus /> Add to Cart
              </button>

              <button
                className={`wishlist-toggle-btn ${isLiked ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {isLiked ? <FaHeart color="#e11d48" /> : <FaRegHeart />}
                <span>{isLiked ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* Value Props */}
            <div className="product-perks">
              <div className="perk-item">
                <FaTruck color="#f95919" /> Free Delivery on prepaid orders
              </div>
              <div className="perk-item">
                <FaUndo color="#f95919" /> 7-Day Hassle-Free Returns
              </div>
              <div className="perk-item">
                <FaShieldAlt color="#f95919" /> 100% Original Guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="reviews-section">
          <h2>Customer Reviews & Ratings</h2>

          <div className="reviews-grid">
            {/* Review List */}
            <div className="reviews-list">
              {reviews.length === 0 ? (
                <div className="no-reviews-box">
                  <p>No reviews yet for this product. Be the first to share your thoughts!</p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <div key={rev._id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <FaUserCircle size={28} color="#94a3b8" />
                        <div>
                          <h4>{rev.userName}</h4>
                          <span className="review-date">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="stars-row">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={14}
                            color={i < rev.rating ? '#f59e0b' : '#e2e8f0'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="review-text">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Review Form */}
            <div className="add-review-card">
              <h3>Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label>Your Rating</label>
                  <div className="star-select">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="star-btn"
                      >
                        <FaStar
                          size={24}
                          color={star <= rating ? '#f59e0b' : '#cbd5e1'}
                        />
                      </button>
                    ))}
                    <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{rating} Star{rating > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Feedback / Comment</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us what you liked or disliked about this product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-review-btn"
                  disabled={submittingReview}
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

