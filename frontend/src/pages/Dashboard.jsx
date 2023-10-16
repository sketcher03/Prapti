import React from 'react';
import '../css/dashboard.css';
import SellerDashboard from './Seller/SellerDashboard';
import BuyerDashboard from './Buyer/BuyerDashboard';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { isSeller } = useSelector((state) => state.user);

  return (
    <div className='dashboard-container'>
      {
        isSeller ? (
          <SellerDashboard />
        ) : (
          <BuyerDashboard />
        )
      }
    </div>
  )
}

export default Dashboard