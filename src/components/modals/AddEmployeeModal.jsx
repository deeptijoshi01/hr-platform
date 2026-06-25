import { useState, useEffect } from "react";

const AddEmployeeModal = ({
  isOpen,
  onClose,
  onAddEmployee,
  employee = null, // Pass existing employee data for edit mode
}) => {
  const isEditMode = !!employee;

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    department: "Engineering",
    designation: "",
    status: "Active",
  });

  // Populate form when employee data changes (edit mode)
  useEffect(() => {
    if (isOpen) {
      if (employee) {
        setFormData({
          employeeId: employee.id || "",
          name: employee.name || "",
          email: employee.email || "",
          department: employee.department || "Engineering",
          designation: employee.designation || "",
          status: employee.status || "Active",
        });
      } else {
        setFormData({
          employeeId: "",
          name: "",
          email: "",
          department: "Engineering",
          designation: "",
          status: "Active",
        });
      }
    }
  }, [isOpen, employee]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const employeeData = {
      id: formData.employeeId,
      name: formData.name,
      email: formData.email,
      department: formData.department,
      designation: formData.designation,
      status: formData.status,
    };

    if (isEditMode) {
      // Pass additional flag to identify this is an update
      onAddEmployee({
        ...employeeData,
        isEdit: true,
        originalId: employee.id,
      });
    } else {
      onAddEmployee(employeeData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isEditMode ? "Edit Employee" : "Add Employee"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            disabled={isEditMode}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          <input
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          <input
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          >
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-700 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
          >
            {isEditMode ? "Update Employee" : "Save Employee"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;