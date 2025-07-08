/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import '../styles/Account.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import AddAccount from '../components/AddAccount'; 
import axiosIntance from '../untils/axiosIntance'; 
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa'; 
import Toast from '../components/Toast';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { validateEmail, validatePassword, validatePhoneNumber } from '../untils/helper';

const Account = () => {
  const [open, setOpen] = React.useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved === null ? false : JSON.parse(saved);
  });
  React.useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(open));
  }, [open]);

  const [search, setSearch] = React.useState('');
  const [showAddAccount, setShowAddAccount] = React.useState(false);
  const [showAddExistingUser, setShowAddExistingUser] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const [editAccount, setEditAccount] = React.useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [deletingAccount, setDeletingAccount] = useState(null);
  const [existingUserData, setExistingUserData] = useState({
    email: '',
    role: ''
  });
  const [roles, setRoles] = useState([]);
  const [showAddAccountMenu, setShowAddAccountMenu] = useState(false);
  const addAccountMenuRef = useRef(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    if (!showAddAccountMenu) return;
    const handleClickOutside = (event) => {
      if (addAccountMenuRef.current && !addAccountMenuRef.current.contains(event.target)) {
        setShowAddAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddAccountMenu]);

  const handleDeleteAccount = async (userApartmentId) => {
    try {
      // Xóa user khỏi apartment (xóa record trong user_apartments)
      await axiosIntance.delete(`/user-apartments/delete-user-apartment/${userApartmentId}`);
      await fetchAccounts();
      setToast({ message: 'Xóa tài khoản khỏi chung cư thành công!', type: 'success' });
    } catch (error) {
      console.error('Error deleting account:', error);
      setToast({ message: 'Xóa tài khoản thất bại!', type: 'error' });
    }
  };

  // Lấy danh sách tài khoản và roles
  React.useEffect(() => {
    fetchAccounts();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axiosIntance.get('/roles/get-all-roles');
      if (response.data.error === false) {
        setRoles(response.data.roles);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const apartmentId = localStorage.getItem('selectedApartmentId');
      if (!apartmentId) {
        console.log('No apartmentId found in localStorage');
        setAccounts([]);
        return;
      }

      console.log('Fetching accounts for apartmentId:', apartmentId);
      
      // Lấy danh sách user-apartment của chung cư hiện tại
      const res = await axiosIntance.get(`/user-apartments/get-users-by-apartment/${apartmentId}`);
      
      console.log('API Response:', res.data);
      console.log('Response structure:', Object.keys(res.data));
      
      if (res.data.error === false && res.data.userApartments) {
        // Chuyển đổi dữ liệu cho frontend
        const usersWithRoles = await Promise.all(
          res.data.userApartments.map(async (userApartment) => {
            try {
              // Lấy role từ user_apartment_role
              const roleRes = await axiosIntance.get(`/user-apartment-roles/get-roles-by-user-apartment/${userApartment.UserApartmentID}`);
              
              let role = null;
              if (roleRes.data.error === false && roleRes.data.roles && roleRes.data.roles.length > 0) {
                const activeRole = roleRes.data.roles.find(r => r.IsActive === true);
                if (activeRole && activeRole.Role) {
                  role = activeRole.Role.RoleName;
                }
              }

              return {
                id: userApartment.User.UserID,
                userApartmentId: userApartment.UserApartmentID,
                username: userApartment.User.Username,
                fullname: userApartment.User.FullName,
                email: userApartment.User.Email,
                phoneNumber: userApartment.User.PhoneNumber,
                role: role,
                status: userApartment.User.Status,
              };
            } catch (error) {
              console.log('Error getting role for user:', error);
              return {
                id: userApartment.User.UserID,
                userApartmentId: userApartment.UserApartmentID,
                username: userApartment.User.Username,
                fullname: userApartment.User.FullName,
                email: userApartment.User.Email,
                phoneNumber: userApartment.User.PhoneNumber,
                role: null,
                status: userApartment.User.Status,
              };
            }
          })
        );
        
        setAccounts(usersWithRoles);
      } else {
        setAccounts([]);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setAccounts([]);
    }
  };

  // Xử lý thêm tài khoản
  const handleAddAccount = async (data) => {
    // Validate email
    if (!validateEmail(data.email || '')) {
      setToast({ message: 'Email không hợp lệ!', type: 'error' });
      return;
    }
    // Validate số điện thoại
    if (!validatePhoneNumber(data.phoneNumber || '')) {
      setToast({ message: 'Số điện thoại phải có 10 số và bắt đầu bằng số 0!', type: 'error' });
      return;
    }
    // Validate mật khẩu
    if (!validatePassword(data.password || '')) {
      setToast({ message: 'Mật khẩu phải tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!', type: 'error' });
      return;
    }
    
    const apartmentId = localStorage.getItem('selectedApartmentId');
    if (!apartmentId) {
      setToast({ message: 'Không tìm thấy chung cư hiện tại!', type: 'error' });
      return;
    }

    try {
      console.log('Creating account with data:', data);
      
      // BƯỚC 1: Tạo user mới trước (bắt buộc)
      console.log('Step 1: Creating user...');
      const userResponse = await axiosIntance.post('/users/create-user', {
        Username: data.username,
        Password: data.password,
        FullName: data.fullname,
        Email: data.email,
        PhoneNumber: data.phoneNumber,
        // Không set Role ở đây - role sẽ được quản lý trong user_apartment_role
      });
      
             console.log('User created - Full response:', userResponse.data);
       console.log('Response structure:', Object.keys(userResponse.data));
       
       // Lấy UserID từ response - thử nhiều cách khác nhau
       let newUser = null;
       let newUserId = null;
       
       // Thử các cấu trúc response khác nhau
       if (userResponse.data.newAccount) {
         newUser = userResponse.data.newAccount;
         console.log('Found newAccount:', newUser);
       } else if (userResponse.data.user) {
         newUser = userResponse.data.user;
         console.log('Found user:', newUser);
       } else if (userResponse.data.data) {
         newUser = userResponse.data.data;
         console.log('Found data:', newUser);
       } else {
         newUser = userResponse.data;
         console.log('Using direct response:', newUser);
       }
       
       // Thử lấy ID từ nhiều field khác nhau
       if (newUser) {
         newUserId = newUser.UserID || newUser.id || newUser.userId || newUser.ID;
         console.log('Extracted UserID:', newUserId);
         console.log('User object keys:', Object.keys(newUser));
       }
       
       if (!newUserId) {
         console.error('Cannot extract UserID. Response data:', userResponse.data);
         console.error('User object:', newUser);
         
         // Fallback: thử tìm user bằng username vừa tạo
         console.log('Trying fallback: search user by username...');
         try {
           const searchResponse = await axiosIntance.get('/users/get-all-user');
           const allUsers = searchResponse.data.users || searchResponse.data;
           const foundUser = allUsers.find(u => u.Username === data.username);
           
           if (foundUser) {
             newUserId = foundUser.UserID || foundUser.id;
             console.log('Found user via fallback search:', newUserId);
           }
         } catch (fallbackError) {
           console.error('Fallback search failed:', fallbackError);
         }
         
         if (!newUserId) {
           throw new Error(`Không thể lấy UserID từ user đã tạo. Response: ${JSON.stringify(userResponse.data)}`);
         }
       }
      
      console.log('New User ID:', newUserId);
      
      // BƯỚC 2: Tạo user-apartment (liên kết user với apartment)
      console.log('Step 2: Creating user-apartment relationship...');
      const userApartmentResponse = await axiosIntance.post('/user-apartments/create-user-apartment', {
        UserID: newUserId,
        ApartmentID: apartmentId
      });
      
      console.log('User-apartment created:', userApartmentResponse.data);
      
      if (userApartmentResponse.data.error === false) {
        const userApartmentId = userApartmentResponse.data.userApartment.UserApartmentID;
        
        // BƯỚC 3: Nếu có role được chọn, thêm vào user_apartment_role
        if (data.role && data.role !== '') {
          console.log('Step 3: Adding role to user-apartment...');
          
          // Tìm RoleID từ role name
          const rolesResponse = await axiosIntance.get('/roles/get-all-roles');
          if (rolesResponse.data.error === false) {
            const selectedRole = rolesResponse.data.roles.find(role => role.RoleName === data.role);
            if (selectedRole) {
              await axiosIntance.post('/user-apartment-roles/create-user-apartment-role', {
                UserApartmentID: userApartmentId,
                RoleID: selectedRole.RoleID,
                IsActive: true
              });
              console.log('Role assigned successfully:', data.role);
            } else {
              console.warn('Role not found:', data.role);
            }
          }
        } else {
          console.log('No role selected - user will have default null role');
        }
      } else {
        throw new Error('Không thể tạo user-apartment relationship');
      }
      
      await fetchAccounts();
      setShowAddAccount(false);
      setToast({ message: 'Thêm tài khoản thành công!', type: 'success' });
      
    } catch (error) {
      console.error('Error adding account:', error);
      
      // Cung cấp error message chi tiết hơn
      let errorMessage = 'Thêm tài khoản thất bại!';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  // Xử lý thêm user đã tồn tại vào apartment
  const handleAddExistingUser = async (data) => {
    // Validate email
    if (!validateEmail(data.email || '')) {
      setToast({ message: 'Email không hợp lệ!', type: 'error' });
      return;
    }
    
    const apartmentId = localStorage.getItem('selectedApartmentId');
    if (!apartmentId) {
      setToast({ message: 'Không tìm thấy chung cư hiện tại!', type: 'error' });
      return;
    }

    try {
      console.log('Adding existing user with data:', data);
      
      // BƯỚC 1: Tìm user bằng email
      console.log('Step 1: Finding user by email...');
      const searchResponse = await axiosIntance.get('/users/get-all-user');
      
      if (searchResponse.data.error === false) {
        const allUsers = searchResponse.data.users || searchResponse.data;
        const foundUser = allUsers.find(u => u.Email.toLowerCase() === data.email.toLowerCase());
        
        if (!foundUser) {
          setToast({ message: 'Không tìm thấy user với email này!', type: 'error' });
          return;
        }
        
        console.log('Found user:', foundUser);
        const userId = foundUser.UserID || foundUser.id;
        
        // BƯỚC 2: Kiểm tra user đã có trong apartment chưa
        console.log('Step 2: Checking if user already in apartment...');
        const currentUsers = await axiosIntance.get(`/user-apartments/get-users-by-apartment/${apartmentId}`);
        
        if (currentUsers.data.error === false && currentUsers.data.userApartments) {
          const existingUser = currentUsers.data.userApartments.find(ua => ua.User.UserID === userId);
          if (existingUser) {
            setToast({ message: 'User này đã có trong chung cư!', type: 'error' });
            return;
          }
        }
        
        // BƯỚC 3: Thêm user vào apartment với id hiện tại
        console.log('Step 3: Adding user to apartment...');
        const userApartmentResponse = await axiosIntance.post('/user-apartments/create-user-apartment', {
          UserID: userId,
          ApartmentID: apartmentId
        });
        
        if (userApartmentResponse.data.error === false) {
          const userApartmentId = userApartmentResponse.data.userApartment.UserApartmentID;
          console.log('UserApartment created with ID:', userApartmentId);
          
          // BƯỚC 4: Thêm userApartmentID vào bảng user_apartment_role với id tương ứng
          if (data.role && data.role !== '') {
            console.log('Step 4: Adding userApartmentID to user_apartment_role...');
            
            // Tìm RoleID từ role name
            const selectedRole = roles.find(role => role.RoleName === data.role);
            if (selectedRole) {
              await axiosIntance.post('/user-apartment-roles/create-user-apartment-role', {
                UserApartmentID: userApartmentId,
                RoleID: selectedRole.RoleID,
                IsActive: true
              });
              console.log('Role assigned successfully:', data.role, 'with RoleID:', selectedRole.RoleID);
            } else {
              console.warn('Role not found:', data.role);
            }
          }
          
          await fetchAccounts();
          setShowAddExistingUser(false);
          setExistingUserData({ email: '', role: '' });
          setToast({ message: 'Thêm user vào chung cư thành công!', type: 'success' });
        } else {
          throw new Error('Không thể thêm user vào apartment');
        }
      } else {
        throw new Error('Không thể lấy danh sách users');
      }
      
    } catch (error) {
      console.error('Error adding existing user:', error);
      
      let errorMessage = 'Thêm user thất bại!';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  // Xử lý chỉnh sửa tài khoản
  const handleEditAccount = async (data) => {
    // Validate email
    if (!validateEmail(data.email || '')) {
      setToast({ message: 'Email không hợp lệ!', type: 'error' });
      return;
    }
    // Validate số điện thoại
    if (!validatePhoneNumber(data.phoneNumber || '')) {
      setToast({ message: 'Số điện thoại phải có 10 số và bắt đầu bằng số 0!', type: 'error' });
      return;
    }
    // Validate mật khẩu nếu có nhập
    if (data.password && data.password.trim() !== '') {
      if (!validatePassword(data.password)) {
        setToast({ message: 'Mật khẩu phải tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!', type: 'error' });
        return;
      }
    }
    try {
      // Cập nhật thông tin user (không có Role)
      const payload = {
        Username: data.username,
        FullName: data.fullname,
        Email: data.email,
        PhoneNumber: data.phoneNumber,
        Status: data.status, 
      };
      if (data.password) {
        payload.Password = data.password;
      }
      await axiosIntance.put(`/users/update-user/${editAccount.id}`, payload);
      
      // Cập nhật role trong user_apartment_role
      const userApartmentId = editAccount.userApartmentId;
      if (userApartmentId) {
        // Kiểm tra trạng thái để quyết định IsActive
        const isActive = data.status !== 'Đã nghỉ việc';
        console.log('User status:', data.status, 'IsActive:', isActive);
        
        if (data.status === 'Đã nghỉ việc') {
          // Nếu đã nghỉ việc, set tất cả role thành IsActive = false
          console.log('Setting all roles to inactive for retired user');
          try {
            await axiosIntance.put(`/user-apartment-roles/update-active-status/${userApartmentId}`, {
              IsActive: false
            });
          } catch (error) {
            console.warn('Could not update role active status, trying alternative method');
            // Fallback: xóa role cũ và tạo lại với IsActive = false
            await axiosIntance.delete(`/user-apartment-roles/delete-by-user-apartment/${userApartmentId}`);
            
            if (data.role && data.role !== '') {
              const rolesResponse = await axiosIntance.get('/roles/get-all-roles');
              if (rolesResponse.data.error === false) {
                const selectedRole = rolesResponse.data.roles.find(role => role.RoleName === data.role);
                if (selectedRole) {
                  await axiosIntance.post('/user-apartment-roles/create-user-apartment-role', {
                    UserApartmentID: userApartmentId,
                    RoleID: selectedRole.RoleID,
                    IsActive: false
                  });
                }
              }
            }
          }
        } else {
          // Nếu đang hoạt động, xử lý role bình thường
          console.log('Updating roles for active user');
          
          // Xóa role cũ
          await axiosIntance.delete(`/user-apartment-roles/delete-by-user-apartment/${userApartmentId}`);
          
          // Thêm role mới nếu có
          if (data.role && data.role !== '') {
            const rolesResponse = await axiosIntance.get('/roles/get-all-roles');
            if (rolesResponse.data.error === false) {
              const selectedRole = rolesResponse.data.roles.find(role => role.RoleName === data.role);
              if (selectedRole) {
                await axiosIntance.post('/user-apartment-roles/create-user-apartment-role', {
                  UserApartmentID: userApartmentId,
                  RoleID: selectedRole.RoleID,
                  IsActive: true
                });
              }
            }
          }
        }
      }
      
      setEditAccount(null);
      await fetchAccounts();
      setToast({ message: 'Cập nhật tài khoản thành công!', type: 'success' });
    } catch (error) {
      console.error('Error updating account:', error);
      setToast({ message: 'Cập nhật tài khoản thất bại!', type: 'error' });
    }
  };

  // Lọc theo search
  const filteredAccounts = accounts.filter(
    acc =>
      acc.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      acc.email?.toLowerCase().includes(search.toLowerCase()) ||
      acc.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, message: '' })}
      />
      <div className="account-container">
        <Header />
        <div className="account-body">
          <Sidebar open={open} setOpen={setOpen} />
          <div className={`account-content ${open ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className="account-title">
              <h1 className="account-title-text">Danh sách tài khoản:</h1>
              <div className="account-search">
                <SearchBar 
                  placeholder={"Tìm kiếm người dùng..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="account-add-btn-row">
              <div className="add-account-dropdown" ref={addAccountMenuRef}>
                <button
                  className="add-account-btn"
                  onClick={() => setShowAddAccountMenu((v) => !v)}
                  title="Thêm tài khoản"
                >
                  <FaUserPlus /> Thêm tài khoản
                </button>
                {showAddAccountMenu && (
                  <div className="add-account-menu">
                    <div onClick={() => { setShowAddAccount(true); setShowAddAccountMenu(false); }}>
                      Thêm mới tài khoản
                    </div>
                    <div onClick={() => { setShowAddExistingUser(true); setShowAddAccountMenu(false); }}>
                      Thêm user đã có
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="account-list">
              {filteredAccounts.map((acc, idx) => (
                <div
                  className="account-row"
                  key={acc.id || idx}
                  onClick={() => setSelectedUser(acc)}
                  style={{ cursor: 'pointer' }}
                >
                  <span><b>Họ và tên: </b>{acc.fullname}</span>
                  <span><b>Email: </b>{acc.email}</span>
                  <span><b>Vai trò: </b>{acc.role}</span>
                  <span>
                    <b>Trạng thái: </b>
                    <span className={acc.status === "Đang hoạt động" ? "status-active" : "status-inactive"}>
                      {acc.status}
                    </span>
                  </span>
                  <span className="account-actions" onClick={e => e.stopPropagation()}>
                    <FaEdit
                      className="icon-action edit"
                      title="Sửa"
                      onClick={() => setEditAccount(acc)}
                    />
                    <FaTrash
                      className="icon-action delete"
                      title="Xóa"
                      onClick={() => setDeletingAccount(acc)}
                    />
                  </span>
                </div>
              ))}
              {filteredAccounts.length === 0 && (
                <div className="account-row">Không có tài khoản nào.</div>
              )}
            </div>
            {/* Modal hiển thị chi tiết user */}
            {selectedUser && (
              <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <h2>Chi tiết tài khoản</h2>
                  <p><b>Tên đăng nhập:</b> {selectedUser.username}</p>
                  <p><b>Họ và tên:</b> {selectedUser.fullname}</p>
                  <p><b>Email:</b> {selectedUser.email}</p>
                  <p><b>Số điện thoại:</b> {selectedUser.phoneNumber}</p>
                  <p><b>Vai trò:</b> {selectedUser.role}</p>
                  <p>
                    <b>Trạng thái:</b>
                    <span className={selectedUser.status === "Đang hoạt động" ? "status-active" : "status-inactive"}>
                      {selectedUser.status}
                    </span>
                  </p>
                  <button className="modal-cancel" onClick={() => setSelectedUser(null)}>Đóng</button>
                </div>
              </div>
            )}
            <AddAccount
              open={showAddAccount || !!editAccount || showAddExistingUser}
              onClose={() => {
                setShowAddAccount(false);
                setEditAccount(null);
                setShowAddExistingUser(false);
                setExistingUserData({ email: '', role: '' });
              }}
              onSubmit={(data) => {
                if (editAccount) {
                  handleEditAccount(data);
                } else if (showAddExistingUser) {
                  handleAddExistingUser(data);
                } else {
                  handleAddAccount(data);
                }
              }}
              initialData={editAccount ? editAccount : (showAddExistingUser ? existingUserData : {})}
              mode={editAccount ? "edit" : (showAddExistingUser ? "add-existing" : "add")}
            />
            <DeleteConfirmModal
              open={!!deletingAccount}
              title="Xác nhận xóa tài khoản"
              message={
                deletingAccount
                  ? <>Bạn có chắc chắn muốn xóa tài khoản <strong>{deletingAccount.fullname}</strong>?</>
                  : ""
              }
              onConfirm={async () => {
                await handleDeleteAccount(deletingAccount.userApartmentId);
                setDeletingAccount(null);
              }}
              onCancel={() => setDeletingAccount(null)}
            />
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Account;