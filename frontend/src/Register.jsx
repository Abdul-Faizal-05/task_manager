import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setErrors({ submit: data.message || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#5b7fff"/>
            </svg>
            <h1 className="text-3xl font-bold text-gray-800">TaskMe</h1>
          </div>
          <p className="text-gray-600">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold text-gray-800 text-sm">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                errors.username ? 'border-red-500' : 'border-gray-200'
              } focus:border-primary focus:ring-4 focus:ring-primary/10`}
              placeholder="Enter your username"
            />
            {errors.username && <span className="text-red-500 text-xs -mt-1">{errors.username}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-800 text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              } focus:border-primary focus:ring-4 focus:ring-primary/10`}
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500 text-xs -mt-1">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-800 text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              } focus:border-primary focus:ring-4 focus:ring-primary/10`}
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-red-500 text-xs -mt-1">{errors.password}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="font-semibold text-gray-800 text-sm">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
              } focus:border-primary focus:ring-4 focus:ring-primary/10`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="text-red-500 text-xs -mt-1">{errors.confirmPassword}</span>}
          </div>

          {errors.submit && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm text-center">
              {errors.submit}
            </div>
          )}

          <button 
            type="submit" 
            className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-gray-600 text-sm mt-2">
            Already have an account? <a href="/" className="text-primary no-underline font-semibold hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
