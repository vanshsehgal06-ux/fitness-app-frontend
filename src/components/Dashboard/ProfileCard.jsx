import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileCard() {
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    fitnessLevel: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/profile`,
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

      setProfile(data.user);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/profile`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <h2 className="text-3xl font-bold text-foreground">
        My Profile
      </h2>

      <p className="mt-2 text-muted-foreground">
        Manage your personal information.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Username
          </label>

          <input
            type="text"
            name="userName"
            value={profile.userName}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-muted-foreground"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={profile.age || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Gender
          </label>

          <select
            name="gender"
            value={profile.gender || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Height (cm)
          </label>

          <input
            type="number"
            name="height"
            value={profile.height || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Weight (kg)
          </label>

          <input
            type="number"
            name="weight"
            value={profile.weight || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Goal
          </label>

          <select
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          >
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Maintain Weight</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Fitness Level
          </label>

          <select
            name="fitnessLevel"
            value={profile.fitnessLevel}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-8 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Save Changes
      </button>
    </div>
  );
}