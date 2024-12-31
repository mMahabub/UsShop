import { FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import { Link } from 'react-router-dom';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Orders
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">USER</th>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">TOTAL</th>
                <th className="px-6 py-4">PAID</th>
                <th className="px-6 py-4">DELIVERED</th>
                <th className="px-6 py-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-200`}
                >
                  <td className="px-6 py-4 text-gray-700">{order._id}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {order.user ? order.user.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    ${order.totalPrice}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {order.isPaid ? (
                      <span className="text-sm font-semibold text-green-500 bg-green-100 px-3 py-1 rounded-full">
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {order.isDelivered ? (
                      <span className="text-sm font-semibold text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                        {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/order/${order._id}`}
                      className="inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow hover:from-green-500 hover:to-blue-600"
                    >
                      Details
                    </Link>
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

export default OrderListScreen;
