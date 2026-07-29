import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import FoodItem from "./FoodItem";
import AddFoodModal from "./AddFoodModal";

export default function MealCard({
  meal,
  onMealUpdated,
}) {
  const [foodOpen, setFoodOpen] = useState(false);

  const token = localStorage.getItem("token");

  const deleteMeal = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/nutrition/${meal._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Meal deleted");

      onMealUpdated();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Daily Nutrition
          </h2>

          <p className="mt-1 text-muted-foreground">
            {meal.meals.length} food item(s)
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setFoodOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Plus size={18} />
            Add Food
          </button>

          <button
            onClick={deleteMeal}
            className="rounded-xl bg-red-500 p-3 text-white transition hover:bg-red-600"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-muted-foreground">Calories</p>

          <h3 className="mt-2 text-2xl font-bold text-foreground">
            {meal.calories}
          </h3>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-muted-foreground">Protein</p>

          <h3 className="mt-2 text-2xl font-bold text-foreground">
            {meal.protein} g
          </h3>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-muted-foreground">Carbs</p>

          <h3 className="mt-2 text-2xl font-bold text-foreground">
            {meal.carbs} g
          </h3>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-muted-foreground">Fats</p>

          <h3 className="mt-2 text-2xl font-bold text-foreground">
            {meal.fats} g
          </h3>
        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-xl font-semibold text-foreground">
          Food Items
        </h3>

        {meal.meals.length === 0 ? (
          <p className="text-muted-foreground">
            No food items added.
          </p>
        ) : (
          <div className="space-y-4">
            {meal.meals.map((food, index) => (
              <FoodItem
                key={index}
                food={food}
                index={index}
                meal={meal}
                onFoodUpdated={onMealUpdated}
              />
            ))}
          </div>
        )}

      </div>

      <AddFoodModal
        isOpen={foodOpen}
        onClose={() => setFoodOpen(false)}
        meal={meal}
        onFoodAdded={onMealUpdated}
      />

    </div>
  );
}