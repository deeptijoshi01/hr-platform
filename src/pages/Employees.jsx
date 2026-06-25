import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageHeader from "../components/common/PageHeader";
import { employees } from "../data/employees";
import AddEmployeeModal from "../components/modals/AddEmployeeModal";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [employeeList, setEmployeeList] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : employees;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Get unique departments for filter
  const departments = [
    "All",
    ...new Set(employeeList.map((employee) => employee.department)),
  ];

  // Stats calculations
  const totalEmployees = employeeList.length;
  const activeEmployees = employeeList.filter(
    (employee) => employee.status === "Active"
  ).length;
  const inactiveEmployees = employeeList.filter(
    (employee) => employee.status === "Inactive"
  ).length;
  const totalDepartments = new Set(
    employeeList.map((employee) => employee.department)
  ).size;

  // Filter employees based on search and department
  const filteredEmployees = employeeList.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" || employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employeeList));
  }, [employeeList]);

  // Open modal for adding new employee
  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing employee
  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  // Handle add or update employee
 const handleSaveEmployee = (employeeData) => {
  if (employeeData.isEdit) {
    setEmployeeList((prev) =>
      prev.map((emp) =>
        emp.id === employeeData.originalId
          ? {
              ...emp,
              id: employeeData.originalId,
              name: employeeData.name,
              email: employeeData.email,
              department: employeeData.department,
              designation: employeeData.designation,
              status: employeeData.status,
            }
          : emp
      )
    );
  } else {
    const exists = employeeList.some(
      (emp) => emp.id === employeeData.id
    );

    if (exists) {
      alert("Employee ID already exists");
      return;
    }

    setEmployeeList((prev) => [...prev, employeeData]);
  }

  handleCloseModal();
};

  // Handle delete employee
  const handleDeleteEmployee = (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    setEmployeeList((prev) =>
      prev.filter((employee) => employee.id !== employeeId)
    );
  };

  return (
    <DashboardLayout>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <PageHeader
              title="Employees"
              subtitle="Manage employee records and organization structure"
            />

            {/* Stats Cards - Single Instance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Total Employees</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {totalEmployees}
                </h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Active Employees</p>
                <h3 className="text-3xl font-bold text-green-400 mt-2">
                  {activeEmployees}
                </h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Inactive Employees</p>
                <h3 className="text-3xl font-bold text-red-400 mt-2">
                  {inactiveEmployees}
                </h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Departments</p>
                <h3 className="text-3xl font-bold text-blue-400 mt-2">
                  {totalDepartments}
                </h3>
              </div>
            </div>

            {/* Employee Directory Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              {/* Header with Add Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <h3 className="text-white text-lg font-semibold">
                  Employee Directory
                </h3>

                <button
                  onClick={handleOpenAddModal}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Employee
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-w-[180px]"
                >
                  <option value="All">All Departments</option>
                  {departments
                    .filter((dept) => dept !== "All")
                    .map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">
                        Employee ID
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">
                        Department
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">
                        Designation
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <tr
                          key={employee.id}
                          className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-150"
                        >
                          <td className="py-4 px-4 text-white text-sm">
                            {employee.id}
                          </td>

                         <td className="py-4 px-4 text-white text-sm font-medium">
  <Link
    to={`/employees/${employee.id}`}
    className="hover:text-blue-400 transition-colors"
  >
    {employee.name}
  </Link>
</td>

                          <td className="py-4 px-4 text-slate-300 text-sm">
                            {employee.department}
                          </td>

                          <td className="py-4 px-4 text-slate-300 text-sm">
                            {employee.designation}
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                employee.status === "Active"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                  employee.status === "Active"
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                }`}
                              ></span>
                              {employee.status}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal(employee)}
                                className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors duration-150 text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-150 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-12 text-center text-slate-400"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 text-slate-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <p>No employees found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              {filteredEmployees.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-400">
                  <span>
                    Showing {filteredEmployees.length} of {totalEmployees}{" "}
                    employees
                  </span>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Corrected Modal Component Call */}
    <AddEmployeeModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  onAddEmployee={handleSaveEmployee}
  employee={editingEmployee}
/>
    </DashboardLayout>
  );
};

export default Employees;