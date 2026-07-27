import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import ExerciseItem from "./ExerciseItem";
import AddExerciseModal from "./AddExerciseModal";

export default function WorkoutCard({
  workout,
  onWorkoutUpdated,
}) {
  const [exerciseOpen, setExerciseOpen] = useState(false);

  const token = localStorage.getItem("token");

  const toggleExercise = async (index) => {
    try {
      const updatedExercises = [...workout.exercises];

      updatedExercises[index] = {
        ...updatedExercises[index],
        completed: !updatedExercises[index].completed,
      };

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

      onWorkoutUpdated();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteExercise = async (index) => {
    try {
      const updatedExercises = workout.exercises.filter(
        (_, i) => i !== index
      );

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

      toast.success("Exercise deleted");

      onWorkoutUpdated();

    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteWorkout = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/workout/${workout._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`,},
    }
);

const data = await response.json();

if (!response.ok) {
    throw new Error(data.message);
}

toast.success("Workout deleted");
onWorkoutUpdated();
} catch (error) {
    toast.error(error.message); }
};

  return (
    <>
      <div className="rounded-2xl bg-[#1a1a1a] p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              {workout.title}
            </h2>

            <p className="mt-2 text-gray-400">
              {workout.category} • {workout.duration} mins
            </p>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => setExerciseOpen(true)} className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-semibold text-black hover:bg-gray-200">
                <Plus size={18} /> Add Exercise </button>
                
                <button onClick={deleteWorkout} className="rounded-xl bg-red-500 p-3 text-white hover:bg-red-600"> 
                    <Trash2 size={18} /> </button>
                    </div>
                    </div>

        {workout.exercises.length === 0 ? (

          <div className="mt-8 rounded-xl border border-dashed border-white/10 p-6 text-center text-gray-400">
            No exercises added yet.
          </div>

        ) : (

          <div className="mt-6 space-y-4">
            {workout.exercises.map((exercise, index) => (
              <ExerciseItem
                key={index}
                exercise={exercise}
                index={index}
                onToggle={toggleExercise}
                onDelete={deleteExercise}
              />
            ))}
          </div>

        )}
      </div>

      <AddExerciseModal
        isOpen={exerciseOpen}
        onClose={() => setExerciseOpen(false)}
        workout={workout}
        onExerciseAdded={onWorkoutUpdated}
      />
    </>
  );
}