import { Check, Trash2 } from "lucide-react";

export default function ExerciseItem({
  exercise,
  index,
  onToggle,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#1a1a1a] p-4">
      <div>
        <h3
          className={`text-lg ${
            exercise.completed
              ? "text-gray-500 line-through"
              : "text-white"
          }`}
        >
          {exercise.name}
        </h3>

        <p className="text-sm text-gray-400">
          {exercise.sets} Sets × {exercise.reps} Reps
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            exercise.completed
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {exercise.completed ? "Completed" : "Pending"}
        </span>

        <button
          onClick={() => onToggle(index)}
          className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
        >
          <Check size={16} />
        </button>

        <button
          onClick={() => onDelete(index)}
          className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}