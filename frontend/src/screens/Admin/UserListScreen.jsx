import React from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted successfully!');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-700 via-neutral-600 to-zinc-500 p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-cyan-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Admin</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="py-3 px-6">{user._id}</td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {user.email}
                    </a>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500 text-xl" />
                    ) : (
                      <FaTimes className="text-red-500 text-xl" />
                    )}
                  </td>
                  <td className="py-3 px-6 text-center flex justify-center gap-4">
                    {!user.isAdmin && (
                      <>
                        <Link
                          to={`/admin/user/${user._id}/edit`}
                          className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-110"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition-transform duration-300 transform hover:scale-110"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
