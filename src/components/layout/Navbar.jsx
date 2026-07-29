import { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Programs", id: "programs" },
  { name: "Features", id: "features" },
  { name: "Pricing", id: "pricing" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id) => {
  const section = document.getElementById(id);

  if (!section) return;

  window.scrollTo({
    top: section.offsetTop,
    behavior: "smooth",
  });

  setActiveSection(id);
  window.history.replaceState(null, "", `#${id}`);
};

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      let currentSection = "home";

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (
          section &&
          scrollPosition >= section.offsetTop
        ) {
          currentSection = item.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-6 z-50 px-6">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 shadow-[0_0_40px_rgba(0,0,0,.35)] backdrop-blur-2xl">

        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 pl-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Dumbbell size={18} className="text-white" />
          </div>

          <h1 className="text-lg font-bold tracking-[0.22em] text-white">
            FITNESS PLANET
          </h1>
        </button>

        {/* Navigation */}
        <ul className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-5 py-2 text-sm transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-white font-semibold text-black"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
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