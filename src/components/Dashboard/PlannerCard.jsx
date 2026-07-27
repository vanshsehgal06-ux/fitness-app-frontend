import { useState } from "react";
import PlannerModal from "./PlannerModal";

export default function PlannerCard({ planner, onPlannerCreated }) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="mt-10 rounded-2xl border border-white/10 bg-[#111] p-6">

      <h2 className="text-2xl font-bold text-white">
        Today's Planner
      </h2>

      {planner.tasks.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center py-10">
            <div className="text-5xl">📅</div>
            <h3 className="mt-4 text-xl font-semibold text-white">No Planner Found</h3>
            <p className="mt-2 text-center text-gray-400">Create today's planner to start tracking your fitness journey.</p>
            <button onClick={()=> setIsOpen(true)} 
            className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition">
                Create Planner
                </button>
                </div>
                ) : (
                <div className="mt-6 space-y-4">
          {planner.tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-[#1a1a1a] p-4"
            >
              <span className="text-white">
                {task.title}
              </span>

              <span
                className={`font-semibold ${
                  task.completed
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
    <PlannerModal isOpen={isOpen}
    onClose={()=>setIsOpen(false)}
    onPlannerCreated={onPlannerCreated}
/>
</>
  );
}

