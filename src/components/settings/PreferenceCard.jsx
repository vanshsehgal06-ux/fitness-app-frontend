import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PreferenceCard() {
  const [preferences, setPreferences] = useState({
    theme: "dark",
    weightUnit: "kg",
    heightUnit: "cm",
    language: "English",
  });

  useEffect(() => {
    const saved = localStorage.getItem("preferences");

    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setPreferences((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "preferences",
      JSON.stringify(preferences)
    );

    toast.success("Preferences saved!");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
      <h2 className="text-2xl font-bold text-white">
        Preferences
      </h2>

      <p className="mt-2 text-gray-400">
        Customize how the app works for you.
      </p>

      <div className="mt-6 space-y-5">

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Theme
          </label>

          <select
            name="theme"
            value={preferences.theme}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#1a1a1a] px-4 py-3 text-white outline-none"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Weight Unit
          </label>

          <select
            name="weightUnit"
            value={preferences.weightUnit}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#1a1a1a] px-4 py-3 text-white outline-none"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="lbs">Pounds (lbs)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Height Unit
          </label>

          <select
            name="heightUnit"
            value={preferences.heightUnit}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#1a1a1a] px-4 py-3 text-white outline-none"
          >
            <option value="cm">Centimeters (cm)</option>
            <option value="ft">Feet (ft)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Language
          </label>

          <select
            name="language"
            value={preferences.language}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#1a1a1a] px-4 py-3 text-white outline-none"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Save Preferences
        </button>

      </div>
    </div>
  );
}