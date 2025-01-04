import React, { useState } from 'react'
import UpdateUser from './UpdateUser';
import ResetPassword from './ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectCurrentUser } from '../../app/UserInfo';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('update-user');
  const user = useSelector(selectCurrentUser);

  const renderContent = () => {
    switch (activeTab) {
      case 'update-user':
        return <UpdateUser />;
      case 'reset-password':
        return <ResetPassword />;
      default:
        return <Tasks />;
    }
  };

    // Logout function
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const Logout = () => {
      dispatch(clearUser())
      localStorage.removeItem('notifications');
      navigate('/');
    };
    
    const handleDeleteAccount = async () => {
      try {
        const response = await axios.delete('/api/v1/delete-account', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
    
        toast.success(response.data.message);
        // Optionally log the user out and redirect to the homepage
        Logout();
      } catch (error) {
        console.error('Error deleting account:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Failed to delete account');
      }
    };

  return (
    <div>
      <div className="page-container flex min-h-screen bg-gray-100 md:flex-col">
            {/* Sidebar */}
        <div className="w-1/5 bg-white border-r p-6 md:w-full flex flex-col gap-4 items-start">
          <ul className='flex flex-col items-start md:flex md:space-x-4 md:items-center'>
            <li
              onClick={() => setActiveTab('update-user')}
              className={`flex items-center justify-center gap-1 cursor-pointer mb-4 ${activeTab === 'update-user' ? 'font-semibold text-[#1dd4cb]' : ''}`}
            >
              Profile
            </li>
            <li
              onClick={() => setActiveTab('reset-password')}
              className={`flex items-center justify-center gap-1 cursor-pointer mb-4 ${activeTab === 'reset-password' ? 'font-semibold text-[#1dd4cb]' : ''}`}
            >
              Password
            </li>
          </ul>
          <button 
            type='button'
            onClick={handleDeleteAccount}
            className='flex justify-center items-center font-semibold text-red-600 px-4 py-0.5 rounded-full active:scale-90'>
              DeleteAccount
          </button>
          <button 
            type='button'
            onClick={Logout}
            className='flex justify-center items-center text-slate-100 font-semibold bg-red-600 px-4 py-0.5 rounded-full active:scale-90'>
              Logout
          </button>
        </div>
        {/* Content */}
        <div className="w-5/6 lg:w-4/5 p-8 md:w-full">{renderContent()}</div>
      </div>
    </div>
  )
}

export default Profile;
