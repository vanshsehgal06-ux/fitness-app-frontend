import { useState } from "react";
import toast from "react-hot-toast";

export default function AddMealModal({
  isOpen,
  onClose,
  onMealCreated,
}) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreateMeal = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/nutrition/create",
        {
          method: "POST",
          headers: {"Content-Type": "application/json", Authorization:`Bearer ${token}`},
          body: JSON.stringify({
            meals: [],
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Nutrition created successfully!");

      onMealCreated();
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">

        <h2 className="text-2xl font-bold text-foreground">
          Create Nutrition
        </h2>

        <p className="mt-2 text-muted-foreground">
          Create today's nutrition tracker. You can add food items afterwards.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-2 text-foreground transition hover:bg-accent"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateMeal}
            disabled={loading}
            className="rounded-xl bg-primary px-5 py-2 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Nutrition"}
          </button>

        </div>

      </div>
    </div>
  );
}