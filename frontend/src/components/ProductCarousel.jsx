import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Message from './Message';
import { useState, useEffect } from 'react';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (products && products.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000); // Slide every 3 seconds
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [currentIndex, products]); // Add 'products' as dependency

  const handleNext = () => {
    if (products && products.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }
  };

  const handlePrev = () => {
    if (products && products.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? products.length - 1 : prevIndex - 1
      );
    }
  };

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : products && products.length > 0 ? ( // Safe check for 'products'
    <div className="relative w-full h-[400px] flex justify-center items-center bg-slate-800 overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-600 transition z-10"
      >
        &#8249;
      </button>

      {/* Carousel Content */}
      <div className="w-full h-full relative flex justify-center items-center">
        {products.map((product, index) => (
          <div
            key={product._id}
            className={`absolute w-full h-full flex justify-center items-center transition-transform duration-700 ease-in-out ${
              index === currentIndex
                ? 'translate-x-0 opacity-100 z-10'
                : index < currentIndex
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
            }`}
          >
            <Link to={`/product/${product._id}`} className="w-[900px]">
              <div className="flex flex-col items-center bg-white shadow-lg rounded-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[250px] object-cover" // Wider image
                />
                <div className="p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white text-center">
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                  <p className="text-lg font-semibold mt-2">${product.price}</p>
                  <button className="mt-4 px-6 py-2 bg-cyan-800 hover:bg-teal-600 text-white font-medium rounded-lg transition-all">
                    View Product
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-600 transition z-10"
      >
        &#8250;
      </button>
    </div>
  ) : (
    <Message variant="info">No top products found.</Message> // Fallback if no products
  );
};

export default ProductCarousel;