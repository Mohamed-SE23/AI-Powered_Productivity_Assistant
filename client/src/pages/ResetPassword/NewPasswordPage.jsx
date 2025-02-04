import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
// import PageLoading from '../../components/reusable/PageLoading';
import { selectCurrentUser } from '../../app/UserInfo';
import { useNavigate } from 'react-router-dom';

const NewPasswordStep = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords must match');
      return;
    }
    if (password.length < 8){
      setError('Password must be at least 8 characters')
      return;
    }
    try {
      setLoading(true);
      const token = user.token;

      const passwordData = new FormData();
      passwordData.append('newPassword', password);
      
      await axios.put('https://ai-powered-productivity-assistant.onrender.com/api/v1/reset-otp-password', passwordData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${token}`,  // Add the token here
        },
      });
      setLoading(false)
      toast.success('Password reset successful!');
      navigate('/signin')
    } catch (err) {
      setLoading(false)
      setError('Failed to reset password');
      console.log(err)
    }
  };

  return (
    <>
    {/* {loading && <PageLoading />} */}
    <div className='md:-mt-20'>
      <h2 className="text-2xl font-bold text-center mb-4">Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="password"
            type="password"
            placeholder='enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block p-2 border w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>
        <button type="submit" className="w-full bg-theme-cart text-white py-2 rounded-md active:scale-90">Reset Password</button>
      </form>
    </div>
    </>
  );
};

export default NewPasswordStep;
