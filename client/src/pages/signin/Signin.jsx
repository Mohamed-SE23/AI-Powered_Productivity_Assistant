import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setUserAuthenticated } from "../../app/UserInfo";

const Signin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // validate
    const validate = () => {
      const newErrors = {};
      if (!formData.email) newErrors.email = 'Email is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.password) newErrors.password = 'Password is required';
  
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
            const data = {
                email: formData.email,
                password: formData.password,
            };
      
            setLoading(true); // Start loading
      
            try {
              const response = await axios.post('/api/v1/signin', data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              })
              setLoading(false); // end loading
              dispatch(setUser(response.data.user));
              dispatch(setUserAuthenticated(true));
              console.log('User is logged in successfully:', response);
              navigate(`/${response.data.user.id}/dashboard`);
      
            } catch (error) {
              setLoading(false); // end loading
              toast.error(`${error.response.data.message}`);
              console.log('Error submitting form:', error);
            }
          }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-[#1dd4cb]">Sign In</h2>
                <p className="text-center text-gray-700 mb-4">
                    New user? <span className="text-[#007bff] cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span>
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            {loading ? "Signing..." : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
