import express from 'express';
import tasks from "../data/tasks.data.js";
const router = express.Router();

/**
 * GET /api/progress/summary
 * Returns overall progress numbers
 */
router.get("/summary", (req, res) => {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in_progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completionRate =
  totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  res.json({
    totalTasks,
    completedTasks,
    inProgressTasks,
    pendingTasks,
    completionRate
  });
});

/**
 * GET /api/progress/weekly
 * Returns completed tasks grouped by day
 */
router.get("/weekly", (req, res) => {
  const completedTasks = tasks.filter(
    (task) => task.status === "completed" && task.completedAt
  );

  const completedByDay = {};
  completedTasks.forEach((task) => {
    const day = new Date(task.completedAt).toLocaleDateString("en-US", {
      weekday: "long"
    });

    completedByDay[day] = (completedByDay[day] || 0) + 1;
  });

  res.json({
    totalCompleted: completedTasks.length,
    completedByDay
  });
});


// DAILY PROGRESS
router.get("/daily", (req, res) => {
  const date =
    req.query.date || new Date().toISOString().split("T")[0];

  const completedOnDate = tasks.filter(
    (task) =>
      task.status === "completed" &&
      task.completedAt &&
      task.completedAt.startsWith(date)
  );
  res.json({
    date,
    completedCount: completedOnDate.length,
    tasks: completedOnDate.map((task) => ({
      id: task.id,
      title: task.title,
      completedAt: task.completedAt
    }))
  });
});

export default router;
