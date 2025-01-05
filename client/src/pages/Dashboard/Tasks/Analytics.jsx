import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectAllTasks } from '../../../app/tasksSlice';
import pending from '../../../assets/pending.png';
import completed from '../../../assets/completed.png';
import { FaTasks } from 'react-icons/fa';
import { openModalForAdd } from '../../../utils/utilities';
import RadialChart from '../../../components/RadialChart/RadialChart';

const Analytics = () => {
  const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch();
  const completedTasks = tasks?.filter((task) => task.completed === "true").length;
  const pendingTasks = tasks?.filter((task) => task.completed === "false").length;

  return (
    <div className="mb-12">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <button
        type="button"
        onClick={() => openModalForAdd(dispatch)}
        className="text-white font-semibold bg-[#007bff] px-4 py-2 rounded-md active:scale-90 hover:bg-[#0056b3] transition sm:px-2 sm:py-1"
      >
        +Add Task
      </button>
    </div>
    <motion.div
      className="flex lg:flex-row sm:flex-col items-start sm:items-center justify-center gap-6 flex-wrap"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      {/* All Tasks Card */}
      <div className="flex flex-col items-center justify-center w-64 h-48 bg-white rounded-lg shadow-md p-6 sm:w-full">
        <FaTasks className="w-10 h-10 mb-4 text-blue-500" />
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-2">All Tasks</h3>
        <h3 className="text-2xl font-bold text-center text-gray-800">{tasks ? tasks.length : "-"}</h3>
      </div>

      {/* Completed Tasks Card */}
      <div className="flex flex-col items-center justify-center w-64 h-48 bg-white rounded-lg shadow-md p-6 sm:w-full">
        <img src={completed} alt="completed" className="w-10 h-10 object-cover mb-4" />
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-2">Completed</h3>
        <h3 className="text-2xl font-bold text-center text-gray-800">{completedTasks ? completedTasks : "0"}</h3>
      </div>

      {/* Pending Tasks Card */}
      <div className="flex flex-col items-center justify-center w-64 h-48 bg-white rounded-lg shadow-md p-6 sm:w-full">
        <img src={pending} alt="pending" className="w-10 h-10 object-cover mb-4" />
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-2">Pending</h3>
        <h3 className="text-2xl font-bold text-center text-gray-800">{pendingTasks ? pendingTasks : "0"}</h3>
      </div>

      {/* Radial Chart */}
      <div className="flex flex-col items-center justify-center w-64 h-48 bg-white rounded-lg shadow-md p-6 sm:w-full">
        <RadialChart completedTasks={completedTasks || 0} pendingTasks={pendingTasks || 0} />
      </div>
    </motion.div>
  </div>
  )
}

export default Analytics;
