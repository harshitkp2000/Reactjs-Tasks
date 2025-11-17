import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginUser({ email, password });

    if (res?.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      toast.success("Login Successful!");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2">
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
