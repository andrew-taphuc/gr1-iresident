import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../untils/axiosIntance';
import '../styles/Login.css';
import loginImage from '../assets/v5.jpg';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if(!formData.fullName) {
        setError('Vui lòng nhập họ tên');
        return;
      }

      if(!formData.username) {
        setError('Vui lòng nhập tên đăng nhập');
        return;
      }
      
      if(!formData.email) {
        setError('Vui lòng nhập email');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(formData.email)) {
        setError('Email không hợp lệ');
        return;
      }

      if(!formData.phoneNumber) {
        setError('Vui lòng nhập số điện thoại');
        return;
      }

      // Validate phoneNumber format
      const phoneNumberRegex = /^[0-9]{10,11}$/;
      if(!phoneNumberRegex.test(formData.phoneNumber)) {
        setError('Số điện thoại không hợp lệ');
        return;
      }
      
      if(!formData.password) {
        setError('Vui lòng nhập mật khẩu'); 
        return;
      }

      if(formData.password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự'); 
        return;
      }

      // Gọi API đăng ký
      const response = await axiosInstance.post('/users/create-user', {
        Username: formData.username,
        Password: formData.password,
        FullName: formData.fullName,
        Email: formData.email,
        PhoneNumber: formData.phoneNumber
      
      });

      if (response.data.error === false) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        setError(response.data.message || 'Đăng ký thất bại');
      }
      
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng ký thất bại';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img 
          src={loginImage} 
          alt="Register background" 
          className="login-image"
        />
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <h2>Đăng ký tài khoản</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="fullName">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                disabled={loading}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
                disabled={loading}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập địa chỉ email"
                disabled={loading}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                disabled={loading}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                >
                  {showPassword ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                     <circle cx="12" cy="12" r="3"></circle>
                   </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                  )}
                </button>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
            </button>
          </form>
          <div className="register-link">
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 