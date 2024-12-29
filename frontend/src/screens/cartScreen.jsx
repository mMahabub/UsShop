// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Form,
//   Button,
//   Card,
// } from 'react-bootstrap';
// import { FaTrash } from 'react-icons/fa';
// import Message from '../components/Message';
// import { addToCart, removeFromCart } from '../slices/cartSlice';

// const CartScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   // NOTE: no need for an async function here as we are not awaiting the
//   // resolution of a Promise
//   const addToCartHandler = (product, qty) => {
//     dispatch(addToCart({ ...product, qty }));
//   };

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const checkoutHandler = () => {
//     navigate('/login?redirect=/shipping');
//   };

//   return (
//     <Row>
//       <Col md={8}>
//         <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
//         {cartItems.length === 0 ? (
//           <Message>
//             Your cart is empty <Link to='/'>Go Back</Link>
//           </Message>
//         ) : (
//           <ListGroup variant='flush'>
//             {cartItems.map((item) => (
//               <ListGroup.Item key={item._id}>
//                 <Row>
//                   <Col md={2}>
//                     <Image src={item.image} alt={item.name} fluid rounded />
//                   </Col>
//                   <Col md={3}>
//                     <Link to={`/product/${item._id}`}>{item.name}</Link>
//                   </Col>
//                   <Col md={2}>${item.price}</Col>
//                   <Col md={2}>
//                     <Form.Control
//                       as='select'
//                       value={item.qty}
//                       onChange={(e) =>
//                         addToCartHandler(item, Number(e.target.value))
//                       }
//                     >
//                       {[...Array(item.countInStock).keys()].map((x) => (
//                         <option key={x + 1} value={x + 1}>
//                           {x + 1}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Col>
//                   <Col md={2}>
//                     <Button
//                       type='button'
//                       variant='light'
//                       onClick={() => removeFromCartHandler(item._id)}
//                     >
//                       <FaTrash />
//                     </Button>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Col>
//       <Col md={4}>
//         <Card>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>
//                 Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//                 items
//               </h2>
//               $
//               {cartItems
//                 .reduce((acc, item) => acc + item.qty * item.price, 0)
//                 .toFixed(2)}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Button
//                 type='button'
//                 className='btn-block'
//                 disabled={cartItems.length === 0}
//                 onClick={checkoutHandler}
//               >
//                 Proceed To Checkout
//               </Button>
//             </ListGroup.Item>
//           </ListGroup>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default CartScreen;


import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="lg:w-2/3">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
            Your cart is empty. <Link to='/' className="text-blue-500 hover:underline">Go Back</Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center py-4">
                <div className="w-1/6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-2/6 pl-4">
                  <Link to={`/product/${item._id}`} className="text-blue-500 hover:underline">
                    {item.name}
                  </Link>
                </div>
                <div className="w-1/6 text-gray-700 font-medium">${item.price}</div>
                <div className="w-1/6">
                  <select
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/6 text-right">
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lg:w-1/3">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h2>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </p>
          <button
            type="button"
            className={`w-full py-2 px-4 text-white font-bold rounded-md shadow-md ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
