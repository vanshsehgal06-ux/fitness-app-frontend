import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
const API_URL = import.meta.env.VITE_API_URL;

export default function Profile() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    activityLevel: "",
    fitnessLevel: "",
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/profile/me`,{
        headers:{ Authorization:`Bearer ${token}`},
        });

      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message);
      }

      setUser(data.user);
      setFormData({
        name: data.user.name || "",
        age: data.user.age || "",
        weight: data.user.weight || "",
        height: data.user.height || "",
        goal: data.user.goal || "",
        activityLevel: data.user.activityLevel || "",
        fitnessLevel: data.user.fitnessLevel || "",
      });


    } catch(error){
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchProfile();
  },[]);

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async()=>{
    try{
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/profile/update`,
        {method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
          body:JSON.stringify(formData)
        }
      );

      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message);
      }
      await fetchProfile();
      setEditMode(false);

    }catch(error){
      console.log(error.message);
    }
  };

  if(loading){
    return (
      <h1 className="p-10 text-foreground">
        Loading...
      </h1>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <main
        className={`transition-all duration-300 ${
          collapsed ? "ml-24" : "ml-72"
        }`}
      >
        <div className="p-10">
          <div className="flex items-center justify-between">
  <div>
    <h1 className="text-5xl font-bold text-foreground">
      Profile
    </h1>

    <p className="mt-3 text-muted-foreground">
      Manage your personal and fitness information
    </p>
  </div>

  <button
    onClick={() => setEditMode(!editMode)}
    className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
  >
    {editMode ? "Cancel" : "Edit Profile"}
  </button>
</div>

{/* Profile Header Card */}

<div className="mt-10 rounded-3xl border border-border bg-card p-8">
  <div className="flex flex-col items-center gap-6 md:flex-row">

    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
      {user.name?.charAt(0).toUpperCase()}
    </div>

    <div className="flex-1">

      <h2 className="text-3xl font-bold text-foreground">
        {user.name}
      </h2>

      <p className="mt-1 text-muted-foreground">
        {user.email}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">

        <span className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground">
          🎯 {user.goal || "No Goal"}
        </span>

        <span className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground">
          💪 {user.fitnessLevel || "No Level"}
        </span>

        <span className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground">
          ⚡ {user.activityLevel || "No Activity"}
        </span>

      </div>

    </div>

  </div>
</div>

<div className="mt-10 grid gap-6 md:grid-cols-2">

  {/* Personal Information */}

  <div className="rounded-2xl border border-border bg-card p-6">

    <h2 className="text-xl font-bold text-foreground">
      Personal Information
    </h2>

    <div className="mt-6 space-y-5">

      <div>
        <label className="text-sm text-muted-foreground">
          Name
        </label>

        {editMode ? (
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none"
          />
        ) : (
          <p className="mt-2 text-lg text-foreground">
            {user.name}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-muted-foreground">
          Email
        </label>

        <p className="mt-2 text-lg text-foreground">
          {user.email}
        </p>
      </div>

      <div>
        <label className="text-sm text-muted-foreground">
          Age
        </label>

        {editMode ? (
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          />
        ) : (
          <p className="mt-2 text-lg text-foreground">
            {user.age || "Not Set"}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-muted-foreground">
          Weight
        </label>

        {editMode ? (
          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          />
        ) : (
          <p className="mt-2 text-lg text-foreground">
            {user.weight || "Not Set"} 
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-muted-foreground">
          Height
        </label>

        {editMode ? (
          <input
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          />
        ) : (
          <p className="mt-2 text-lg text-foreground">
            {user.height || "Not Set"} 
          </p>
        )}
      </div>

    </div>

  </div>

  {/* Fitness Information */}

  <div className="rounded-2xl border border-border bg-card p-6">

    <h2 className="text-xl font-bold text-foreground">
      Fitness Information
    </h2>

    <div className="mt-6 space-y-5">

      <div>
        <label className="text-sm text-muted-foreground">
          Goal
        </label>

        {editMode ? (
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          >
            <option value="">Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Maintain Fitness">Maintain Fitness</option>
          </select>
        ) : (
          <p className="mt-2 text-lg text-foreground">
            {user.goal || "Not Set"}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-muted-foreground">
          Fitness Level
        </label>

        {editMode ? (
          <select
            name="fitnessLevel"
            value={formData.fitnessLevel}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        ) : (
          <p className="mt-2 text-lg text-foreground">
            {user.fitnessLevel || "Not Set"}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-muted-foreground">
          Activity Level
        </label>

        {editMode ? (
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          >
            <option value="">Select Activity</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        ) : (
          <p className="mt-2 text-lg text-foreground">
            {user.activityLevel || "Not Set"}
          </p>
        )}
      </div>

    </div>

  </div>

</div>

{editMode && (
  <div className="mt-8">
    <button
      onClick={updateProfile}
      className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
    >
      Save Changes
    </button>
  </div>
)}
        </div>
      </main>
    </div>
  );
}
          