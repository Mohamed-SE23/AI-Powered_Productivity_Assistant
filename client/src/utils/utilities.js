import moment from "moment";
import { setActiveTask, setIsEditing, setModalMode, setTask } from "../app/tasksSlice";

// Format the creation time of a task
export const formatTime = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);

  if (created.isSame(now, "day")) {
    return "Today";
  }

  if (created.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
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
    dispatch(setModalMode("add"));
    dispatch(setIsEditing(true));
    dispatch(setActiveTask(task));
  };

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
