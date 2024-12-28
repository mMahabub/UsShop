import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, isError } = useGetProductDetailsQuery(productId);

  const addCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className="px-4 py-6">
      <Link
        className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-300"
        to="/"
      >
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError.data?.message || isError.toString()}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Product Image */}
          <div className="col-span-1">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Product Details */}
          <div className="col-span-1 space-y-4">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <div>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </div>
            <p className="text-xl font-semibold text-gray-700">
              Price: <span className="text-green-600">${product.price}</span>
            </p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Add to Cart Section */}
          <div className="col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Price:</span>
                <span className="text-xl font-bold text-gray-700">
                  ${product.price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Status:</span>
                <span
                  className={`${
                    product.countInStock > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  } font-bold`}
                >
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">Qty:</span>
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                className={`w-full py-2 px-4 text-white rounded-md shadow ${
                  product.countInStock === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={addCartHandler}
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

{product?.reviews?.length > 0 ? (
  <div className="mt-8">
    <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
    <div className="flex space-x-4 overflow-x-auto">
      {product.reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-4 w-64 flex-shrink-0"
        >
          <div className="font-bold text-lg">{review.name}</div>
          <Rating value={review.rating} />
          <p className="text-gray-600 text-sm">{review.comment}</p>
          <div className="text-sm text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <p className="text-gray-500 mt-4">No reviews available.</p>
)}
    </div>
  );
};

export default ProductScreen;