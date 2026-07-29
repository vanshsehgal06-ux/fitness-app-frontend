import { Check, ArrowRight, Crown, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "A simple starting point for building better fitness habits.",
    buttonText: "Get Started",
    buttonLink: "/signup",
    featured: false,
    icon: Sparkles,
    features: [
      "AI Coach — 5 chats per day",
      "Workout tracker",
      "Nutrition tracker",
      "Daily planner",
      "Progress dashboard",
      "Personal fitness profile"
    ],
  },
  {
    name: "Pro",
    price: "₹299",
    description:
      "For users who want personalised guidance and deeper progress insights.",
    buttonText: "Start Pro",
    buttonLink: "/signup",
    featured: true,
    icon: Crown,
    badge: "Most Popular",
    features: [
      "Everything included in Free",
      "Unlimited AI Coach access",
      "Personalised workout plans",
      "Smart meal recommendations",
      "Advanced progress analytics",
      "Weekly fitness reports"
    ],
  },
  {
    name: "Elite",
    price: "₹699",
    description:
      "A complete premium experience for serious fitness transformation.",
    buttonText: "Become Elite",
    buttonLink: "/signup",
    featured: false,
    icon: ShieldCheck,
    features: [
      "Everything included in Pro",
      "Personal coach support",
      "Premium workout library",
      "Custom meal plans",
      "Goal optimisation",
      "Priority member support"
    ],
  },
];

const benefits = [
  "Cancel anytime",
  "Secure payments",
  "Instant access",
  "No hidden charges"
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative min-h-screen overflow-hidden bg-black px-6 pt-32 pb-20 text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-white/[0.045] blur-[130px]" />

        <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-white/[0.035] blur-[130px]" />

        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-white/[0.035] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-gray-400">
            Membership plans
          </p>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Choose the plan
            <span className="block text-gray-400">
              that fits your goals.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Start free and upgrade whenever you are ready. Get access to
            smarter fitness tools, personalised guidance, and deeper progress
            insights.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <article
                key={plan.name}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 ${
                  plan.featured
                    ? "border-white/40 bg-white text-black shadow-[0_30px_100px_rgba(255,255,255,0.12)] lg:scale-[1.04]"
                    : "border-white/10 bg-white/[0.035] text-white hover:border-white/25 hover:bg-white/[0.055] hover:shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
                }`}
              >
                {/* Popular badge */}
                {plan.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    {plan.badge}
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition duration-500 group-hover:scale-110 ${
                    plan.featured
                      ? "border-black/10 bg-black text-white"
                      : "border-white/10 bg-white/5 text-white"
                  }`}
                >
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                {/* Plan name */}
                <div className="mt-7">
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.28em] ${
                      plan.featured ? "text-black/60" : "text-gray-500"
                    }`}
                  >
                    {plan.name}
                  </p>

                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-5xl font-black tracking-tight">
                      {plan.price}
                    </span>

                    <span
                      className={`pb-1 text-sm ${
                        plan.featured ? "text-black/55" : "text-gray-500"
                      }`}>
                      / month
                    </span>
                  </div>

                  <p
                    className={`mt-5 min-h-[84px] leading-7 ${
                      plan.featured ? "text-black/65" : "text-gray-400"
                    }`}>
                    {plan.description}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className={`my-7 h-px ${
                    plan.featured ? "bg-black/10" : "bg-white/10"
                  }`}
                />

                {/* Features */}
                <ul className="flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-sm leading-6 ${
                        plan.featured ? "text-black/75" : "text-gray-300"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.featured
                            ? "bg-black text-white"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <Check size={13} strokeWidth={3} />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Link
                  to={plan.buttonLink}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition duration-300 hover:scale-[1.02] ${
                    plan.featured
                      ? "bg-black text-white hover:bg-zinc-800"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight size={17} />
                </Link>

                {/* Bottom glow */}
                {!plan.featured && (
                  <div className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-white to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                )}
              </article>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-2 text-sm text-gray-400"
            >
              <Check size={16} className="text-white" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}