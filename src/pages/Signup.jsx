import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CinematicBackground from "../components/background/CinematicBackground";
import toast from "react-hot-toast";

export default function Signup(){
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
  e.preventDefault();

  console.log(name);
  console.log(email);
  console.log(password);

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
        name,
        email,
        password
      }),
    }
  );
  
  const data = await response.json();
  console.log("Signup Response:", data);
  
  if (response.ok) {
    localStorage.setItem("token", data.token);
    
    toast.success("Account Created Successfully!");

    setTimeout(()=>{
      navigate("/dashboard/profile",{
        state:{
          isNewUser: true,
          username:name
        }
      });
  },500)
    
} else {
  
  toast.error(data.message);
}
  console.log(data);

} catch (error) {
  console.log(error);
}
};

  return(
    <CinematicBackground>
      <div className="min-h-screen flex items-center justify-center px-6">

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-gray-400 mt-2">
              Join Fitness Planet and begin your transformation.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">

            <div>
              <label className="text-sm text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Email
              </label>

              <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Password
              </label>

              <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white transition"
              />
            </div>

            <button
              className="w-full rounded-xl bg-white text-black font-semibold py-3 hover:bg-gray-200 transition duration-300"
            >
              Create Account
            </button>

          </form>

          <div className="mt-8 text-center text-gray-400">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-white font-semibold hover:underline"
            >
              Login
            </Link>

          </div>

        </div>

      </div>
    </CinematicBackground>
);
}