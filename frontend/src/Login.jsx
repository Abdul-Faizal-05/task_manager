import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User data:', data.user);
        console.log('User role:', data.user.role);

        // Store user info or token here if needed
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on role
        if (data.user && data.user.role === 'admin') {
          alert('Login successful! Redirecting to Admin Dashboard...');
          window.location.href = '/home2';
        } else {
          alert('Login successful! Redirecting to Dashboard...');
          window.location.href = '/home';
        }
      } else {
        setErrors({ submit: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-white">
      <div className="bg-white border-2 border-black rounded-none w-full max-w-md p-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="none" />
            </svg>
            <h1 className="text-3xl font-bold text-black">TaskMe</h1>
          </div>
          <p className="text-gray-600">Welcome back! Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-black text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`px-4 py-3 border-2 rounded-none text-sm transition-all outline-none ${errors.email ? 'border-black bg-gray-100' : 'border-gray-300'
                } focus:border-black`}
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-black text-xs -mt-1">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-black text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`px-4 py-3 border-2 rounded-none text-sm transition-all outline-none ${errors.password ? 'border-black bg-gray-100' : 'border-gray-300'
                } focus:border-black`}
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-black text-xs -mt-1">{errors.password}</span>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-black cursor-pointer" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-black font-semibold hover:underline">Forgot password?</a>
          </div>

          {errors.submit && (
            <div className="bg-gray-100 text-black p-3 border-2 border-black text-sm text-center">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            className="bg-black text-white py-3.5 rounded-none text-base font-semibold cursor-pointer transition-all hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-gray-600 text-sm mt-2">
            Don't have an account? <Link to="/register" className="text-black no-underline font-semibold hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
