import React, { useState } from 'react'
import UpdateUser from './UpdateUser';
import ResetPassword from './ResetPassword';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../app/UserInfo';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('update-user');

    // Logout function
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const Logout = () => {
      dispatch(clearUser())
      localStorage.removeItem('notifications');
      navigate('/');
    };

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

  return (
    <div>
      <div className="page-container flex min-h-screen bg-gray-100 md:flex-col">
            {/* Sidebar */}
        <div className="w-1/5 bg-white border-r p-6 md:w-full flex flex-col gap-4 items-start md:flex-row md:justify-center md:pt-8">
          <ul className='flex flex-col items-start md:flex md:space-x-4 md:items-center md:flex-row'>
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
            onClick={Logout}
            className='flex justify-center items-center text-slate-100 font-semibold bg-red-600 px-4 py-0.5 rounded-full active:scale-90'>
              Logout
          </button>
        </div>
        {/* Content */}
        <div className="w-5/6 lg:w-4/5 p-8 md:w-full sm:px-0">{renderContent()}</div>
      </div>
    </div>
  )
}

export default Profile;
