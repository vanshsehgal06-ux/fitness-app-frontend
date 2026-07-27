import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import PlannerModal from "./PlannerModal";
import TaskModal from "./TaskModal";

export default function PlannerCard({
  planner,
  onPlannerCreated,
  onToggleTask,
  onDeleteTask,
}) {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  return (
    <>
      <div className="mt-10 rounded-2xl border border-white/10 bg-[#111] p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Today's Planner
          </h2>

          {planner.tasks.length > 0 && (
            <button
              onClick={() => setTaskOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-black transition hover:bg-gray-200"
            >
              <Plus size={18} />
              Add Task
            </button>
          )}
        </div>

        {/* No Planner */}
        {planner.tasks.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center py-10">
            <div className="text-5xl">📅</div>

            <h3 className="mt-4 text-xl font-semibold text-white">
              No Planner Found
            </h3>

            <p className="mt-2 text-center text-gray-400">
              Create today's planner to start tracking your fitness journey.
            </p>

            <button
              onClick={() => setPlannerOpen(true)}
              className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Create Planner
            </button>
          </div>
        ) : (
          /* Planner Tasks */
          <div className="mt-6 space-y-4">
            {planner.tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-[#1a1a1a] p-4"
              >
                <h3
                  className={`text-lg ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </h3>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      task.completed
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>

                  <button
                    onClick={() => onToggleTask(index)}
                    className="rounded-lg bg-green-500 p-2 text-white transition hover:bg-green-600"
                  >
                    <Check size={16} />
                  </button>

                  <button
                    onClick={() => onDeleteTask(index)}
                    className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Planner Modal */}
      <PlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        onPlannerCreated={onPlannerCreated}
      />

      {/* Add Task Modal */}
      <TaskModal
        isOpen={taskOpen}
        onClose={() => setTaskOpen(false)}
        planner={planner}
        onTaskAdded={onPlannerCreated}
      />
    </>
  );
}