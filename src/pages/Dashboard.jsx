import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <h1 className="text-3xl font-bold">
              HireFlow Dashboard
            </h1>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;