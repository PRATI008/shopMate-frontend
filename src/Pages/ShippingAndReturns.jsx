import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { FaTruckFast, FaBoxesPacking, FaClock, FaRotateLeft } from 'react-icons/fa6';

const ShippingAndReturns = () => {
  return (
    <>
      <Header />
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', minHeight: '70vh' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <FaTruckFast style={{ fontSize: '36px', color: '#ff5000' }} />
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', color: '#131921' }}>Shipping & Return Policy</h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Fast Pan-India Delivery & 7-Day Hassle-Free Returns</p>
            </div>
          </div>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaBoxesPacking style={{ color: '#10b981' }} /> 1. Shipping Timelines & Rates
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            • <strong>Standard Delivery:</strong> Delivered within 3-5 business days across all metro cities and 5-7 business days for regional pin codes.
            <br />
            • <strong>Delivery Fee:</strong> Flat ₹49 for orders below ₹999. Free Express Shipping on all orders of ₹999 or higher (or with coupon code <code>SHOPFREE</code>).
          </p>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaClock style={{ color: '#ff5000' }} /> 2. Live Shipment Tracking
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            Once your order is handed over to our logistics partner (BlueDart / Delhivery / Ekart), you will receive an SMS and email notification containing your tracking ID. You can also view step-by-step shipment progress at our dedicated <strong>Track Order</strong> portal.
          </p>

          <h3 style={{ color: '#131921', marginTop: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaRotateLeft style={{ color: '#ec4899' }} /> 3. 7-Day Return & Replacement Policy
          </h3>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
            If you receive a defective, damaged, or incorrect item, you can initiate a return or replacement request within 7 calendar days of delivery. Items must remain unused and in their original packaging with all brand tags intact. Once inspected, refunds are credited back to the original payment method within 3 to 5 business days.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingAndReturns;

