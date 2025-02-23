const express = require("express");
const Task = require("../models/Task.js");
const { authenticateUser } = require("../middleware/authMiddleware.js");

const router = express.Router();
// get all tasks for logged-in user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const { status, dueDate } = req.query;
    const filter = { userId: req.user.id };

    if (status) {
      filter.status = status;
    }

    if (dueDate) {
      const date = new Date(dueDate);
      if (!isNaN(date.getTime())) {
        // Match tasks with the exact due date (ignoring the time part)
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);

        filter.dueDate = { $gte: date, $lt: nextDay };
      } else {
        return res.status(400).json({ error: "Invalid dueDate format" });
      }
    }

    const tasks = await Task.find(filter);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get single task
router.get("/:id", authenticateUser, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

router.post("/", authenticateUser, async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({
      userId: req.user.id,
      title,
      description: description || "",
      dueDate: dueDate || null,
      status: status || "Pending",
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("POST Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// update a task
router.put("/:id", authenticateUser, async (req, res) => {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updatedTask);
});

// delete a task
router.delete("/:id", authenticateUser, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Task deleted" });
});

module.exports = router;
