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
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const menuItems = [
  {
    name: "Profile",
    icon: UserRound,
    path: "/dashboard/profile",
  },
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
    navigate("/", { replace: true });
  }, 500);
};
  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border bg-card backdrop-blur-xl transition-all duration-300 ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Logo */}
      <div className="relative border-b border-border p-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow"
          >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {!collapsed ? (
          <>
            <h1 className="text-2xl font-black tracking-[0.25em] text-foreground">
              FITNESS
            </h1>

            <p className="mt-1 text-sm tracking-[0.25em] text-muted-foreground">
              PLANET
            </p>
          </>
        ) : (
          <div className="flex justify-center">
            <Dumbbell className="h-8 w-8 text-foreground" />
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
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `mb-2 flex items-center rounded-2xl px-4 py-4 transition-all duration-300 ${
                  collapsed ? "justify-center" : "gap-4"
                } ${ isActive ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`
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
      <div className="border-t border-border p-3">
        <button
        onClick={handleLogout}
          className={`flex w-full items-center rounded-2xl px-4 py-4 text-muted-foreground transition hover:bg-red-500/10 hover:text-red-400 ${
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