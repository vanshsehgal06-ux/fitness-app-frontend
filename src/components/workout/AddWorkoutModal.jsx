import { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

export default function AddWorkoutModal({
  isOpen,
  onClose,
  onWorkoutCreated,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");

  if (!isOpen) return null;

  const handleCreateWorkout = async () => {
    if (!title || !category || !duration) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/workout/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            category,
            duration: Number(duration),
            exercises: [],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Workout created successfully");

      setTitle("");
      setCategory("");
      setDuration("");

      onWorkoutCreated();
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">

      <h2 className="text-2xl font-bold text-foreground">
        Create Workout
      </h2>

      <input
        className="mt-6 w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        placeholder="Workout Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="mt-4 w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none focus:border-primary"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Chest">Chest</option>
        <option value="Back">Back</option>
        <option value="Legs">Legs</option>
        <option value="Shoulders">Shoulders</option>
        <option value="Arms">Arms</option>
        <option value="Full Body">Full Body</option>
      </select>

      <input
        type="number"
        className="mt-4 w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={onClose}
          className="rounded-xl border border-border bg-background px-5 py-3 text-foreground transition hover:bg-accent"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateWorkout}
          className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Create
        </button>

      </div>

    </div>
  </div>
);
}