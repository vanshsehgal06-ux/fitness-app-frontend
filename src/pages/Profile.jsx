import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";

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
      const response = await fetch(
        "http://localhost:5000/api/profile/me",
        {headers:{ Authorization:`Bearer ${token}`}});

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
        "http://localhost:5000/api/profile/update",
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
      <h1 className="p-10 text-white">
        Loading...
      </h1>
    );
  }
  return (
    <div className="min-h-screen bg-[#020202]">
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
          <h1 className="text-5xl font-bold text-white">
            Profile
          </h1>
          <p className="mt-3 text-gray-400">
            Manage your personal and fitness information
          </p>

          <button
            onClick={()=>setEditMode(!editMode)} className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-black">
                {editMode ? "Cancel" : "Edit Profile"}
                </button>
                          <div className="mt-10 grid gap-6 md:grid-cols-2">

            {/* Personal Information */}
            <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
              <h2 className="text-xl font-bold text-white">
                Personal Information
              </h2>
              <div className="mt-5 space-y-5 text-gray-300">
                <div>
                  Name:{editMode ?<input name="name" value={formData.name} onChange={handleChange} className="ml-2 rounded-lg bg-[#222] p-2 text-white"/>
                  : <span className="ml-2 text-white"> {user.name}
                    </span>
                  }
                </div>

                <div>
                  Email:<span className="ml-2 text-white"> {user.email}</span>
                </div>

                <div>
                  Age:{editMode ?<input
                      name="age" value={formData.age} onChange={handleChange} className="ml-2 rounded-lg bg-[#222] p-2 text-white"/>
                      : <span className="ml-2 text-white"> {user.age || "Not Set"}</span>
                  }
                </div>

                <div>
                  Weight:{editMode ? <input name="weight" value={formData.weight} onChange={handleChange} className="ml-2 rounded-lg bg-[#222] p-2 text-white"/>
                  :
                  <span className="ml-2 text-white"> {user.weight || "Not Set"}</span>
                  }
                </div>

                <div>
                  Height:{editMode ? <input name="height" value={formData.height} onChange={handleChange} className="ml-2 rounded-lg bg-[#222] p-2 text-white"
                    />:
                    <span className="ml-2 text-white">{user.height || "Not Set"}
                    </span>
                  }
                </div>
              </div>
            </div>

            {/* Fitness Information */}
            <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
              <h2 className="text-xl font-bold text-white">
                Fitness Information
              </h2>
              <div className="mt-5 space-y-5 text-gray-300">
                <div>
                  Goal:{editMode ? <select name="goal" value={formData.goal} onChange={handleChange} className="ml-2 rounded-lg bg-[#222] p-2 text-white"
                    >
                        <option value="">
                        Select Goal
                      </option>

                      <option value="Weight Loss">
                        Weight Loss
                      </option>

                      <option value="Muscle Gain">
                        Muscle Gain
                      </option>

                      <option value="Maintain Fitness">
                        Maintain Fitness
                      </option>
                    </select>
                    :
                    <span className="ml-2 text-white">
                      {user.goal || "Not Set"}
                    </span>
                  }

                </div>
                <div>
                    Fitness Level:{editMode ?<select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} className="ml-2 rounded-lg bg-[#222] p-2 text-white">

                      <option value="">
                        Select Level
                      </option>

                      <option value="Beginner">
                        Beginner
                      </option>

                      <option value="Intermediate">
                        Intermediate
                      </option>

                      <option value="Advanced">
                        Advanced
                      </option>
                    </select>
                    :
                    <span className="ml-2 text-white">
                      {user.fitnessLevel || "Not Set"}
                    </span>
                  }
                </div>

                <div>
                  Activity Level:{editMode ? <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="ml-2 rounded-lg bg-[#222] p-2 text-white">

                      <option value="">
                        Select Activity
                      </option>

                      <option value="Low">
                        Low
                      </option>

                      <option value="Moderate">
                        Moderate
                      </option>

                      <option value="High">
                        High
                      </option>
                    </select>
                    :
                    <span className="ml-2 text-white">
                      {user.activityLevel || "Not Set"}
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>

          {editMode && <button onClick={updateProfile} className="mt-8 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600">
            Save Changes
             </button>
}
</div>
      </main>
    </div>
  );
}