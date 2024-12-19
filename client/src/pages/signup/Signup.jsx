import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // validate
    const validate = () => {
      const newErrors = {};
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (validate()) {
            const data = new FormData();
            data.append('username', formData.username);
            data.append('email', formData.email);
            data.append('password', formData.password);
      
            setLoading(true); // Start loading
      
            try {
              const response = await axios.post('/api/v1/signup', data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              })
              setLoading(false); // end loading
              console.log('Form submitted successfully:', response);
              toast.success(`${response.data.message}`);
              navigate('/signin');
      
            } catch (error) {
              setLoading(false); // end loading
              toast.error(`${error.response?.data.message || error.message}`);
              console.log('Error submitting form:', error.response?.data || error.message);
            }
          }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-[#1dd4cb]">Sign Up</h2>
                <p className="text-center text-gray-700 mb-4">
                    Already have an account? <span className="text-[#007bff] cursor-pointer" onClick={() => navigate("/signin")}>Sign In</span>
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1dd4cb]"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1dd4cb]"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="relative">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1dd4cb]"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                        >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1dd4cb]"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            disabled={loading}
                            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#007bff] text-white py-2 px-4 rounded-lg hover:bg-[#0056b3]"
                        >
                            {loading ? '...Signing up' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
