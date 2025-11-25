import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiGoogle } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import getBaseUrl from "../utils/baseUrl";

const AdminLogin = () => {
  const [message, setMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      console.log(auth);
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token Expired please login again");
          navigate("/");
        }, 3600000);
      }
      alert("Admin Login Successfull");
      navigate("/dashboard");
      //   navigate("/");
    } catch (error) {
      setMessage("Invalid Credentials");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-bold text-center">Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
              htmlFor="username"
            >
              UserName
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full p-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="******"
              className="shadow appearance-none border rounded w-full p-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-red-950 text-xs italic mb-3">{message}</p>
          )}
          <div className="">
            <button className="w-full bg-cyan-400 hover:bg-gradient-to-b from-[#D0E4E4] to-[#3ECECE] text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-md">
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-xs text-gray-500 font-semibold">
          @2025 All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
