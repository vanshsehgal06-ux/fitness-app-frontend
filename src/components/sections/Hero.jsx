import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");

export default function Hero() {
  return (
  <section id="home" className="relative flex h-[110vh]  items-center overflow-hidden">

    {/* Background Video */}
    <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover sepia">
      <source src="/videos/GYM.mp4" type="video/mp4" />
    </video>

    {/* Optional Glow */}
    <div className="absolute left-[-200px] top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-white/5 blur-[180px]" />

    {/* Content */}
    <div className="relative z-10 mx-auto flex ml-12 max-w-7xl items-center py-24">

      <div className="max-w-3xl">

        <h2 className="leading-none tracking-tight">

          <span className="block text-7xl font-black text-white lg:text-[8rem]">
            TRAIN
          </span>

          <span className="block text-7xl font-black text-white lg:text-[8rem]">
            SMARTER.
          </span>

          <span className="mt-6 block text-7xl font-black text-gray-300 lg:text-[8rem]">
            LIVE
          </span>

          <span className="block text-7xl font-black text-gray-300 lg:text-[8rem]">
            STRONGER.
          </span>

        </h2>

        <div className="mt-12 flex flex-wrap gap-5">

          <Link to={token ? "/dashboard" : "/signup"} className="btn rounded-full bg-white px-8 text-black hover:bg-gray-200">
            Start Training <ArrowRight size={18} />
            </Link>

          <button onClick={() =>document.getElementById("programs")?.scrollIntoView({behavior: "smooth"})}
           className="btn btn-outline rounded-full border-white/30 bg-white/30 px-8 text-white backdrop-blur-md hover:bg-white hover:text-black">
             Watch Demo
             </button>
             </div>
      </div>
    </div>
  </section>
);
}