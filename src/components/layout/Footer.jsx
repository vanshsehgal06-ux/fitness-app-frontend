import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Brand */}
        <div className="flex flex-col items-center text-center">

          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-3xl font-bold tracking-[0.25em] text-white">
              FITNESS PLANET
            </h2>
          </div>

          <p className="max-w-md text-lg text-gray-400">
            Train Smarter.
            <br />
            Live Stronger.
          </p>

        </div>

        {/* Navigation */}
        <div className="mt-14 flex flex-wrap justify-center gap-10 text-gray-400">

          <Link to="/" className="transition hover:text-white">
            Home
          </Link>

          <a href="#programs" className="transition hover:text-white">
            Programs
          </a>

          <Link to="/login" className="transition hover:text-white">
            Login
          </Link>

          <Link to="/signup" className="transition hover:text-white">
            Signup
          </Link>

        </div>

        {/* Divider */}
        <div className="my-12 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 text-sm text-gray-500 md:flex-row">

          <div className="flex flex-wrap justify-center gap-8">

            <a href="#" className="transition hover:text-white">
              Contact
            </a>

            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>

          </div>

          <p>
            © {new Date().getFullYear()} Fitness Planet. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}