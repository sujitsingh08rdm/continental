import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Building2,
  ClipboardCheck,
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const OwnerLayout = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Conext Not Mounted");
  }
  const { owner, setOwner } = context;
  const logout = async () => {
    setOwner(false);
    toast.success("Logout Successfully");
  };

  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Rooms",
      path: "/owner/rooms",
      icon: Building2,
    },
    {
      name: "Bookings",
      path: "/owner/bookings",
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-[Outfit]">
      {/* Owner Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 bg-white border-b border-gray-200 shadow-sm">
        <NavLink to="/owner">
          <img className="h-10" src="/logo.png" alt="Logo" />
        </NavLink>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-800">Welcome back!</p>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>

          <button
            onClick={logout}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
          >
            <LogOut size={17} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </header>

      {/* Dashboard Layout */}
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-16 md:w-64 shrink-0 bg-white border-r border-gray-200 py-6 transition-all duration-300">
          <div className="px-3 md:px-5 mb-6">
            <p className="hidden md:block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Management
            </p>
          </div>

          <nav className="flex flex-col gap-2 px-2 md:px-3">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-semibold"
                        : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                    }`
                  }
                >
                  <Icon size={21} strokeWidth={1.8} />

                  <span className="hidden md:block text-sm">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
