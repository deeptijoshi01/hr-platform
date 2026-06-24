import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-white">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white outline-none"
          />
        </div>

        <button className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
          <Bell size={18} />
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
          D
        </div>
      </div>
    </header>
  );
};

export default Navbar;