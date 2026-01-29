const progressRoutes = require("./routes/progress.routes");
const express = require("express");
const cors = require("cors");

const tasksRoutes = require("./routes/tasks.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/api/progress", progressRoutes);

app.get("/", (req, res) => {
  res.send("TaskFlow API running");
});

module.exports = app;
