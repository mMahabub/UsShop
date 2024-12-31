import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } from '../slices/orderApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid && !window.paypal) {
        loadPaypalScript();
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    try {
      await payOrder({ orderId, details });
      refetch();
      toast.success('Order is paid');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center">Order #{order._id}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Shipping Details */}
          <div className="p-6 shadow-md rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Shipping</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p>
              <strong>Email:</strong> <a href={`mailto:${order.user.email}`} className="text-blue-500">{order.user.email}</a>
            </p>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>

          {/* Payment Details */}
          <div className="p-6 shadow-md rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-300">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Payment Method</h2>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>

          {/* Order Items */}
          <div className="p-6 shadow-md rounded-lg bg-white border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ul className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                    <div className="flex-grow">
                      <Link to={`/product/${item.product}`} className="text-lg text-blue-600 hover:underline">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-700">
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 shadow-md rounded-lg bg-white border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <ul className="space-y-4">
            <li className="flex justify-between text-gray-700">
              <span>Items</span>
              <span>${order.itemsPrice}</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </li>
            <li className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </li>
          </ul>

          {!order.isPaid && (
            <div className="mt-6">
              {loadingPay && <Loader />}
              {isPending ? (
                <Loader />
              ) : (
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
