import {
  Apple,
  Bot,
  CalendarDays,
  ChartSpline,
  Dumbbell,
  UserRound,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    title: "AI Fitness Coach",
    description:
      "Get personalised workout, nutrition, and recovery guidance based on your fitness level, profile, and goals.",
    icon: Bot,
    highlights: [
      "Personalised recommendations",
      "Instant fitness guidance",
      "Available anytime",
    ],
  },
  {
    title: "Workout Tracker",
    description:
      "Create and organise your workout routines while keeping track of exercises and training consistency.",
    icon: Dumbbell,
    highlights: [
      "Create custom workouts",
      "Track exercises",
      "Monitor consistency",
    ],
  },
  {
    title: "Smart Nutrition",
    description:
      "Log your meals and monitor calories, protein, carbohydrates, and fats from one simple dashboard.",
    icon: Apple,
    highlights: [
      "Meal logging",
      "Calorie tracking",
      "Nutrition insights",
    ],
  },
  {
    title: "Daily Planner",
    description:
      "Plan workouts, meals, and fitness tasks so you always know what needs to be completed during the day.",
    icon: CalendarDays,
    highlights: [
      "Daily task planning",
      "Completion tracking",
      "Organised routines",
    ],
  },
  {
    title: "Progress Dashboard",
    description:
      "Understand your fitness journey through clear statistics, completed goals, and daily performance summaries.",
    icon: ChartSpline,
    highlights: [
      "Goal tracking",
      "Workout statistics",
      "Progress summaries",
    ],
  },
  {
    title: "Personal Profile",
    description:
      "Store and manage your fitness level, personal goals, preferences, and account information securely.",
    icon: UserRound,
    highlights: [
      "Fitness goals",
      "Personal preferences",
      "Secure account",
    ],
  },
];

const stats = [
  {
    value: "6+",
    label: "Powerful tools",
  },
  {
    value: "24/7",
    label: "AI assistance",
  },
  {
    value: "100%",
    label: "Personalised",
  },
  {
    value: "1",
    label: "Complete platform",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative min-h-screen overflow-hidden bg-black px-6 pt-32 pb-20 text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />

        <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-white/5 blur-[120px]" />

        <div className="absolute -right-32 top-1/2 h-80 w-80 rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-gray-400">
            Powerful features
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Everything you need to
            <span className="block text-gray-400">
              train smarter every day
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Fitness Planet brings your workouts, meals, daily planning,
            progress, and AI-powered guidance together in one intelligent
            fitness platform.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
              >
                {/* Card number */}
                <span className="absolute right-6 top-5 text-5xl font-black text-white/[0.035] transition duration-500 group-hover:text-white/[0.07]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-white/10">
                  <Icon
                    size={25}
                    strokeWidth={1.8}
                    className="text-white"
                  />
                </div>

                {/* Text */}
                <div className="relative mt-7">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold text-white">
                      {feature.title}
                    </h3>

                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                    />
                  </div>

                  <p className="mt-4 leading-7 text-gray-400">
                    {feature.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {feature.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-3 text-sm text-gray-300"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />

                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom hover glow */}
                <div className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-white to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-8 text-center ${
                index !== stats.length - 1
                  ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                  : ""
              } ${
                index === 1
                  ? "sm:border-r-0 lg:border-r"
                  : ""
              }`}
            >
              <p className="text-4xl font-black text-white">
                {stat.value}
              </p>

              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}