import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

export default function AccountCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/profile/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setFormData({
        name: data.user.name,
        email: data.user.email,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/profile/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
        <p className="text-gray-400">Loading account...</p>
      </div>
    );
  }

return (
  <div className="rounded-2xl border border-border bg-card p-6">
    <h2 className="text-2xl font-bold text-foreground">
      Account
    </h2>

    <p className="mt-2 text-muted-foreground">
      Update your account information.
    </p>

    <div className="mt-6 space-y-5">
      <div>
        <label className="mb-2 block text-sm text-muted-foreground">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted-foreground">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary"
        />
      </div>

      <button
        onClick={handleSave}
        className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Save Changes
      </button>
    </div>
  </div>
);
}