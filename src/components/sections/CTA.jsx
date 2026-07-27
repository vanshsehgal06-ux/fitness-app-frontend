import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#020202] py-40">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">

        {/* Badge */}

        <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
          <span className="text-sm text-gray-300">
            FITNESS PLANET
          </span>
        </div>

        {/* Heading */}

        <h2 className="max-w-5xl text-5xl font-black leading-tight text-white md:text-7xl lg:text-8xl">

          START YOUR

          <br />

          TRANSFORMATION

          <br />

          TODAY.

        </h2>

        {/* Subtitle */}

        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">

          Personalized workouts, AI coaching,
          nutrition planning and progress tracking —
          everything you need in one place.

        </p>

        {/* Buttons */}

        <div className="mt-14 flex flex-wrap justify-center gap-5">

          <Link
            to="/signup"
            className="btn rounded-full bg-white px-10 text-black hover:bg-gray-200"
          >
            Create Account
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/login"
            className="btn btn-outline rounded-full border-white/20 px-10 text-white hover:bg-white hover:text-black"
          >
            Login
          </Link>

        </div>

      </div>

    </section>
  );
}