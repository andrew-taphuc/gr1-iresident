import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireApartment = true }) => {
  const token = localStorage.getItem('token');
  const selectedApartmentId = localStorage.getItem('selectedApartmentId');

  // Nếu chưa đăng nhập, chuyển đến trang login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu cần apartment nhưng chưa chọn, chuyển đến trang list apartment
  if (requireApartment && !selectedApartmentId) {
    return <Navigate to="/list-apartment" replace />;
  }

  return children;
};

export default ProtectedRoute; 