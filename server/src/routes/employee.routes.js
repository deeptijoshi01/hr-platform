const express = require("express");

const router = express.Router();

const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee.controller");
const { authorize } = require("../middleware/role.middleware");

const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, authorize("Admin", "HR"), getAllEmployees);

router.post("/", protect, authorize("Admin"), createEmployee);

router.get("/:id", protect, authorize("Admin", "HR", "Employee"), getEmployeeById);

router.put("/:id", protect, authorize("Admin", "HR"), updateEmployee);

router.delete("/:id", protect, authorize("Admin"), deleteEmployee);

module.exports = router;