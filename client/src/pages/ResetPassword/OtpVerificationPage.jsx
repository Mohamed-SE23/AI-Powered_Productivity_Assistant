import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from '../../app/UserInfo.js';
// import PageLoading from '../../components/reusable/PageLoading';

const OtpVerificationStep = ({ email, setEmail, nextStep }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // Countdown timer (1 min)
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timeRemaining]);

  const handleChange = (element, index) => {
    const value = element.value;

    // Only allow numeric values
    if (/^[0-9]$/.test(value)) {
      setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
      if (element.nextSibling) {
        element.nextSibling.focus(); // Move to the next input automatically
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      setOtp([...otp.slice(0, index), '', ...otp.slice(index + 1)]);
      if (event.target.previousSibling) {
        event.target.previousSibling.focus(); // Move to the previous input if it exists
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const otpCode = otp.join('');
      const otpData = {otp: otpCode, email: email}
      const response = await axios.post('https://ai-powered-productivity-assistant.onrender.com/api/v1/verify-otp', otpData, {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",

        },
      });
      setLoading(false);
      dispatch(setUser(response.data.user))
      console.log(response)
      nextStep(); // Move to new password step if successful
    } catch (err) {
      setLoading(false);
      console.log(err)
      setError('Invalid Code. Please try again.');
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const emailData = {email: email}
      const response = await axios.post('https://ai-powered-productivity-assistant.onrender.com/api/v1/request-reset', emailData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      setLoading(false);
      setTimeRemaining(60);
      setIsButtonDisabled(true);
      toast.success(`code was resent successfully`)
      console.log(response);
    } catch (err) {
      setLoading(false);
      setError('Failed to resend OTP');
    }
  };

  return (
    <>
    {/* {loading && <PageLoading />} */}
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Verification code</h2>
      <p className="text-center text-gray-600 mb-4">Enter the 6-digit code we sent to your email.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-1">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md mx-1 text-2xl sm:w-10 sm:h-10 sm:text-xl xsm:w-8 xsm:h-8 xsm:text-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full bg-theme-cart text-white py-2 mt-4 rounded-md active:scale-90">Verify</button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Didn't receive the code? make sure this is your email</p>
        <form onSubmit={handleResendOtp}>
        <input
            id="email"
            type="email"
            placeholder='enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block p-2  w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        <button
          type='submit'
          disabled={isButtonDisabled}
          className={`mt-2 py-2 px-4 font-semibold rounded ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          {isButtonDisabled ? `Resend in ${timeRemaining}s` : 'Resend'}
        </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default OtpVerificationStep;
