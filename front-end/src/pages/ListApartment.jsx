import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../untils/axiosIntance';
import { setSelectedApartment } from '../untils/apartmentContext';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import '../styles/ListApartment.css';

const ListApartment = () => {
  const navigate = useNavigate();
  const apartmentImages = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/606153097.jpg?k=86f5bbf039183c92c755a5582a9daa3bdd0d6e7ddce11021106b313d3c74a757&o=&hp=1',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/The_Lauren_condo_Bethesda_MD_2021-12-12_10-11-55_1.jpg/960px-The_Lauren_condo_Bethesda_MD_2021-12-12_10-11-55_1.jpg'
  ];
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newApartment, setNewApartment] = useState({
    ApartmentName: '',
    Phone: '',
    Address: ''
  });

  useEffect(() => {
    fetchUserApartments();
  }, []);

  const fetchUserApartments = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('id');
      const response = await axiosInstance.get(`/user-apartments/get-apartments-by-user/${userId}`);
      
      if (response.data.error === false) {
        // Lấy role cho mỗi apartment
        const apartmentsWithRoles = await Promise.all(
          response.data.apartments.map(async (userApartment) => {
            try {
              const roleResponse = await axiosInstance.get(`/user-apartment-roles/get-roles-by-user-apartment/${userApartment.UserApartmentID}`);
              
              let userRole = 'Cư dân'; // Default role
              if (roleResponse.data.error === false && roleResponse.data.roles && roleResponse.data.roles.length > 0) {
                const activeRole = roleResponse.data.roles.find(role => role.IsActive === true);
                if (activeRole && activeRole.Role) {
                  userRole = activeRole.Role.RoleName;
                }
              }
              
              // Chọn ảnh ngẫu nhiên cho mỗi apartment
              const randomImage = apartmentImages[Math.floor(Math.random() * apartmentImages.length)];
              
              return {
                ...userApartment,
                userRole: userRole,
                image: randomImage
              };
            } catch (error) {
              console.error('Error fetching role for apartment:', userApartment.UserApartmentID, error);
              // Chọn ảnh ngẫu nhiên cho mỗi apartment
              const randomImage = apartmentImages[Math.floor(Math.random() * apartmentImages.length)];
              
              return {
                ...userApartment,
                userRole: 'Cư dân',
                image: randomImage
              };
            }
          })
        );
        
        setApartments(apartmentsWithRoles);
      } else {
        setError('Không thể tải danh sách chung cư');
      }
    } catch (err) {
      console.error('Error fetching apartments:', err);
      setError('Không thể tải danh sách chung cư');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectApartment = async (apartment) => {
    try {
      // Lưu thông tin apartment vào localStorage sử dụng utility function
      setSelectedApartment(
        apartment.Apartment.ApartmentID,
        apartment.Apartment.ApartmentName
      );
      
      // Lưu role từ data đã có sẵn (không cần gọi API lại)
      const userRole = apartment.userRole || 'Cư dân';
      localStorage.setItem('role', userRole);
      console.log('User role in apartment:', userRole);
      
      // Chuyển đến trang home
      navigate('/home');
    } catch (err) {
      console.error('Error selecting apartment:', err);
      // Nếu có lỗi, vẫn chuyển trang nhưng set role mặc định
      localStorage.setItem('role', 'Cư dân');
      navigate('/home');
    }
  };

  const handleCreateApartment = async (e) => {
    e.preventDefault();
    
    try {
      // Tạo apartment mới
      const apartmentResponse = await axiosInstance.post('/apartments/create-apartment', {
        ApartmentName: newApartment.ApartmentName,
        Phone: newApartment.Phone,
        Address: newApartment.Address
      });

      if (apartmentResponse.data.error === false) {
        const newApartmentId = apartmentResponse.data.apartment.ApartmentID;
        const userId = localStorage.getItem('id');

        // Liên kết user với apartment mới
        const userApartmentResponse = await axiosInstance.post('/user-apartments/create-user-apartment', {
          UserID: userId,
          ApartmentID: newApartmentId
        });

        if (userApartmentResponse.data.error === false) {
          const userApartmentId = userApartmentResponse.data.userApartment.UserApartmentID;
          
          // Tìm role "Tổ trưởng" (đã được tạo tự động)
          const rolesResponse = await axiosInstance.get('/roles/get-all-roles');
          let leaderRoleId = null;
          
          if (rolesResponse.data.error === false) {
            const leaderRole = rolesResponse.data.roles.find(role => role.RoleName?.toLowerCase() === 'tổ trưởng');
            if (leaderRole) {
              leaderRoleId = leaderRole.RoleID;
            }
          }
          
          // Gán quyền "Tổ trưởng" cho user
          if (leaderRoleId) {
            await axiosInstance.post('/user-apartment-roles/create-user-apartment-role', {
              UserApartmentID: userApartmentId,
              RoleID: leaderRoleId,
              IsActive: true
            });
          }
          // Lưu apartment mới vào context và chuyển sang home
          setSelectedApartment(newApartmentId, newApartment.ApartmentName);
          navigate('/home');
          return;
        }
      }
    } catch (err) {
      console.error('Error creating apartment:', err);
      setError('Không thể tạo chung cư mới');
    }
  };



  if (loading) {
    return (
      <div className="list-apartment-container">
        <Header />
        <div className="loading">Đang tải...</div>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="list-apartment-container">
      <Header />
      
      <div className="list-apartment-content">
        <div className="list-apartment-header">
          <h1>Chọn Chung Cư</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="apartments-list">
          {apartments.length === 0 ? (
            <div className="no-apartments">
              <p>Bạn chưa có chung cư nào.</p>
              <button 
                onClick={() => setShowCreateForm(true)} 
                className="create-apartment-button"
              >
                Tạo Chung Cư Mới
              </button>
            </div>
          ) : (
            <div className="apartments-grid">
              {apartments.map((userApartment) => (
                <div 
                  key={userApartment.UserApartmentID} 
                  className="apartment-card"
                >
                  <div className="apartment-image">
                    <img 
                      src={userApartment.image} 
                      alt={userApartment.Apartment.ApartmentName}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150x100?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="apartment-content">
                    <div className="apartment-info">
                      <h3>{userApartment.Apartment.ApartmentName}</h3>
                      <h4>Vai trò: {userApartment.userRole}</h4>
                      {userApartment.Apartment.Phone && (
                        <p><strong>Điện thoại:</strong> {userApartment.Apartment.Phone}</p>
                      )}
                      {userApartment.Apartment.Address && (
                        <p><strong>Địa chỉ:</strong> {userApartment.Apartment.Address}</p>
                      )}
                    </div>
                    <div className="apartment-action">
                      <button 
                        onClick={() => handleSelectApartment(userApartment)}
                        className="select-apartment-button"
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Tạo Chung Cư Mới</h2>
            <form onSubmit={handleCreateApartment}>
              <div className="form-group">
                <label htmlFor="apartmentName">Tên Chung Cư *</label>
                <input
                  type="text"
                  id="apartmentName"
                  value={newApartment.ApartmentName}
                  onChange={(e) => setNewApartment({...newApartment, ApartmentName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Điện Thoại</label>
                <input
                  type="text"
                  id="phone"
                  value={newApartment.Phone}
                  onChange={(e) => setNewApartment({...newApartment, Phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Địa Chỉ</label>
                <textarea
                  id="address"
                  value={newApartment.Address}
                  onChange={(e) => setNewApartment({...newApartment, Address: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateForm(false)}>
                  Hủy
                </button>
                <button type="submit">Tạo</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Navbar />
    </div>
  );
};

export default ListApartment; 