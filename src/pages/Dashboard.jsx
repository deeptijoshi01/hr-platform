import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/cards/StatCard";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <h1 className="text-3xl font-bold text-white mb-6">
              HireFlow Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6">
              <StatCard
                title="Total Employees"
                value="248"
                subtitle="+12 this month"
              />

              <StatCard
                title="Open Positions"
                value="18"
                subtitle="Across 6 departments"
              />

              <StatCard
                title="Pending Leaves"
                value="24"
                subtitle="Awaiting approval"
              />

              <StatCard
                title="Monthly Payroll"
                value="₹18.4L"
                subtitle="Current cycle"
              />
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;