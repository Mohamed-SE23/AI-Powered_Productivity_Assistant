import React, { useEffect, useState } from 'react'
import { FaTasks } from "react-icons/fa";
import Tasks from './Tasks/Tasks';
import Completed from './Tasks/Completed';
import Pending from './Tasks/Pending';
import Calendar from './Calendar/Calendar';
import AiAssistant from './AiAssistant/AiAssistant';
import { MdCalendarMonth, MdPendingActions, MdTaskAlt } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectCurrentUser } from '../../app/UserInfo';
import { useNavigate } from 'react-router-dom';
import AIassistant from '../../assets/AiAssistant.svg';
import Modal from '../../components/Modal/Modal';
import { selectIsEditing } from '../../app/tasksSlice';
import { fetchNotifications } from '../../app/Notifications';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const isEditing = useSelector(selectIsEditing)

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <Tasks />;
      case 'completed':
        return <Completed />;
      case 'pending':
        return <Pending />;
      case 'calendar':
        return <Calendar />;
      case 'aiAssistant':
        return <AiAssistant />;
      default:
        return <Tasks />;
    }
  };

  // Logout function
  const userId = useSelector(selectCurrentUser).id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(clearUser())
    localStorage.removeItem('notifications');
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchNotifications(userId));
  },[dispatch])

  return (
    <>
    {isEditing && <Modal />}
    <div className="page-container flex min-h-screen bg-gray-100 md:flex-col">
      {/* Sidebar */}
      <div className="w-1/5 bg-white border-r p-6 md:w-full flex flex-col gap-4 items-start md:flex-row md:justify-center md:pt-9">
        <ul className='flex flex-col items-start md:flex-row md:space-x-4 md:items-center'>
          <li
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center justify-center gap-1 cursor-pointer mb-4 ${activeTab === 'tasks' ? 'font-semibold text-[#1dd4cb]' : ''}`}
          >
            <FaTasks className='ml-0.5' /><span className='md:hidden'>All Tasks</span>
          </li>
          <li
            onClick={() => setActiveTab('completed')}
            className={`flex items-center justify-center gap-1 cursor-pointer mb-4 ${activeTab === 'completed' ? 'font-semibold text-[#1dd4cb]' : ''}`}
          >
            <MdTaskAlt className='w-5 h-5' /><span className='md:hidden'>Completed</span>
          </li>
          <li
            onClick={() => setActiveTab('pending')}
            className={`flex items-center justify-center gap-1 cursor-pointer mb-4 ${activeTab === 'pending' ? 'font-semibold text-[#1dd4cb]' : ''}`}
          >
            <MdPendingActions className='w-5 h-5' /><span className='md:hidden'>Pending</span>
          </li>
          <li
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center justify-center gap-1 cursor-pointer mb-4 ${activeTab === 'calendar' ? 'font-semibold text-[#1dd4cb]' : ''}`}
          >
            <MdCalendarMonth className='w-5 h-5' /><span className='md:hidden'>Calendar</span>
          </li>
          <li
            onClick={() => setActiveTab('aiAssistant')}
            className={`flex items-center justify-center gap-1 cursor-pointer mb-4 ${activeTab === 'aiAssistant' ? 'text-[#1dd4cb]' : ''}`}
          >
            <img src={AIassistant} alt='assistant-img' className='-ml-0.5 -[#1dd4cb]' /><span className='lg:text-sm md:hidden'>AI-Assistant</span>
          </li>
        </ul>
        <button 
            type='button'
            onClick={Logout}
            className='flex justify-center items-center text-slate-100 font-semibold bg-red-600 px-4 py-0.5 rounded-full active:scale-90 md:px-3 md:font-medium sm:text-sm'>
              Logout
        </button>
      </div>

      {/* Content */}
      <div className="w-5/6 p-8 md:w-full sm:p-4">{renderContent()}</div>
    </div>
    </>
  )
}

export default Dashboard;
