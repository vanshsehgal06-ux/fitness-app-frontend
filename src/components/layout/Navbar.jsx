import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-6 z-50 px-6">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,.35)]">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 pl-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Dumbbell size={18} className="text-white" />
          </div>

          <h1 className="text-lg font-bold tracking-[0.22em] text-white">
            FITNESS PLANET
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="hidden items-center gap-2 md:flex">
          <li>
            <Link
              to="/"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <a
              href="#programs"
              className="rounded-full px-5 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Programs
            </a>
          </li>

          <li>
            <a
              href="#features"
              className="rounded-full px-5 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Features
            </a>
          </li>

          <li>
            <a
              href="#pricing"
              className="rounded-full px-5 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Pricing
            </a>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3 pr-2">

          <Link
            to="/signup"
            className="hidden rounded-full border border-white/10 px-5 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white md:block"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,.25)]"
          >
            Login
          </Link>

        </div>

      </nav>
    </header>
  );
}