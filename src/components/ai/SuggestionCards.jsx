import {
  Dumbbell,
  Utensils,
  Flame,
  HeartPulse,
} from "lucide-react";

const suggestions = [
  {
    icon: Dumbbell,
    title: "Workout Plan",
    prompt: "Create a workout plan for me",
  },
  {
    icon: Utensils,
    title: "Meal Plan",
    prompt: "Suggest a healthy meal plan",
  },
  {
    icon: Flame,
    title: "Calories",
    prompt: "How many calories should I eat today?",
  },
  {
    icon: HeartPulse,
    title: "Fitness Tips",
    prompt: "Give me today's fitness tips",
  },
];

export default function SuggestionCards() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {suggestions.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            key={index}
            className="rounded-2xl border border-white/10 bg-[#111] p-5 text-left transition-all hover:border-white/30 hover:bg-[#181818]"
          >
            <Icon
              size={28}
              className="mb-4 text-white"
            />

            <h3 className="text-lg font-semibold text-white">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              {item.prompt}
            </p>
          </button>
        );
      })}
    </div>
  );
}