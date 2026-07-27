import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import MealCard from "../../components/nutrition/MealCard";
import AddMealModal from "../../components/nutrition/AddMealModal";

export default function Nutrition() {
  const [collapsed, setCollapsed] = useState(false);
  const [nutrition, setNutrition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchNutrition = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/nutrition",
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

      setNutrition(data.nutrition);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, []);

  if (loading) return <h1 className="p-10 text-white">Loading...</h1>;

  if (error) return <h1 className="p-10 text-red-500">{error}</h1>;

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white">
                Nutrition
              </h1>

              <p className="mt-3 text-gray-400">
                Track your meals and nutrition.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200"
            >
              + Add Meal
            </button>
          </div>

          {nutrition.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-white/10 bg-[#111] py-20 text-center">
              <div className="text-6xl">🍽️</div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                No Meals Added
              </h2>

              <p className="mt-3 text-gray-400">
                Start tracking your daily nutrition.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {nutrition.map((meal) => (
                <MealCard
                  key={meal._id}
                  meal={meal}
                  onMealUpdated={fetchNutrition}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <AddMealModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onMealCreated={fetchNutrition}
      />
    </div>
  );
}