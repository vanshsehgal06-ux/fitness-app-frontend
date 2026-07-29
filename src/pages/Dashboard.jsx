import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCards from "@/components/dashboard/StatsCards";
import PlannerCard from "@/components/dashboard/PlannerCard";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setDashboardData(data.dashboard);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Toggle Task
  const toggleTask = async (index) => {
    try {
      const updatedTasks = [...dashboardData.todayPlanner.tasks];

      updatedTasks[index] = {
        ...updatedTasks[index],
        completed: !updatedTasks[index].completed,
      };

      const response = await fetch(
        `http://localhost:5000/api/planner/updateplanner/${dashboardData.todayPlanner._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tasks: updatedTasks,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      fetchDashboard();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Task
  const deleteTask = async (index) => {
    try {
      const updatedTasks = dashboardData.todayPlanner.tasks.filter(
        (_, i) => i !== index
      );

      const response = await fetch(
        `http://localhost:5000/api/planner/updateplanner/${dashboardData.todayPlanner._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tasks: updatedTasks,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      fetchDashboard();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h1 className="p-10 text-white">Loading...</h1>;
  }

  if (error) {
    return <h1 className="p-10 text-white">{error}</h1>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`transition-all duration-300 ${
          collapsed ? "ml-24" : "ml-72"
        }`}
      >
        <div className="p-10">
          <WelcomeSection user={dashboardData.user} />

          <StatsCards dashboardData={dashboardData} />

          <PlannerCard
            planner={dashboardData.todayPlanner}
            onPlannerCreated={fetchDashboard}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
}