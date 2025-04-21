import moment from "moment";
import { setActiveTask, setIsEditing, setModalMode, setTask } from "../app/tasksSlice";
import profile_pic from "../assets/profile_pic.jpg";
import { server } from "../config"

// Format the creation time of a task
export const formatTime = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);

  const diffInSeconds = now.diff(created, "seconds");
  const diffInMinutes = now.diff(created, "minutes");
  const diffInHours = now.diff(created, "hours");
  const diffInDays = now.diff(created, "days");
  const diffInWeeks = now.diff(created, "weeks");

  if (diffInSeconds < 60) {
    return "Now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  }

  return created.format("DD/MM/YYYY");
};

// Filter tasks by priority
export const filteredTasks = (tasks, priority) => {
  switch (priority) {
    case "low":
      return tasks.filter((task) => task.priority === "low");
    case "medium":
      return tasks.filter((task) => task.priority === "medium");
    case "high":
      return tasks.filter((task) => task.priority === "high");
    default:
      return tasks;
  }
};

// ------------------- open modal for add task ---------------
export const openModalForAdd = (dispatch) => {
    dispatch(setModalMode("add"));
    dispatch(setIsEditing(true));
    dispatch(setTask({}));
  };

  // ------------------- open modal for edit task ---------------

  export const openModalForEdit = (dispatch, task) => {
    dispatch(setModalMode("edit"));
    dispatch(setIsEditing(true));
    dispatch(setActiveTask(task));
  };

  // set profile picture this works in  localhost and hosting platforms that support read and write file systems

  // export const profile_url = (url) =>  url?.startsWith('http')
  //                         ? `${profile_pic}`
  //                         : `${server}${url}`;
  export const profile_url = `${profile_pic}`;
    
//   export const openProfileModal = () => {
//     setProfileModal(true);
//   };

// Get overdue tasks
// export const overdueTasks = (tasks) => {
//   const todayDate = moment();
//   return tasks.filter(
//     (task) => !task.completed && moment(task.dueDate).isBefore(todayDate)
//   );
// };
