export default function StatsCards({ dashboardData }) {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-400 text-sm">🎯 Goal</p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {dashboardData.user.goal}
        </h2>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-400 text-sm">💪 Fitness Level</p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {dashboardData.user.fitnessLevel}
        </h2>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-400 text-sm">📈 Progress</p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {dashboardData.todayPlanner.completionPercentage}%
        </h2>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-400 text-sm">📋 Today's Tasks</p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {dashboardData.todayPlanner.totalTasks}
        </h2>
      </div>

    </div>
  );
}