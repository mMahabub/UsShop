import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center">Place Your Order</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-500">Shipping</h2>
              <p className="mt-2 text-gray-600">
                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-500">Payment Method</h2>
              <p className="mt-2 text-gray-600">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-500">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p className="mt-2 text-gray-600">Your cart is empty</p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div className="flex-1">
                        <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline">
                          {item.name}
                        </Link>
                      </div>
                      <p className="text-gray-700">
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-500">Order Summary</h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Items</p>
                <p className="text-gray-800">${cart.itemsPrice}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-800">${cart.shippingPrice}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Tax</p>
                <p className="text-gray-800">${cart.taxPrice}</p>
              </div>
              <div className="flex justify-between font-semibold">
                <p className="text-gray-800">Total</p>
                <p className="text-gray-900">${cart.totalPrice}</p>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error.data.message}</div>
              )}
            </div>

            <button
              type="button"
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
