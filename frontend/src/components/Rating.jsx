import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center space-x-1">
      <span>{value >= 1 ? <FaStar className="text-yellow-500" /> : value >= 0.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}</span>
      <span>{value >= 2 ? <FaStar className="text-yellow-500" /> : value >= 1.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}</span>
      <span>{value >= 3 ? <FaStar className="text-yellow-500" /> : value >= 2.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}</span>
      <span>{value >= 4 ? <FaStar className="text-yellow-500" /> : value >= 3.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}</span>
      <span>{value >= 5 ? <FaStar className="text-yellow-500" /> : value >= 4.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}</span>
      {text && <span className="ml-2 text-gray-700 text-sm">{text}</span>}
    </div>
  );
};

export default Rating;

// import React from 'react';

// import PropTypes from 'prop-types';

// const Rating = ({ value, text, className = '' }) => {
//   return (
//     <div className={`flex items-center ${className}`}>
//       {[...Array(5)].map((_, index) => (
//         <span key={index} className="text-yellow-500">
//           <i
//             className={
//               value >= index + 1
//                 ? 'fas fa-star'
//                 : value >= index + 0.5
//                 ? 'fas fa-star-half-alt'
//                 : 'far fa-star'
//             }
//           ></i>
//         </span>
//       ))}
//       {text && <span className="ml-2 text-gray-600">{text}</span>}
//     </div>
//   );
// };

// Rating.propTypes = {
//   value: PropTypes.number.isRequired,
//   text: PropTypes.string,
//   className: PropTypes.string,
// };

// export default Rating;

