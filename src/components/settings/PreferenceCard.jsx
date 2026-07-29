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

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      preferences.theme === "dark"
    );
  }, [preferences.theme]);

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

    document.documentElement.classList.toggle(
      "dark",
      preferences.theme === "dark"
    );

    toast.success("Preferences saved!");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-2xl font-bold text-foreground">
        Preferences
      </h2>

      <p className="mt-2 text-muted-foreground">
        Customize how the app works for you.
      </p>

      <div className="mt-6 space-y-5">

        {/* Theme */}
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Theme
          </label>

          <select
            name="theme"
            value={preferences.theme}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        {/* Weight Unit */}
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Weight Unit
          </label>

          <select
            name="weightUnit"
            value={preferences.weightUnit}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="lbs">Pounds (lbs)</option>
          </select>
        </div>

        {/* Height Unit */}
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Height Unit
          </label>

          <select
            name="heightUnit"
            value={preferences.heightUnit}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          >
            <option value="cm">Centimeters (cm)</option>
            <option value="ft">Feet (ft)</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Language
          </label>

          <select
            name="language"
            value={preferences.language}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Save Preferences
        </button>

      </div>
    </div>
  );
}