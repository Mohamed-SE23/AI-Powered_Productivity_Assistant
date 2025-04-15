import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { container, item } from '../../../utils/animation';
import { fetchTasks, selectAllTasks, selectPriority, setPriority } from '../../../app/tasksSlice';
import { filteredTasks, openModalForAdd } from '../../../utils/utilities';
import Filters from '../../../components/Filters/Filters';
import TaskItem from '../../../components/TaskItem/TaskItem';

const AllTasks = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const priority = useSelector(selectPriority);
    const filtered = filteredTasks(tasks, priority);

    useEffect(() => {
        dispatch(setPriority("all"));
        dispatch(fetchTasks());
    }, []);

    return (
        <main className="h-full">
          <div className="flex items-center justify-between sm:flex-col sm:gap-3">
            <h1 className="text-2xl font-bold">All Tasks</h1>
            <Filters />
          </div>
    
          <motion.div
            className="pb-[2rem] mt-6 grid justify-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {tasks.length > 0 && filtered?.map((task, i) => (
              <TaskItem key={i} task={task} />
            ))}
            <motion.button
              className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
              hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
              onClick={() => openModalForAdd(dispatch)}
              variants={item}
            >
              Add New Task
            </motion.button>
          </motion.div>
        </main>
      );
}

export default AllTasks;
