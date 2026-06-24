import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageHeader from "../components/common/PageHeader";
import { employees } from "../data/employees";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
const [employeeList, setEmployeeList] = useState(employees);
  const filteredEmployees = employeeList.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

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
              buttonText="Add Employee"
            />

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">
                  Employee Directory
                </h3>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
                  />

                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
                  >
                    <option value="All">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 text-slate-400">
                        Employee ID
                      </th>
                      <th className="text-left py-3 text-slate-400">
                        Name
                      </th>
                      <th className="text-left py-3 text-slate-400">
                        Department
                      </th>
                      <th className="text-left py-3 text-slate-400">
                        Designation
                      </th>
                      <th className="text-left py-3 text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <tr
                          key={employee.id}
                          className="border-b border-slate-800"
                        >
                          <td className="py-4 text-white">
                            {employee.id}
                          </td>

                          <td className="py-4 text-white">
                            {employee.name}
                          </td>

                          <td className="py-4 text-white">
                            {employee.department}
                          </td>

                          <td className="py-4 text-white">
                            {employee.designation}
                          </td>

                          <td className="py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                employee.status === "Active"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {employee.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-slate-400"
                        >
                          No employees found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;