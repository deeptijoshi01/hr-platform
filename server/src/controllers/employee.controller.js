const employees = require("../data/employees");

const getAllEmployees = (req, res) => {
  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
};
const createEmployee = (req, res) => {
  const newEmployee = req.body;

  employees.push(newEmployee);

  res.status(201).json({
    success: true,
    message: "Employee Created Successfully",
    data: newEmployee,
  });
};
const getEmployeeById = (req, res) => {
  const employee = employees.find(
    (emp) => emp.id === req.params.id
  );

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    data: employee,
  });
};
const updateEmployee = (req, res) => {
  const index = employees.findIndex(
    (emp) => emp.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  employees[index] = {
    ...employees[index],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "Employee Updated Successfully",
    data: employees[index],
  });
};
const deleteEmployee = (req, res) => {
  const index = employees.findIndex(
    (emp) => emp.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  const deletedEmployee = employees.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Employee Deleted Successfully",
    data: deletedEmployee[0],
  });
};
module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};