import { useState } from "react";
import toast from "react-hot-toast";

export default function TaskModal({
  isOpen,
  onClose,
  planner,
  onTaskAdded,
}) {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleAddTask = async () => {
    if (!title.trim()) {
      toast.error("Task cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const updatedTasks = [
        ...planner.tasks,
        {
          title: title.trim(),
          completed: false,
        },
      ];

      const response = await fetch(
        `http://localhost:5000/api/planner/updateplanner/${planner._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tasks: updatedTasks,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Task added");

      setTitle("");

      onTaskAdded();

      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
        <h2 className="text-2xl font-bold text-foreground">
          Add New Task
        </h2>

        <input
          className="mt-6 w-full rounded-xl border border-border bg-background p-4 text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
          placeholder="Drink Water..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3 text-foreground transition hover:bg-accent"
          >
            Cancel
          </button>

          <button
            onClick={handleAddTask}
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}