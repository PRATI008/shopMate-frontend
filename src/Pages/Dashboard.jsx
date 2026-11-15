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
  FaUsers,
  FaTag,
  FaBan,
  FaCheck
} from 'react-icons/fa';
import './CSS/Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'add_product', 'orders', 'users', 'coupons'
  const [overview, setOverview] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add Product form state
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('Fashion');
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // New Coupon form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [newCouponMinOrder, setNewCouponMinOrder] = useState('');

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchOverview();
    fetchProducts();
    fetchOrders();
    fetchUsers();
    fetchCoupons();
  }, []);

  const fetchOverview = async () => {
    try {
      const res = await axios.get(`${api_url}/api/admin/overview`);
      if (res.data && res.data.success) {
        setOverview(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${api_url}/api/admin/users`);
      if (res.data && res.data.users) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${api_url}/api/coupons/all`);
      if (res.data && res.data.coupons) {
        setCoupons(res.data.coupons);
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

  const handleToggleUserBlock = async (userId) => {
    try {
      const res = await axios.put(`${api_url}/api/admin/users/toggle-block/${userId}`);
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        fetchUsers();
      }
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponDiscount) {
      toast.warn('Please provide coupon code and discount percentage');
      return;
    }
    try {
      const res = await axios.post(`${api_url}/api/coupons/create`, {
        code: newCouponCode.trim().toUpperCase(),
        discountType: 'percentage',
        discountValue: Number(newCouponDiscount),
        minOrderAmount: Number(newCouponMinOrder || 0),
        expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      });
      if (res.data && res.data.success) {
        toast.success('Promo coupon created!');
        setNewCouponCode('');
        setNewCouponDiscount('');
        setNewCouponMinOrder('');
        fetchCoupons();
      }
    } catch (err) {
      toast.error('Could not create coupon');
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(`${api_url}/api/coupons/delete/${id}`);
      toast.success('Coupon deleted');
      fetchCoupons();
    } catch (err) {
      toast.error('Delete failed');
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
      formData.append('category', productCategory);
      formData.append('Image', imageFile);

      const res = await axios.post(`${api_url}/api/products/add-products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data && res.data.success) {
        toast.success('Product Added to Cloudinary & MongoDB! 🎉');
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
            <FaBoxes className="stat-icon" color="#ff5000" />
            <div>
              <h3>{products.length}</h3>
              <p>Active Catalog Items</p>
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

          <div className="stat-card">
            <FaUsers className="stat-icon" color="#ec4899" />
            <div>
              <h3>{users.length}</h3>
              <p>Registered Users</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button
            className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview & Metrics
          </button>
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
            Orders Fulfillment ({orders.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'coupons' ? 'active' : ''}`}
            onClick={() => setActiveTab('coupons')}
          >
            Coupons ({coupons.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Customer Accounts ({users.length})
          </button>
        </div>

        {/* Tab 0: Overview */}
        {activeTab === 'overview' && (
          <div className="admin-content-box">
            <h2>Live Operations Summary</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '8px' }}>📦 Order Status Distribution</h4>
                <p>Pending Processing: <strong>{orders.filter((o) => o.orderStatus === 'Placed').length}</strong></p>
                <p>In Transit / Shipped: <strong>{orders.filter((o) => o.orderStatus === 'Shipped' || o.orderStatus === 'Out for Delivery').length}</strong></p>
                <p>Delivered Successfully: <strong style={{ color: '#16a34a' }}>{orders.filter((o) => o.orderStatus === 'Delivered').length}</strong></p>
              </div>

              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '8px' }}>💳 Payment Gateways Used</h4>
                <p>Online (UPI / Cards): <strong>{orders.filter((o) => o.paymentMethod !== 'COD').length}</strong></p>
                <p>Cash on Delivery (COD): <strong>{orders.filter((o) => o.paymentMethod === 'COD').length}</strong></p>
              </div>
            </div>
          </div>
        )}

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
                    <th>Stock</th>
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
                        {item.category && <span style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>{item.category}</span>}
                      </td>
                      <td>₹{Number(item.productPrice || 0).toLocaleString()}</td>
                      <td>
                        <span style={{ color: (item.stock || 50) <= 10 ? '#ef4444' : '#16a34a', fontWeight: 'bold' }}>
                          {item.stock || 50} units
                        </span>
                      </td>
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
                <label>Category *</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#f8fafc' }}
                >
                  <option value="Fashion">Fashion</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Bags">Bags</option>
                </select>
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
                <label>Product Image * (Upload file to Cloudinary)</label>
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
                        <strong style={{ color: ord.orderStatus === 'Delivered' ? '#16a34a' : '#ff5000' }}>
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
                          <option value="Processing">Processing</option>
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

        {/* Tab 4: Coupons Management */}
        {activeTab === 'coupons' && (
          <div className="admin-content-box">
            <h2>Promo Coupons & Discount Management</h2>

            {/* Create Coupon inline form */}
            <form onSubmit={handleCreateCoupon} style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Code (e.g. SUMMER20)"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                style={{ padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px' }}
                required
              />
              <input
                type="number"
                placeholder="Discount % (e.g. 20)"
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(e.target.value)}
                style={{ padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', width: '150px' }}
                required
              />
              <input
                type="number"
                placeholder="Min Order (e.g. 999)"
                value={newCouponMinOrder}
                onChange={(e) => setNewCouponMinOrder(e.target.value)}
                style={{ padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', width: '150px' }}
              />
              <button type="submit" style={{ padding: '10px 20px', background: '#ff5000', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                <FaPlus /> Add Coupon
              </button>
            </form>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Coupon Code</th>
                  <th>Discount</th>
                  <th>Min Order</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c._id}>
                    <td><strong>{c.code}</strong></td>
                    <td>{c.discountValue}%</td>
                    <td>₹{c.minOrderAmount}</td>
                    <td><span style={{ color: '#16a34a', fontWeight: 'bold' }}>Active</span></td>
                    <td>
                      <button onClick={() => handleDeleteCoupon(c._id)} className="table-delete-btn">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 5: Users Management */}
        {activeTab === 'users' && (
          <div className="admin-content-box">
            <h2>Registered Customer Accounts</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td><strong>{u.fullname}</strong></td>
                    <td>{u.email}</td>
                    <td><span className="badge-payment">{u.role}</span></td>
                    <td>
                      <span style={{ color: u.isBlocked ? '#ef4444' : '#16a34a', fontWeight: 'bold' }}>
                        {u.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleUserBlock(u._id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          background: u.isBlocked ? '#ecfdf5' : '#fee2e2',
                          color: u.isBlocked ? '#16a34a' : '#ef4444',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {u.isBlocked ? 'Unblock User' : 'Block User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
