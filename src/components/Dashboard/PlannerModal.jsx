import { useState } from "react";
import toast from "react-hot-toast";

export default function PlannerModal({ isOpen, onClose, onPlannerCreated }) {
  const [tasks, setTasks] = useState([""]);
  const handleCreatePlanner = async () => {
    const filteredTasks = tasks.filter((task) => task.trim() !== "");

  if (filteredTasks.length === 0) {
    toast.error("Please add at least one task");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/planner/createplanner",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: new Date(),
          tasks: filteredTasks.map((task) => ({
            title: task,
            completed: false,
          })),
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message);
    }
    toast.success("Planner created successfully!");
    setTasks([""]);
    onPlannerCreated();
    onClose();

  } catch (error) {
    toast.error(error.message);
  }
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-2xl bg-[#111111] p-8">

        <h2 className="text-3xl font-bold text-white">
          Create Today's Planner
        </h2>

        <p className="mt-2 text-gray-400">
          Add the tasks you want to complete today.
        </p>

        {/* Task Inputs */}
        <div className="mt-8 space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-3">

              <input
                type="text"
                placeholder={`Task ${index + 1}`}
                value={task}
                onChange={(e) => {
                  const updatedTasks = [...tasks];
                  updatedTasks[index] = e.target.value;
                  setTasks(updatedTasks);
                }}
                className="flex-1 rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
              />

              {tasks.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedTasks = tasks.filter(
                      (_, i) => i !== index
                    );
                    setTasks(updatedTasks);
                  }}
                  className="rounded-xl bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
                >
                  ✕
                </button>
              )}

            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <button
          type="button"
          onClick={() => setTasks([...tasks, ""])}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-white font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/10"
        >
          + Add Task
        </button>

        {/* Footer Buttons */}
        <div className="mt-8 flex justify-end gap-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-6 py-3 text-white transition hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreatePlanner}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Create Planner
          </button>

        </div>

      </div>
    </div>
  );
}