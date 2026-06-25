import { useParams } from "react-router-dom";
import { useMemo } from "react";

const EmployeeProfile = () => {
  const { id } = useParams();

 const employee = useMemo(() => {
  const employeeList = JSON.parse(localStorage.getItem("employees")) || [];
  return employeeList.find((emp) => emp.id === id);
}, [id]);

  if (!employee) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-400">
          Employee Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        Employee Profile
      </h1>

      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 max-w-3xl">

        <div className="space-y-5">

          <div>
            <p className="text-slate-400 text-sm">Employee ID</p>
            <h2 className="text-xl font-semibold">{employee.id}</h2>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Name</p>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Email</p>
            <h2 className="text-xl font-semibold">{employee.email}</h2>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Department</p>
            <h2 className="text-xl font-semibold">{employee.department}</h2>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Designation</p>
            <h2 className="text-xl font-semibold">{employee.designation}</h2>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Status</p>
            <h2 className="text-xl font-semibold">{employee.status}</h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;