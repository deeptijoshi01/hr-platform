import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../constants/sidebarLinks";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col">
      
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">
          HireFlow AI
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;