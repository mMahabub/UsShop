import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/orderApiSlice.js';
import { setCredentials } from '../slices/authSlice';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Form */}
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            User Profile
          </h2>
          <form
            className="space-y-4"
            onSubmit={submitHandler}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Update
            </button>
            {loadingUpdateProfile && (
              <p className="text-blue-500 mt-2">Updating...</p>
            )}
          </form>
        </div>

        {/* Orders Table */}
        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            My Orders
          </h2>
          {isLoading ? (
            <p className="text-blue-500">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error?.data?.message || error.error}</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">DATE</th>
                  <th className="p-3">TOTAL</th>
                  <th className="p-3">PAID</th>
                  <th className="p-3">DELIVERED</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-blue-50 transition duration-300"
                  >
                    <td className="p-3">{order._id}</td>
                    <td className="p-3">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-3">{order.totalPrice}</td>
                    <td className="p-3">
                      {order.isPaid ? (
                        <span className="text-green-500">
                          {order.paidAt.substring(0, 10)}
                        </span>
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="p-3">
                      {order.isDelivered ? (
                        <span className="text-green-500">
                          {order.deliveredAt.substring(0, 10)}
                        </span>
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="p-3">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-blue-500 underline hover:text-blue-700 transition duration-300"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
