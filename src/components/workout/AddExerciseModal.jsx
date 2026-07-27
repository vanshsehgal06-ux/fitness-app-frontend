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
      <div className="w-full max-w-md rounded-2xl bg-[#111] p-8">

        <h2 className="text-2xl font-bold text-white">
          Add Exercise
        </h2>

        <input
          className="mt-6 w-full rounded-xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none"
          placeholder="Exercise Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="mt-4 w-full rounded-xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />

        <input
          type="number"
          className="mt-4 w-full rounded-xl border border-white/10 bg-[#1a1a1a] p-4 text-white outline-none"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleAddExercise}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black"
          >
            Add Exercise
          </button>

        </div>

      </div>
    </div>
  );
}