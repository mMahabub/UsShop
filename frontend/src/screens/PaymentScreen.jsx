// import { useState, useEffect } from 'react';
// import { Form, Button, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import FormContainer from '../components/FormContainer';
// import CheckoutSteps from '../components/CheckoutSteps';
// import { savePaymentMethod } from '../slices/cartSlice';

// const PaymentScreen = () => {
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate('/shipping');
//     }
//   }, [navigate, shippingAddress]);

//   const [paymentMethod, setPaymentMethod] = useState('PayPal');

//   const dispatch = useDispatch();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod));
//     navigate('/placeorder');
//   };

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 step3 />
//       <h1>Payment Method</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group>
//           <Form.Label as='legend'>Select Method</Form.Label>
//           <Col>
//             <Form.Check
//               className='my-2'
//               type='radio'
//               label='PayPal or Credit Card'
//               id='PayPal'
//               name='paymentMethod'
//               value='PayPal'
//               checked
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             ></Form.Check>
//           </Col>
//         </Form.Group>

//         <Button type='submit' variant='primary'>
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default PaymentScreen;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white flex flex-col">
      <CheckoutSteps step1 step2 step3 />
      <div className="max-w-lg mx-auto p-6 mt-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Payment Method</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Select Payment Method</label>
            <div className="space-y-4">
              <div
                className={`transition transform hover:scale-105 duration-300 flex items-center gap-3 p-4 bg-gray-700 rounded-lg ${
                  paymentMethod === 'PayPal' ? 'border border-blue-500' : ''
                }`}
              >
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio text-blue-500 focus:ring-blue-400"
                />
                <label htmlFor="PayPal" className="text-lg">
                  PayPal or Credit Card
                </label>
              </div>

              {/* Example: Add another payment method */}
              <div
                className={`transition transform hover:scale-105 duration-300 flex items-center gap-3 p-4 bg-gray-700 rounded-lg ${
                  paymentMethod === 'Stripe' ? 'border border-blue-500' : ''
                }`}
              >
                <input
                  type="radio"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio text-blue-500 focus:ring-blue-400"
                />
                <label htmlFor="Stripe" className="text-lg">
                  Stripe
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg text-lg font-semibold text-white hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;

