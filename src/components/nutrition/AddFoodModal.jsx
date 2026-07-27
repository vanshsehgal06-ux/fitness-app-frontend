import { useState } from "react";
import toast from "react-hot-toast";

export default function AddFoodModal({
  isOpen,
  onClose,
  meal,
  onFoodAdded,
}) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const newFood = {
        name,
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fats: Number(fats),
      };

      const updatedMeals = [...meal.meals, newFood];

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

      toast.success("Food added successfully!");

      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");

      onFoodAdded();
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl bg-[#111] p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Add Food Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-[#1f1f1f] p-3 text-white outline-none"
            required
          />

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full rounded-xl bg-[#1f1f1f] p-3 text-white outline-none"
            required
          />

          <input
            type="number"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full rounded-xl bg-[#1f1f1f] p-3 text-white outline-none"
            required
          />

          <input
            type="number"
            placeholder="Carbs (g)"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="w-full rounded-xl bg-[#1f1f1f] p-3 text-white outline-none"
            required
          />

          <input
            type="number"
            placeholder="Fats (g)"
            value={fats}
            onChange={(e) => setFats(e.target.value)}
            className="w-full rounded-xl bg-[#1f1f1f] p-3 text-white outline-none"
            required
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/20 px-5 py-2 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200"
            >
              Add Food
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}