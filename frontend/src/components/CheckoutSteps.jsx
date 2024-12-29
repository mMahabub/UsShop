// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
//   return (
//     <Nav className='justify-content-center mb-4'>
//       <Nav.Item>
//         {step1 ? (
//           <Nav.Link as={Link} to='/login'>
//             Sign In
//           </Nav.Link>
//         ) : (
//           <Nav.Link disabled>Sign In</Nav.Link>
//         )}
//       </Nav.Item>

//       <Nav.Item>
//         {step2 ? (
//           <Nav.Link as={Link} to='/shipping'>
//             Shipping
//           </Nav.Link>
//         ) : (
//           <Nav.Link disabled>Shipping</Nav.Link>
//         )}
//       </Nav.Item>

//       <Nav.Item>
//         {step3 ? (
//           <Nav.Link as={Link} to='/payment'>
//             Payment
//           </Nav.Link>
//         ) : (
//           <Nav.Link disabled>Payment</Nav.Link>
//         )}
//       </Nav.Item>

//       <Nav.Item>
//         {step4 ? (
//           <Nav.Link as={Link} to='/placeorder'>
//             Place Order
//           </Nav.Link>
//         ) : (
//           <Nav.Link disabled>Place Order</Nav.Link>
//         )}
//       </Nav.Item>
//     </Nav>
//   );
// };

// export default CheckoutSteps;

import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center space-x-4 my-6">
      <div
        className={`flex items-center justify-center w-32 py-2 rounded-lg shadow-lg text-center 
          ${step1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        {step1 ? (
          <Link to="/login" className="font-medium hover:underline">
            Sign In
          </Link>
        ) : (
          <span>Sign In</span>
        )}
      </div>

      <div
        className={`flex items-center justify-center w-32 py-2 rounded-lg shadow-lg text-center 
          ${step2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        {step2 ? (
          <Link to="/shipping" className="font-medium hover:underline">
            Shipping
          </Link>
        ) : (
          <span>Shipping</span>
        )}
      </div>

      <div
        className={`flex items-center justify-center w-32 py-2 rounded-lg shadow-lg text-center 
          ${step3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        {step3 ? (
          <Link to="/payment" className="font-medium hover:underline">
            Payment
          </Link>
        ) : (
          <span>Payment</span>
        )}
      </div>

      <div
        className={`flex items-center justify-center w-32 py-2 rounded-lg shadow-lg text-center 
          ${step4 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        {step4 ? (
          <Link to="/placeorder" className="font-medium hover:underline">
            Place Order
          </Link>
        ) : (
          <span>Place Order</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;

