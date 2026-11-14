import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaBoxes,
  FaPlus,
  FaTrash,
  FaShoppingBag,
  FaMoneyBillWave,
  FaCheckCircle,
  FaEdit
} from 'react-icons/fa';
import './CSS/Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'add_product', 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add Product form state
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api_url}/api/products/get-products`);
      if (res.data && res.data.products) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${api_url}/api/order/all-orders`);
      if (res.data && res.data.orders) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await axios.delete(`${api_url}/api/products/delete-products/${id}`);
      if (res.data && res.data.success) {
        toast.success('Product deleted successfully');
        fetchProducts();
      }
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${api_url}/api/order/update-status/${orderId}`, {
        orderStatus: newStatus
      });
      if (res.data && res.data.success) {
        toast.success(`Order status updated to "${newStatus}"`);
        fetchOrders();
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!productTitle || !productPrice || !imageFile) {
      toast.warn('Title, Price, and Image are required!');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('productTitle', productTitle);
      formData.append('productDescription', productDescription);
      formData.append('productPrice', productPrice);
      formData.append('Image', imageFile);

      const res = await axios.post(`${api_url}/api/products/add-products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data && res.data.success) {
        toast.success('Product Added Successfully! 🎉');
        setProductTitle('');
        setProductDescription('');
        setProductPrice('');
        setImageFile(null);
        setActiveTab('products');
        fetchProducts();
      } else {
        toast.error(res.data?.message || 'Could not add product');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.grandTotal) || 0), 0);

  return (
    <>
      <Header />
      <div className="admin-container">
        {/* Top Analytics Cards */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <FaBoxes className="stat-icon" color="#f95919" />
            <div>
              <h3>{products.length}</h3>
              <p>Total Products</p>
            </div>
          </div>

          <div className="stat-card">
            <FaShoppingBag className="stat-icon" color="#3b82f6" />
            <div>
              <h3>{orders.length}</h3>
              <p>Total Orders Placed</p>
            </div>
          </div>

          <div className="stat-card">
            <FaMoneyBillWave className="stat-icon" color="#10b981" />
            <div>
              <h3>₹{totalRevenue.toLocaleString()}</h3>
              <p>Total Gross Revenue</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button
            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Manage Products ({products.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'add_product' ? 'active' : ''}`}
            onClick={() => setActiveTab('add_product')}
          >
            <FaPlus /> Add New Product
          </button>
          <button
            className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Manage Customer Orders ({orders.length})
          </button>
        </div>

        {/* Tab 1: Products Management */}
        {activeTab === 'products' && (
          <div className="admin-content-box">
            <h2>Inventory & Product Catalog</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.Image || '/placeholder.png'}
                          alt={item.productTitle}
                          className="table-img"
                        />
                      </td>
                      <td>
                        <strong>{item.productTitle}</strong>
                      </td>
                      <td>₹{Number(item.productPrice || 0).toLocaleString()}</td>
                      <td>
                        <button
                          className="table-delete-btn"
                          onClick={() => handleDeleteProduct(item._id)}
                          title="Delete Product"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Add Product Form */}
        {activeTab === 'add_product' && (
          <div className="admin-content-box" style={{ maxWidth: '650px' }}>
            <h2>Create New Product</h2>
            <form onSubmit={handleCreateProduct} className="add-product-form">
              <div className="form-group">
                <label>Product Title *</label>
                <input
                  type="text"
                  placeholder="E.g. Casual Denim Jacket"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product Price (₹) *</label>
                <input
                  type="number"
                  placeholder="E.g. 1999"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product Description</label>
                <textarea
                  rows="3"
                  placeholder="Add details about material, style, and fit..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Product Image * (Upload file)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required
                />
              </div>

              <button type="submit" className="admin-submit-btn" disabled={submitting}>
                {submitting ? 'Uploading to Cloudinary...' : 'Publish Product to Store'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="admin-content-box">
            <h2>Customer Orders & Fulfillment</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Order Status</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord._id}>
                      <td>
                        <span className="order-tag">{ord.orderId}</span>
                      </td>
                      <td>
                        <div>{ord.shippingDetails?.fullname}</div>
                        <small style={{ color: '#64748b' }}>{ord.shippingDetails?.phone}</small>
                      </td>
                      <td>₹{ord.grandTotal?.toLocaleString()}</td>
                      <td>
                        <span className="badge-payment">{ord.paymentMethod}</span>
                      </td>
                      <td>
                        <strong style={{ color: ord.orderStatus === 'Delivered' ? '#16a34a' : '#f95919' }}>
                          {ord.orderStatus}
                        </strong>
                      </td>
                      <td>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(ord.orderId, e.target.value)}
                          className="status-select"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
