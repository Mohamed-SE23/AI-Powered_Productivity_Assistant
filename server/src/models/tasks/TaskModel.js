import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },

    description: {
      type: String,
      default: "No description",
    },

    startDate: {
      type: Date,
      default: Date.now, // Set the default start date to the current date
    },

    dueDate: {
      type: Date,
      default: Date.now, // Default due date is the current date
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    completed: {
      type: String,
      default: "false",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    lastModified: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

// Pre-save hook to update `lastModified` before saving
TaskSchema.pre("save", function (next) {
  this.lastModified = Date.now();
  next();
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
