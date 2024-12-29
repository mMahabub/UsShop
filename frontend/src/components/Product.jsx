// import React from 'react'
// import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import Rating from './Rating'

// const Product = ({product}) => {
//   return (
//     <Card className='my-3 p-3'>
//       <Link to={`/product/${product._id}`}>
//       <Card.Img src={product.image} variant='top'/>
//       </Link>

//       <Card.Body>
//         <Link to={`/product/${product._id}`}>
//         <Card.Title as='div' className='product-title'>
//             <strong>{product.name}</strong>
//         </Card.Title>
//         <Card.Text as='div'>
//           <Rating
//             value={product.rating}
//             text={`${product.numReviews} reviews`}
//           />
//         </Card.Text>

//         </Link>
//         <Card.Text as='h3'>${product.price}</Card.Text>
//       </Card.Body>
//     </Card>

    
//   )
// }

// export default Product

import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index} className="text-yellow-400">
        {value >= index + 1 ? <FaStar /> : <FaRegStar />}
      </span>
    );
  });

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">{stars}</div>
      <span className="text-gray-500 text-sm">{text}</span>
    </div>
  );
};

const Product = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </Link>

      {/* Details */}
      <div className="p-4">
        {/* Product Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-500">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between mt-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
        </div>

        {/* Price */}
        <p className="text-xl font-semibold text-green-600 mt-3">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default Product;