import { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

export default function SecurityCard() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePassword = async () => {
    if (!formData.currentPassword) {
      return toast.error("Current password is required.");
    }

    if (formData.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters.");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/profile/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Password updated successfully!");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="rounded-2xl border border-border bg-card p-6">
    <h2 className="text-2xl font-bold text-foreground">
      Security
    </h2>

    <p className="mt-2 text-muted-foreground">
      Change your account password.
    </p>

    <div className="mt-6 space-y-5">

      <div>
        <label className="mb-2 block text-sm text-muted-foreground">
          Current Password
        </label>

        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted-foreground">
          New Password
        </label>

        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted-foreground">
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground"
        />
      </div>

      <button
        onClick={handleUpdatePassword}
        disabled={loading}
        className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>

    </div>
  </div>
);
}