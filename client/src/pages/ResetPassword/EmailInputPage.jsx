import React, { useState } from 'react';
import axios from 'axios';
// import PageLoading from '../../components/reusable/PageLoading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EmailInputStep = ({ email, setEmail, nextStep }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

//   handle back function
const handleBack =() => {
    navigate('/signin')
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const emailData = {email: email}
      const response = await axios.post("https://ai-powered-productivity-assistant.onrender.com/api/v1/request-reset", emailData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      setLoading(false);
      toast.success(`${response.data.message}`);
      nextStep(); // Move to OTP step if successful
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.log(err)
    }
  };

  return (
    <>
    {/* {loading && <PageLoading />} */}
    <div className='md:-mt-20'>
      <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
      <p className="text-center text-gray-600 mb-4">Enter your email to receive the reset code</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder='enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block p-2  w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className='flex items-center gap-4'>
          <button type="button"
                  onClick={handleBack}
                  className="w-full bg-gray-300 text-gray-600 py-2 rounded-md active:scale-90 hover:bg-gray-400">Cancel</button>
          <button type="submit" className="w-full bg-theme-cart text-white py-2 rounded-md active:scale-90">Next</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default EmailInputStep;
