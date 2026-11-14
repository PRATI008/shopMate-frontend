import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaArrowRight,
  FaBolt,
  FaFire,
  FaShieldHalved,
  FaTruckFast,
  FaArrowRotateLeft,
  FaHeadset
} from "react-icons/fa6";
import "./CSS/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Modern Clean Banners
  const heroBanners = [
    {
      badge: "SEASON MEGA SALE",
      title: "Discover Fashion That Defines You",
      subtitle: "Get up to 60% off on top trending apparel, shoes, and lifestyle brands.",
      cta: "Explore Collection",
      tagColor: "#ff5000",
      bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80"
    },
    {
      badge: "NEXT-GEN AUDIO & GEAR",
      title: "Immersive Sound & Smart Wearables",
      subtitle: "Wireless earbuds, fitness watches and accessories with 100% genuine warranty.",
      cta: "Shop Electronics",
      tagColor: "#10b981",
      bgGradient: "linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
    },
    {
      badge: "NEW FOOTWEAR ARRIVALS",
      title: "Step Up in Comfort & Street Style",
      subtitle: "Premium sneakers, gym trainers and casual footwear crafted for all-day wear.",
      cta: "View Footwear",
      tagColor: "#ec4899",
      bgGradient: "linear-gradient(135deg, #271007 0%, #431407 100%)",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
    }
  ];

  // Featured Categories
  const categoryCircles = [
    { name: "All Products", icon: "✨", query: "" },
    { name: "Fashion", icon: "👗", query: "Fashion" },
    { name: "Footwear", icon: "👟", query: "Footwear" },
    { name: "Electronics", icon: "🎧", query: "Electronics" },
    { name: "Accessories", icon: "🕶️", query: "Accessories" },
    { name: "Watches", icon: "⌚", query: "Watch" },
    { name: "Bags", icon: "🎒", query: "Bag" }
  ];

  const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${api_url}/api/products/get-products`);
      if (res.data && res.data.products) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const dealProducts = products.slice(0, 4);
  const trendingProducts = products.slice(0, 8);

  return (
    <>
      <Header />

      <main className="home-container">
        {/* 1. Quick Category Strip */}
        <section className="category-scroll-strip">
          {categoryCircles.map((cat, idx) => (
            <div
              key={idx}
              className="category-pill-card"
              onClick={() => navigate(cat.query ? `/product?q=${cat.query}` : "/product")}
            >
              <div className="cat-icon-circle">{cat.icon}</div>
              <span>{cat.name}</span>
            </div>
          ))}
        </section>

        {/* 2. Hero Interactive Banner Slider */}
        <section className="hero-slider-wrap">
          <div
            className="hero-slider-card"
            style={{ background: heroBanners[currentSlide].bgGradient }}
          >
            <div className="hero-slide-info">
              <span
                className="hero-badge-pill"
                style={{ color: heroBanners[currentSlide].tagColor }}
              >
                {heroBanners[currentSlide].badge}
              </span>
              <h1>{heroBanners[currentSlide].title}</h1>
              <p>{heroBanners[currentSlide].subtitle}</p>
              <button
                className="hero-explore-btn"
                onClick={() => navigate("/product")}
                style={{ backgroundColor: heroBanners[currentSlide].tagColor }}
              >
                {heroBanners[currentSlide].cta} <FaArrowRight />
              </button>
            </div>

            <div className="hero-slide-art">
              <img src={heroBanners[currentSlide].img} alt="Hero banner visual" />
            </div>
          </div>

          {/* Slider controls */}
          <button
            className="slide-arrow prev-arrow"
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1))}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          <button
            className="slide-arrow next-arrow"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroBanners.length)}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>

          <div className="slider-indicator-dots">
            {heroBanners.map((_, i) => (
              <span
                key={i}
                className={`indicator-dot ${i === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
        </section>

        {/* 3. Four Value Pillars Strip */}
        <section className="value-pillars-strip">
          <div className="pillar-item">
            <div className="pillar-icon-box">
              <FaTruckFast color="#ff5000" />
            </div>
            <div>
              <h4>Free Express Shipping</h4>
              <p>On all prepaid orders over ₹999</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">
              <FaArrowRotateLeft color="#10b981" />
            </div>
            <div>
              <h4>7 Days Easy Return</h4>
              <p>Instant refunds & easy replacements</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">
              <FaShieldHalved color="#0f172a" />
            </div>
            <div>
              <h4>100% Genuine Products</h4>
              <p>Verified sellers & authentic quality</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">
              <FaHeadset color="#ec4899" />
            </div>
            <div>
              <h4>24/7 Dedicated Care</h4>
              <p>Quick resolution for all your queries</p>
            </div>
          </div>
        </section>

        {/* 4. Deals of the Day (Live Flash Discount Cards) */}
        <section className="catalog-section">
          <div className="catalog-header">
            <div className="header-left-title">
              <span className="section-badge-red">
                <FaBolt /> LIMITED TIME DEALS
              </span>
              <h2>Deal of the Day</h2>
              <p>Special curated discounts expiring at midnight</p>
            </div>
            <button className="see-more-link-btn" onClick={() => navigate("/product")}>
              View All Deals <FaArrowRight />
            </button>
          </div>

          <div className="products-grid-row">
            {dealProducts.map((prod) => {
              const isLiked = isInWishlist(prod._id);
              const originalPrice = Math.round(Number(prod.productPrice || 999) * 1.35);
              return (
                <div key={prod._id} className="clean-product-card">
                  <span className="card-save-tag">SAVE 35%</span>

                  <div
                    className="card-thumbnail-box"
                    onClick={() => navigate(`/product/${prod._id}`)}
                  >
                    <img
                      src={prod.Image || "/placeholder.png"}
                      alt={prod.productTitle}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
                      }}
                    />
                    <button
                      className="card-wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      title={isLiked ? "Remove Wishlist" : "Save to Wishlist"}
                    >
                      {isLiked ? <FaHeart color="#ec4899" /> : <FaRegHeart color="#64748b" />}
                    </button>
                  </div>

                  <div className="card-info-box" onClick={() => navigate(`/product/${prod._id}`)}>
                    <div className="card-rating-strip">
                      <FaStar color="#ff9900" size={12} />
                      <span>4.8 (120+ reviews)</span>
                    </div>

                    <h3 title={prod.productTitle}>{prod.productTitle}</h3>

                    <div className="card-price-row">
                      <span className="current-price">₹{Number(prod.productPrice || 0).toLocaleString()}</span>
                      <span className="original-price">₹{originalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="card-action-btn" onClick={() => addToCart(prod)}>
                    <FaCartPlus /> Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Dual Category Feature Banners */}
        <section className="dual-feature-section">
          <div
            className="feature-promo-card promo-orange"
            onClick={() => navigate("/product?q=Electronics")}
          >
            <div className="feature-text">
              <span className="feature-kicker">SMART LIVING</span>
              <h3>Premium Audio & Wireless Gadgets</h3>
              <p>Experience crystal-clear sound with active noise cancellation.</p>
              <button className="feature-btn">
                Shop Audio <FaArrowRight />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=450"
              alt="Headphones promo"
            />
          </div>

          <div
            className="feature-promo-card promo-dark"
            onClick={() => navigate("/product?q=Fashion")}
          >
            <div className="feature-text">
              <span className="feature-kicker">NEW ARRIVALS</span>
              <h3>Urban Streetwear & Sneakers</h3>
              <p>Upgrade your everyday look with modern trends and comfortable styles.</p>
              <button className="feature-btn">
                Discover Fashion <FaArrowRight />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=450"
              alt="Fashion promo"
            />
          </div>
        </section>

        {/* 6. Trending Catalog Section */}
        <section className="catalog-section">
          <div className="catalog-header">
            <div className="header-left-title">
              <span className="section-badge-green">
                <FaFire /> POPULAR CHOICES
              </span>
              <h2>Trending in ShopMate Store</h2>
              <p>Top picks loved and rated high by verified shoppers</p>
            </div>
            <button className="see-more-link-btn" onClick={() => navigate("/product")}>
              Explore All Items <FaArrowRight />
            </button>
          </div>

          <div className="products-grid-row">
            {trendingProducts.map((prod) => {
              const isLiked = isInWishlist(prod._id);
              return (
                <div key={prod._id} className="clean-product-card">
                  <div
                    className="card-thumbnail-box"
                    onClick={() => navigate(`/product/${prod._id}`)}
                  >
                    <img
                      src={prod.Image || "/placeholder.png"}
                      alt={prod.productTitle}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
                      }}
                    />
                    <button
                      className="card-wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                    >
                      {isLiked ? <FaHeart color="#ec4899" /> : <FaRegHeart color="#64748b" />}
                    </button>
                  </div>

                  <div className="card-info-box" onClick={() => navigate(`/product/${prod._id}`)}>
                    <div className="card-rating-strip">
                      <FaStar color="#ff9900" size={12} />
                      <span>4.7 (88 reviews)</span>
                    </div>

                    <h3 title={prod.productTitle}>{prod.productTitle}</h3>

                    <div className="card-price-row">
                      <span className="current-price">₹{Number(prod.productPrice || 0).toLocaleString()}</span>
                      <span className="stock-in-text">In Stock</span>
                    </div>
                  </div>

                  <button className="card-action-btn" onClick={() => addToCart(prod)}>
                    <FaCartPlus /> Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. VIP Newsletter Banner */}
        <section className="vip-newsletter-card">
          <div className="vip-content">
            <h2>Join ShopMate VIP & Save 10%</h2>
            <p>Subscribe to receive members-only secret discount codes and flash deal alerts!</p>
            <div className="newsletter-form-inline">
              <input type="email" placeholder="Enter your email address" />
              <button onClick={() => alert("Welcome to ShopMate VIP! Discount code sent to your email.")}>
                Get My 10% Off
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
