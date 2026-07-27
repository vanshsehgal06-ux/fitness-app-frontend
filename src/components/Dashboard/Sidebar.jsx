import {
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  ChartSpline,
  Bot,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Workouts",
    icon: Dumbbell,
    path: "/dashboard/workouts",
  },
  {
    name: "Nutrition",
    icon: UtensilsCrossed,
    path: "/dashboard/nutrition",
  },
  {
    name: "Progress",
    icon: ChartSpline,
    path: "/dashboard/progress",
  },
  {
    name: "AI Coach",
    icon: Bot,
    path: "/dashboard/ai",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");

  toast.success("Logged out successfully!");

  setTimeout(() => {
    navigate("/login");
  }, 500);
};
  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/10 bg-black/80 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Logo */}
      <div className="relative border-b border-white/10 p-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-white"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {!collapsed ? (
          <>
            <h1 className="text-2xl font-black tracking-[0.25em] text-white">
              FITNESS
            </h1>

            <p className="mt-1 text-sm tracking-[0.25em] text-gray-500">
              PLANET
            </p>
          </>
        ) : (
          <div className="flex justify-center">
            <Dumbbell className="h-8 w-8 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center rounded-2xl px-4 py-4 transition-all duration-300 ${
                  collapsed ? "justify-center" : "gap-4"
                } ${
                  isActive
                    ? "bg-white text-black"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={22} />

              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
        onClick={handleLogout}
          className={`flex w-full items-center rounded-2xl px-4 py-4 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 ${
            collapsed ? "justify-center" : "gap-4"
          }`}
        >
          <LogOut size={22} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}