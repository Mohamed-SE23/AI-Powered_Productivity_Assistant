import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectAllTasks } from '../../../app/tasksSlice';
import pending from '../../../assets/pending.png';
import completed from '../../../assets/completed.png';
import { FaTasks } from 'react-icons/fa';
import { openModalForAdd } from '../../../utils/utilities';

const Analytics = () => {
  const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch();
  const completedTasks = tasks?.filter((task) => task.completed === "true");
  const pendingTasks = tasks?.filter((task) => task.completed === "false");

  return (
    <div className='mb-12'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold'>Analytics</h2>
        <button
          type='button'
          onClick={() => openModalForAdd(dispatch)}
          className='text-white text-semibold bg-[#007bff] px-2 py-0.5 rounded-md active:scale-90'
          >
          +Add Task
        </button>
      </div>
      <motion.div className='flex items-center justify-start gap-4'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}>
        <div className='flex flex-col items-center  p-6 w-48 h-44 bg-white rounded shadow-md'>
          <FaTasks className='w-8 h-8 mb-4' />
          <div>
            <h3 className='text-2xl font-bold text-center text-[#333] mb-2'>All Tasks</h3>
            <h3 className='text-2xl font-bold text-center text-[#333]'>{tasks ? tasks.length : "-"}</h3>
          </div>
        </div>
        <div className='flex flex-col items-center  p-6 w-48 h-44 bg-white rounded shadow-md'>
          <img src={completed} alt='completed-img' className='w-8 h-8 object-cover mb-4' />
          <div>
            <h3 className='text-2xl font-bold text-center text-[#333] mb-3'>Completed</h3>
            <h3 className='text-2xl font-bold text-center text-[#333]'>{completedTasks ? completedTasks.length : "-"}</h3>
          </div>
        </div>
        <div className='flex flex-col items-center  p-6 w-48 h-44 bg-white rounded shadow-md'>
          <img src={pending} alt='completed-img' className='w-8 h-8 object-cover mb-4' />
          <div>
            <h3 className='text-2xl font-bold text-center text-[#333] mb-3'>Pending</h3>
            <h3 className='text-2xl font-bold text-center text-[#333]'>{pendingTasks ? pendingTasks.length : "-"}</h3>
          </div>
        </div>
        <div className='flex flex-col items-center  p-6 w-48 h-44 bg-white rounded shadow-md'>
          <img src={completed} alt='completed-img' className='w-8 h-8 object-cover mb-4' />
          <div>
            <h3 className='text-2xl font-bold text-center text-[#333] mb-3'>Completed</h3>
            <h3 className='text-2xl font-bold text-center text-[#333]'>{completedTasks ? completedTasks.length : "-"}</h3>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics;
