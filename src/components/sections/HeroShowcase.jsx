import { ArrowRight } from "lucide-react";

export default function HeroShowcase() {
  return (
    <section className="relative min-h-screen bg-[#020202] overflow-hidden flex items-center">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-[-200px] top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-white/5 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-20 px-8 py-24 lg:flex-row">

        {/* LEFT */}

        <div className="flex-1">

          

          <h2 className="leading-none tracking-tight">

            <span className="block text-7xl font-black text-white lg:text-[8rem]">
              TRAIN
            </span>

            <span className="block text-7xl font-black text-white lg:text-[8rem]">
              SMARTER.
            </span>

            <span className="mt-6 block text-7xl font-black text-gray-500 lg:text-[8rem]">
              LIVE
            </span>

            <span className="block text-7xl font-black text-gray-500 lg:text-[8rem]">
              STRONGER.
            </span>

          </h2>

          

          <div className="mt-12 flex flex-wrap gap-5">

            <button className="btn rounded-full bg-white px-8 text-black hover:bg-gray-200">
              Start Training
              <ArrowRight size={18} />
            </button>

            <button className="btn btn-outline rounded-full border-white/20 px-8 text-white hover:bg-white hover:text-black">
              Watch Demo
            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative flex flex-1 items-center justify-center">

          {/* Outer Ring */}

          <div className="absolute h-[700px] w-[700px] rounded-full border border-white/5" />

          {/* Middle Ring */}

          <div className="absolute h-[520px] w-[520px] rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm" />

          {/* Main Sphere */}

          <div className="h-[360px] w-[360px] rounded-full bg-gradient-to-br from-zinc-700 via-zinc-900 to-black shadow-[0_0_150px_rgba(255,255,255,0.08)]" />

        </div>

      </div>

    </section>
  );
}