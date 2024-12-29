// import { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import FormContainer from '../components/FormContainer';
// import { saveShippingAddress } from '../slices/cartSlice';

// const ShippingScreen = () => {
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   const [address, setAddress] = useState(shippingAddress?.address || '');
//   const [city, setCity] = useState(shippingAddress?.city || '');
//   const [postalCode, setPostalCode] = useState(
//     shippingAddress?.postalCode || ''
//   );
//   const [country, setCountry] = useState(shippingAddress?.country || '');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(saveShippingAddress({ address, city, postalCode, country }));
//     navigate('/payment');
//   };

//   return (
//     <FormContainer>

//       <h1>Shipping</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group className='my-2' controlId='address'>
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter address'
//             value={address}
//             required
//             onChange={(e) => setAddress(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='city'>
//           <Form.Label>City</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter city'
//             value={city}
//             required
//             onChange={(e) => setCity(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='postalCode'>
//           <Form.Label>Postal Code</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter postal code'
//             value={postalCode}
//             required
//             onChange={(e) => setPostalCode(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className='my-2' controlId='country'>
//           <Form.Label>Country</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter country'
//             value={country}
//             required
//             onChange={(e) => setCountry(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button type='submit' variant='primary'>
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default ShippingScreen;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 via-teal-800 to-black px-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full animate-fade-in">
        <h1 className="text-3xl font-bold text-teal-700 text-center mb-6">Shipping Details</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Address Field */}
          <div className="relative">
            <label htmlFor="address" className="block text-gray-700 font-semibold">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* City Field */}
          <div className="relative">
            <label htmlFor="city" className="block text-gray-700 font-semibold">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* Postal Code Field */}
          <div className="relative">
            <label htmlFor="postalCode" className="block text-gray-700 font-semibold">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* Country Field */}
          <div className="relative">
            <label htmlFor="country" className="block text-gray-700 font-semibold">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-transform duration-200 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400 transition-transform duration-300 ease-in-out transform hover:scale-110"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;

