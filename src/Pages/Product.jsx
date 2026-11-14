import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { IoIosSearch } from "react-icons/io";
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import "./CSS/Product.css";
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const api_url = import.meta.env.VITE_API_URL;

  // Read URL query parameter ?q= if coming from Header search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api_url}/api/products/get-products`);
      if (res.data && res.data.products) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Filter & Search Logic
  const filteredProducts = products
    .filter((item) => {
      const title = item.productTitle ? item.productTitle.toLowerCase() : "";
      const category = item.category ? item.category.toLowerCase() : "";
      const query = searchTerm.toLowerCase();
      return title.includes(query) || category.includes(query);
    })
    .sort((a, b) => {
      const priceA = Number(a.productPrice) || 0;
      const priceB = Number(b.productPrice) || 0;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "name-asc") return (a.productTitle || "").localeCompare(b.productTitle || "");
      return 0;
    });

  return (
    <>
      <Header />
      <div className="product-page-wrapper">
        <div className="product-navbar">
          <h1>All Products</h1>

          <div className="search-bar">
            <IoIosSearch size={20} />
            <input
              type="text"
              placeholder="Search products, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="sort-by">
            <p>Sort by:</p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Product Cards Section */}
        <div className="product-section">
          {loading ? (
            <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "60px 0" }}>
              <p style={{ color: "#64748b", fontSize: "16px" }}>Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => {
            const isLiked = isInWishlist(item._id);
            return (
              <div className="card" key={item._id || index}>
                <div
                  className="card-img-wrapper"
                  onClick={() => navigate(`/product/${item._id}`)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <img
                    src={item.Image || "/placeholder.png"}
                    alt={item.productTitle}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60";
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                    title={isLiked ? "Remove Wishlist" : "Add to Wishlist"}
                  >
                    {isLiked ? <FaHeart color="#e11d48" size={15} /> : <FaRegHeart color="#64748b" size={15} />}
                  </button>
                </div>
                <div
                  className="card-info"
                  onClick={() => navigate(`/product/${item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <h3 title={item.productTitle}>{item.productTitle}</h3>
                  <div className="card-price-row">
                    <p className="price">₹{Number(item.productPrice || 0).toLocaleString()}</p>
                    {item.category && <span className="category-tag">{item.category}</span>}
                  </div>
                </div>
                <button onClick={() => addToCart(item)}>
                  <FaCartShopping /> Add to Cart
                </button>
              </div>
            );
          })
          ) : (
            <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "60px 20px" }}>
              <h3 style={{ color: "#1e293b", marginBottom: "8px" }}>No products found!</h3>
              <p style={{ color: "#64748b" }}>Try searching with a different keyword or filter.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
