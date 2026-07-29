import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function FoodItem({
  food,
  index,
  meal,
  onFoodUpdated,
}) {
  const token = localStorage.getItem("token");

  const deleteFood = async () => {
    try {
      const updatedMeals = meal.meals.filter((_, i) => i !== index);

      const totalCalories = updatedMeals.reduce(
        (sum, item) => sum + Number(item.calories || 0),
        0
      );

      const totalProtein = updatedMeals.reduce(
        (sum, item) => sum + Number(item.protein || 0),
        0
      );

      const totalCarbs = updatedMeals.reduce(
        (sum, item) => sum + Number(item.carbs || 0),
        0
      );

      const totalFats = updatedMeals.reduce(
        (sum, item) => sum + Number(item.fats || 0),
        0
      );

      const response = await fetch(
        `http://localhost:5000/api/nutrition/${meal._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            meals: updatedMeals,
            calories: totalCalories,
            protein: totalProtein,
            carbs: totalCarbs,
            fats: totalFats,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Food deleted");

      onFoodUpdated();
    } catch (error) {
      toast.error(error.message);
    }
  };

return (
  <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
    <div>
      <h4 className="text-lg font-semibold text-foreground">
        {food.name}
      </h4>

      <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>🔥 {food.calories} kcal</span>
        <span>🥩 {food.protein} g</span>
        <span>🍚 {food.carbs} g</span>
        <span>🥑 {food.fats} g</span>
      </div>
    </div>

    <button
      onClick={deleteFood}
      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
    >
      <Trash2 size={18} />
    </button>
  </div>
);
}