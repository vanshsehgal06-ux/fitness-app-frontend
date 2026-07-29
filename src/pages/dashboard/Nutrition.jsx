import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar.jsx";
import MealCard from "../../components/nutrition/MealCard.jsx";
import AddMealModal from "../../components/nutrition/AddMealModal.jsx";
const API_URL = import.meta.env.VITE_API_URL;

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
        `${API_URL}/api/nutrition`,
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-foreground">
                Nutrition
              </h1>

              <p className="mt-3 text-muted-foreground">
                Track your meals and nutrition.
              </p>
            </div>



            {nutrition.length > 0 && (
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
              + Add Meal
            </button>
            )} 
          </div>

          {nutrition.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-border bg-card py-20 text-center">
              <div className="text-6xl">🍽️</div>

              <h2 className="mt-5 text-2xl font-bold text-foreground">
                No Meals Added
              </h2>

              <p className="mt-3 text-muted-foreground">
                Start tracking your daily nutrition.
              </p>

               <button
                onClick={() => setModalOpen(true)} className="mt-8 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"> Create Meal 
                </button>
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