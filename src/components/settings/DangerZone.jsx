import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DangerZone() {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/profile/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.removeItem("token");

      toast.success("Account deleted successfully.");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6">
      <h2 className="text-2xl font-bold text-red-400">
        Danger Zone
      </h2>

      <p className="mt-3 text-gray-300">
        Deleting your account will permanently remove:
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-400">
        <li>Your profile</li>
        <li>Your workouts</li>
        <li>Your nutrition logs</li>
        <li>Your planner data</li>
        <li>Your AI chat history</li>
      </ul>

      <button
        onClick={handleDeleteAccount}
        className="mt-8 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Delete Account
      </button>
    </div>
  );
}