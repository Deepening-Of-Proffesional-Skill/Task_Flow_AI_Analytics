import express from "express";
import supabase from "../config/supabaseClient.js";


const router = express.Router();

/**
 * GET /api/progress/summary
 * Returns overall progress numbers
 */
router.get("/summary", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("status");

    if (error) throw error;

    const totalTasks = data.length;
    const completedTasks = data.filter(t => t.status === "completed").length;
    const inProgressTasks = data.filter(t => t.status === "in_progress").length;
    const pendingTasks = data.filter(t => t.status === "pending").length;

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.json({
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      completionRate,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load progress summary" });
  }
});

/**
 * GET /api/progress/weekly
 * Returns completed tasks grouped by day
 */
router.get("/weekly", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("completed_at")
      .eq("status", "completed")
      .not("completed_at", "is", null);

    if (error) throw error;

    const completedByDay = {};

    data.forEach(task => {
      const day = new Date(task.completed_at).toLocaleDateString("en-US", {
        weekday: "long",
      });
      completedByDay[day] = (completedByDay[day] || 0) + 1;
    });

    res.json({
      totalCompleted: data.length,
      completedByDay,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load weekly progress" });
  }
});

/**
 * GET /api/progress/daily
 * Returns completed tasks for a specific day
 */
router.get("/daily", async (req, res) => {
  try {
    const date =
      req.query.date || new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("tasks")
      .select("id, title, completed_at")
      .eq("status", "completed")
      .gte("completed_at", `${date}T00:00:00`)
      .lte("completed_at", `${date}T23:59:59`);

    if (error) throw error;

    res.json({
      date,
      completedCount: data.length,
      tasks: data.map(task => ({
        id: task.id,
        title: task.title,
        completedAt: task.completed_at, // keep frontend contract
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load daily progress" });
  }
});

export default router;
