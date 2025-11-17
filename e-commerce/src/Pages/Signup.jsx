import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await signupUser({ name, email, password });

    if (res) {
      toast.success("Signup Successful! Please Login.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Signup
        </h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

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

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-2">
            Signup
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
