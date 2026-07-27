import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import WorkoutCard from "../../components/workout/WorkoutCard";
import AddWorkoutModal from "../../components/workout/AddWorkoutModal";

export default function Workout() {
  const [collapsed, setCollapsed] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/workout",
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

      setWorkouts(data.workouts);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <h1 className="p-10 text-white">
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="p-10 text-red-500">
        {error}
      </h1>
    );
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
          {/* Page Heading */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white">
                Workouts
              </h1>

              <p className="mt-3 text-gray-400">
                Track your workouts and build consistency.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              + Add Workout
            </button>
          </div>

          {/* Workout List */}
          <div className="mt-10">
            {workouts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#111] py-20 text-center">
                <div className="text-6xl">🏋️</div>

                <h2 className="mt-5 text-2xl font-bold text-white">
                  No Workouts Found
                </h2>

                <p className="mt-3 text-gray-400">
                  Create your first workout to start tracking your fitness journey.
                </p>

                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
                >
                  Create Workout
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {workouts.map((workout) => (
                  <WorkoutCard
                    key={workout._id}
                    workout={workout}
                    onWorkoutUpdated={fetchWorkouts}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AddWorkoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onWorkoutCreated={fetchWorkouts}
      />
    </div>
  );
}