import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NotificationCard() {
  const [notifications, setNotifications] = useState({
    workoutReminder: true,
    mealReminder: true,
    waterReminder: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("notifications");

    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    toast.success("Notification preferences saved!");
  };

  const Toggle = ({ checked, onClick }) => (
    <button
      onClick={onClick}
      className={`relative h-7 w-14 rounded-full transition ${
        checked ? "bg-green-500" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
          checked ? "left-8" : "left-1"
        }`}
      />
    </button>
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
      <h2 className="text-2xl font-bold text-white">
        Notifications
      </h2>

      <p className="mt-2 text-gray-400">
        Manage your reminder preferences.
      </p>

      <div className="mt-8 space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">
              Workout Reminder
            </h3>

            <p className="text-sm text-gray-400">
              Get reminded to complete your workout.
            </p>
          </div>

          <Toggle
            checked={notifications.workoutReminder}
            onClick={() => toggleNotification("workoutReminder")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">
              Meal Reminder
            </h3>

            <p className="text-sm text-gray-400">
              Never miss your meals.
            </p>
          </div>

          <Toggle
            checked={notifications.mealReminder}
            onClick={() => toggleNotification("mealReminder")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">
              Water Reminder
            </h3>

            <p className="text-sm text-gray-400">
              Stay hydrated throughout the day.
            </p>
          </div>

          <Toggle
            checked={notifications.waterReminder}
            onClick={() => toggleNotification("waterReminder")}
          />
        </div>

        <button
          onClick={handleSave}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Save Notifications
        </button>

      </div>
    </div>
  );
}