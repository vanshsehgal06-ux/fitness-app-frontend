import { useState } from "react";
import toast from "react-hot-toast";

export default function AddExerciseModal({
  isOpen,
  onClose,
  workout,
  onExerciseAdded,
}) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  if (!isOpen) return null;

  const handleAddExercise = async () => {
    if (!name || !sets || !reps) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const updatedExercises = [
        ...workout.exercises,
        {
          name,
          sets: Number(sets),
          reps: Number(reps),
          completed: false,
        },
      ];

      const response = await fetch(
        `http://localhost:5000/api/workout/${workout._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            exercises: updatedExercises,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Exercise added");

      setName("");
      setSets("");
      setReps("");

      onExerciseAdded();
      onClose();

    } catch (error) {
      toast.error(error.message);
    }
  };

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">

      <h2 className="text-2xl font-bold text-foreground">
        Add Exercise
      </h2>

      <input
        className="mt-6 w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        placeholder="Exercise Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        className="mt-4 w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
      />

      <input
        type="number"
        className="mt-4 w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={onClose}
          className="rounded-xl border border-border bg-background px-5 py-3 text-foreground transition hover:bg-accent"
        >
          Cancel
        </button>

        <button
          onClick={handleAddExercise}
          className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Add Exercise
        </button>

      </div>

    </div>
  </div>
);
}