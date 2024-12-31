import React, { useState } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import logo from '../assets/logo.png';

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false); // User Dropdown State
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false); // Admin Dropdown State

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-7 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="UsShop" className="h-8" />
          <span className="text-white text-2xl font-bold">UsShop</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-white hover:text-gray-300 flex items-center space-x-1"
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          {userInfo ? (
            <div className="relative">
              {/* User Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white hover:text-gray-300 flex items-center space-x-1 border border-white px-3 py-1 rounded"
              >
                <FaUser className="text-xl" />
                <span>{userInfo.name}</span>
              </button>

              {/* User Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-gray-300 flex items-center space-x-1"
            >
              <FaUser className="text-xl" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Admin Dropdown */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative">
              <button
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className="text-white hover:text-gray-300 flex items-center space-x-1 border border-white px-3 py-1 rounded"
              >
                <span>Admin</span>
              </button>

              {/* Admin Dropdown Menu */}
              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200"
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200"
                  >
                    Users
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
