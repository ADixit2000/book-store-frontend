import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiGoogle } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = React.useState("");
  const { loginUser } = useAuth();
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("User login successfully");
      navigate("/");
    } catch (error) {
      setMessage("Invalid Credentials");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("User login successfully");
      navigate("/");
    } catch (error) {
      setMessage("Invalid Credentials" + error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-bold text-center">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="abc@gmail.com"
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
            <button className="bg-cyan-400 hover:bg-gradient-to-b from-[#D0E4E4] to-[#3ECECE] text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-md">
              Login
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Haven't an account? Please{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-800">
            Register
          </Link>
        </p>
        {/* {google sign in} */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center mt-4 bg-cyan-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-md"
          >
            <TfiGoogle className="mr-1" />
            Sign in with Google
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500 font-semibold">
          @2025 All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
