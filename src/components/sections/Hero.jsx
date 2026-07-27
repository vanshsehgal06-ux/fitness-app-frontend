import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020202] pt-36">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[180px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Badge */}

        <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
          <span className="text-sm text-gray-300">
            ✨ AI Powered Fitness Platform
          </span>
        </div>

        {/* Heading */}

        <h1 className="text-6xl font-black uppercase leading-none tracking-tight text-white md:text-8xl lg:text-[9rem]">

          FITNESS

          <br />

          PLANET

        </h1>

        {/* Subtitle */}

        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">

          Transform your body with personalized workouts,
          smart nutrition tracking and AI-powered coaching —
          all in one modern platform.

        </p>

        {/* Buttons */}

       <div className="mt-12">
          <button className="btn btn-outline rounded-full border-white/20 px-10 text-white hover:bg-white hover:text-black">
            Explore
          </button>
        </div>

        {/* Scroll Indicator */}

        <div className="mt-16 animate-bounce text-gray-500">
          <ChevronDown size={28} />
        </div>

      </div>

    </section>
  );
}