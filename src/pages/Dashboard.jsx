import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import WelcomeSection from "@/components/Dashboard/WelcomeSection";
import StatsCards from "@/components/Dashboard/StatsCards";
import PlannerCard from "@/components/Dashboard/PlannerCard";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

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

useEffect(()=>{
  fetchDashboard()
},[])

if(loading){
  return <h1 className="text-white p-10">Loading....</h1>
}
if(error){
  return <h1 className="text-white p-10">{error}</h1>
}
  return (
    <div className="min-h-screen bg-[#020202]">
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
          <WelcomeSection user = {dashboardData.user}/>
          <StatsCards dashboardData = {dashboardData}/>
          <PlannerCard planner= {dashboardData.todayPlanner}
          onPlannerCreated={fetchDashboard}/>
        </div>
      </main>
    </div>
  );
}