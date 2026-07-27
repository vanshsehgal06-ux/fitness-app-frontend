import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
        "http://localhost:5000/api/profile/me",
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

      const response = await fetch(
        "http://localhost:5000/api/profile/update",
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
    <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
      <h2 className="text-2xl font-bold text-white">
        Account
      </h2>

      <p className="mt-2 text-gray-400">
        Update your account information.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#1a1a1a] px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#1a1a1a] px-4 py-3 text-white outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}