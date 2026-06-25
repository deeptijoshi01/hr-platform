const authRoutes = require("./routes/auth.routes");
const express = require("express");

const employeeRoutes = require("./routes/employee.routes");

const app = express();

app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

module.exports = app;