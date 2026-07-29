import { useState } from "react";
import toast from "react-hot-toast";

export default function PlannerModal({ isOpen, onClose, onPlannerCreated }) {
  const [tasks, setTasks] = useState([""]);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleCreatePlanner = async () => {
    const filteredTasks = tasks.filter((task) => task.trim() !== "");

  if (filteredTasks.length === 0) {
    toast.error("Please add at least one task");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/planner/createplanner`,
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
      <div className="w-full max-w-lg rounded-2xl bg-card border border-border p-8">

        <h2 className="text-3xl font-bold text-foreground">
          Create Today's Planner
        </h2>

        <p className="mt-2 text-muted-foreground">
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
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
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
                  className="rounded-xl bg-red-500 px-4 py-3 text-foreground transition hover:bg-red-600"
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
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 font-medium text-foreground transition-all duration-300 hover:bg-accent"
          >
          + Add Task
        </button>

        {/* Footer Buttons */}
        <div className="mt-8 flex justify-end gap-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-6 py-3 text-foreground transition hover:bg-accent"
            >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreatePlanner}
            className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
            Create Planner
          </button>

        </div>

      </div>
    </div>
  );
}