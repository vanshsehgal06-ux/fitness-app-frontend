import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import CinematicBackground from "../components/background/CinematicBackground";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);

      toast.success("Welcome Back!");
      setTimeout(()=>{
         navigate("/dashboard",{
          state:{
            isNewUser:false,
            username:data.user.userName
          }
         });
      },500)
     
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};



  return (
    <CinematicBackground>
      <div className="min-h-screen flex items-center justify-center px-6">

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-gray-400 mt-2">
              Log in to continue your fitness journey.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="text-sm text-gray-300">
                Email
              </label>

              <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white transition"/>
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Password
              </label>

              <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white transition"
              />
            </div>

            <div>
              <button
                type="button"
                className="text-gray-300 hover:text-white transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
            type="submit"
            className="w-full rounded-xl bg-white text-black font-semibold py-3 hover:bg-gray-200 transition duration-300">
             Login
            </button>

          </form>

          <div className="mt-8 text-center text-gray-400">
            Don't have an account?

            <Link
              to="/signup"
              className="ml-2 text-white font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>

        </div>

      </div>
    </CinematicBackground>
  );
}