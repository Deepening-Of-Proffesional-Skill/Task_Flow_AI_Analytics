const express = require("express");
const router = express.Router();

const tasks = require("../data/tasks.data");

router.get("/", (req, res) => {
  res.json(tasks);
});

module.exports = router;
router.patch("/:id/status", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { status } = req.body;

  const allowedStatuses = ["pending", "in_progress", "completed"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value"
    });
  }

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.status = status;

if (status === "completed") {
  task.completedAt = new Date().toISOString();
} else {
  task.completedAt = null;
}


  res.json({
    message: "Task status updated",
    task
  });
});
