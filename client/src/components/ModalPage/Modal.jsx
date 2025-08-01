import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDetectOutside from "../../hooks/useDetectOutside.js";
import {
  selectActiveTask,
  selectModalMode,
  closeModal,
  createTask,
  updateTask,
  setTaskField,
} from "../../app/tasksSlice.js";

function Modal() {
  const dispatch = useDispatch();
  const modalMode = useSelector(selectModalMode); // Read modal mode from Redux
  const activeTask = useSelector(selectActiveTask); // Read active task from Redux
  const task = useSelector((state) => state.tasks.task); // Read the current task object

  const ref = useRef(null);

  // Detect clicks outside the modal
  useDetectOutside({
    ref,
    callback: () => {
      if (modalMode) {
        dispatch(closeModal());
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      // Prepopulate task fields when editing
      Object.keys(activeTask).forEach((field) => {
        dispatch(setTaskField({ field, value: activeTask[field] }));
      });
    }
  }, [modalMode, activeTask, dispatch]);

  const handleInput = (field) => (e) => {
    dispatch(setTaskField({ field, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "edit") {
      dispatch(updateTask(task));
    } else if (modalMode === "add") {
      dispatch(createTask(task));
    }
    dispatch(closeModal());
  };

  const handleCanceling = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed left-0 top-0 z-[500] h-full w-full bg-[#333]/30 overflow-hidden">
      <form
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="bg-[#F9F9F9] px-2 py-1 rounded-md border"
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={task.title || ""}
            onChange={handleInput("title")}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-[#F9F9F9] px-2 py-1 rounded-md border resize-none"
            name="description"
            placeholder="Task Description"
            rows="3"
            value={task.description || ""}
            onChange={handleInput("description")}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="startDate">Start Date</label>
          <input
            className="bg-[#F9F9F9] px-2 py-1 rounded-md border"
            type="date"
            name="startDate"
            value={task.startDate ? task.startDate.split("T")[0] : ""}
            onChange={handleInput("startDate")}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            className="bg-[#F9F9F9] px-2 py-1 rounded-md border"
            type="date"
            name="dueDate"
            value={task.dueDate ? task.dueDate.split("T")[0] : ""}
            onChange={handleInput("dueDate")}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority">Select Priority</label>
          <select
            className="bg-[#F9F9F9] px-2 py-1 rounded-md border cursor-pointer"
            name="priority"
            value={task.priority || "low"}
            onChange={handleInput("priority")}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="completed">Task Completed</label>
          <select
            className="bg-[#F9F9F9] px-2 py-1 rounded-md border cursor-pointer"
            name="completed"
            value={task.completed}
            onChange={handleInput("completed")}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={handleCanceling}
            className="text-slate-50 bg-gray-600 rounded-md py-2 w-full hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
