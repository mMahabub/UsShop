import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';
import  Meta  from '../components/Meta';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-500 via-blue-500 to-cyan-600 min-h-screen p-6">
         {product && <Meta title={product.name} />}
      <Link
        className="px-4 py-2 bg-white text-teal-600 rounded-md shadow-md hover:scale-105 transition-transform"
        to="/"
      >
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
      
      
        <div className="mt-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-lg shadow-md bg-white p-6">
             
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="rounded-lg shadow-md bg-white p-6">
              <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <p className="text-gray-600 mt-4">Price: ${product.price}</p>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="rounded-lg shadow-md bg-white p-6">
              <div className="mb-4">
                <span className="text-gray-700 font-medium">Price:</span>
                <span className="ml-2 text-gray-900 font-bold">
                  ${product.price}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 font-medium">Status:</span>
                <span className="ml-2 text-gray-900">
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="mb-4">
                  <label className="text-gray-700 font-medium">Quantity</label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 hover:scale-105 transition-transform"
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
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className={`w-full py-3 mt-4 bg-teal-600 text-white font-bold rounded-md shadow-md hover:bg-teal-700 hover:scale-105 transition-transform ${
                  product.countInStock === 0 && 'opacity-50 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
            {product.reviews.length === 0 && (
              <Message>No Reviews</Message>
            )}
            <ul className="mt-4 space-y-4">
              {product.reviews.map((review) => (
                <li key={review._id} className="border-b pb-4">
                  <strong className="text-gray-800">{review.name}</strong>
                  <Rating value={review.rating} />
                  <p className="text-gray-600">
                    {review.createdAt.substring(0, 10)}
                  </p>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800">
                Write a Customer Review
              </h2>

              {loadingProductReview && <Loader />}
              {userInfo ? (
                <form
                  onSubmit={submitHandler}
                  className="mt-4 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 hover:scale-105 transition-transform"
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium">
                      Comment
                    </label>
                    <textarea
                      rows="2"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 hover:scale-105 transition-transform"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-6 bg-teal-600 text-white font-bold rounded-md shadow-md hover:bg-teal-700 hover:scale-105 transition-transform"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
