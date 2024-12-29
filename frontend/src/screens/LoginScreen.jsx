import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-teal-800 via-teal-950 to-black">
     

      <main className="flex-grow flex items-center justify-center">
        <div className="p-6 rounded-lg shadow-lg max-w-md w-full bg-opacity-80">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Sign In</h1>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-white">
              New Customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                className="text-blue-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default LoginScreen;
