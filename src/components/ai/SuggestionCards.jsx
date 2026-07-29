import {Dumbbell, Utensils, Flame, HeartPulse,} from "lucide-react";

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

export default function SuggestionCards({ onSuggestionClick }) {
  return (
  <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {suggestions.map((item, index) => {
      const Icon = item.icon;

      return (
        <button
          key={index} onClick={() => onSuggestionClick(item.prompt)}
           className="rounded-2xl border border-border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-accent hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]">
          <Icon size={28} className="mb-4 text-primary"/>

          <h3 className="text-lg font-bold text-foreground">
            {item.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground leading-6">
            {item.prompt}
          </p>
        </button>
      );
    })}
  </div>
);
}