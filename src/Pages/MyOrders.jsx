import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBoxOpen, FaTruck, FaArrowRight, FaBagShopping, FaFileInvoice, FaPrint } from 'react-icons/fa6';

const MyOrders = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api_url}/api/order/user-orders/${user?.email}`);
      if (res.data && res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: '1000px', margin: '30px auto 60px', padding: '0 20px', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          My Order History
        </h1>
        <p style={{ color: '#64748b', marginBottom: '28px' }}>
          Check details, download tax invoices, and track delivery status of your past orders.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#f8fafc',
              borderRadius: '16px',
              border: '1px dashed #cbd5e1'
            }}
          >
            <FaBagShopping size={54} color="#cbd5e1" />
            <h3 style={{ fontSize: '18px', color: '#0f172a', marginTop: '16px' }}>No orders found yet</h3>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
              Looks like you haven't bought anything yet. Explore our deals!
            </p>
            <button
              onClick={() => navigate('/product')}
              style={{
                background: '#f95919',
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((ord) => (
              <div
                key={ord._id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                {/* Order Top Bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f1f5f9',
                    paddingBottom: '14px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '15px' }}>
                      Order #{ord.orderId}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '13px', marginLeft: '12px' }}>
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        background: ord.orderStatus === 'Delivered' ? '#dcfce7' : '#fef9c3',
                        color: ord.orderStatus === 'Delivered' ? '#15803d' : '#a16207'
                      }}
                    >
                      Status: {ord.orderStatus}
                    </span>

                    <button
                      onClick={() => setSelectedInvoice(ord)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        color: '#1e293b'
                      }}
                      title="View & Print Tax Invoice"
                    >
                      <FaFileInvoice /> Invoice
                    </button>
                  </div>
                </div>

                {/* Items preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {ord.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={item.image || '/placeholder.png'}
                        alt={item.productTitle}
                        style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>{item.productTitle}</h4>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Qty: {item.quantity}</span>
                      </div>
                      <span style={{ fontWeight: '700', fontSize: '14px' }}>
                        ₹{(item.quantity * item.productPrice).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f8fafc',
                    paddingTop: '14px'
                  }}
                >
                  <div>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>Total Amount: </span>
                    <strong style={{ fontSize: '16px', color: '#0f172a' }}>
                      ₹{ord.grandTotal?.toLocaleString()}
                    </strong>
                    <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '8px' }}>
                      ({ord.paymentMethod})
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/track-order/${ord.orderId}`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#f95919',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaTruck /> Track Package <FaArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Printable Tax Invoice Modal */}
        {selectedInvoice && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px'
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '650px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '30px',
                position: 'relative'
              }}
              id="printable-tax-invoice"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #ff5000', paddingBottom: '16px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '24px', color: '#131921' }}>
                    Shop<span style={{ color: '#ff5000' }}>Mate</span> Retail Pvt Ltd
                  </h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                    GSTIN: 09AAACS1234F1Z8 | FSSAI: 10020051000123
                  </p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                    123 MG Road, Hazratganj, Lucknow, UP - 226001
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ margin: 0, color: '#131921', fontSize: '18px' }}>TAX INVOICE</h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: 'bold' }}>
                    #{selectedInvoice.orderId}
                  </p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                    Date: {new Date(selectedInvoice.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Customer and Shipping Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Billed & Shipped To:</span>
                  <h4 style={{ margin: '6px 0 2px 0', fontSize: '14px' }}>{selectedInvoice.shippingDetails?.fullName}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#475569' }}>
                    {selectedInvoice.shippingDetails?.street}, {selectedInvoice.shippingDetails?.city}, {selectedInvoice.shippingDetails?.state} - {selectedInvoice.shippingDetails?.pincode}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#475569' }}>
                    Mobile: {selectedInvoice.shippingDetails?.phone}
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Payment Details:</span>
                  <p style={{ margin: '6px 0 2px 0', fontSize: '13px', fontWeight: 'bold' }}>
                    Mode: {selectedInvoice.paymentMethod}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: selectedInvoice.paymentStatus === 'Completed' ? '#10b981' : '#f59e0b', fontWeight: '600' }}>
                    Payment Status: {selectedInvoice.paymentStatus}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#475569' }}>
                    Shipment: {selectedInvoice.deliverySpeed || 'Express Courier'}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                    <th style={{ padding: '8px', borderBottom: '1px solid #cbd5e1' }}>Item</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #cbd5e1', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #cbd5e1', textAlign: 'right' }}>Price</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #cbd5e1', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items?.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 8px' }}>{item.productTitle}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'right' }}>₹{Number(item.productPrice).toLocaleString()}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'right' }}>₹{(item.quantity * item.productPrice).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ marginLeft: 'auto', width: '250px', fontSize: '13px', display: 'grid', gap: '6px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Subtotal:</span>
                  <span>₹{Number(selectedInvoice.subtotal || selectedInvoice.grandTotal).toLocaleString()}</span>
                </div>
                {selectedInvoice.discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                    <span>Coupon Discount:</span>
                    <span>-₹{selectedInvoice.discountAmount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Delivery Charges:</span>
                  <span>{selectedInvoice.shippingFee > 0 ? `₹${selectedInvoice.shippingFee}` : 'FREE'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', borderTop: '1px solid #cbd5e1', paddingTop: '8px', color: '#131921' }}>
                  <span>Grand Total:</span>
                  <span>₹{Number(selectedInvoice.grandTotal).toLocaleString()}</span>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handlePrintInvoice}
                  style={{
                    background: '#ff5000',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <FaPrint /> Print / Save as PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
