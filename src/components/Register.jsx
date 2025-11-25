import React from "react";
import { Link } from "react-router-dom";
import { TfiGoogle } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = React.useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //register user
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert("User register successfully");
    } catch (error) {
      setMessage("Please provide valid details : " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      alert("User Register successfully");
      navigate("/");
    } catch (error) {
      setMessage("Invalid Credentials" + error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-bold text-center">Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Email
            </label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              className="shadow appearance-none border rounded w-full p-2 px-3 focus:outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Password
            </label>
            <input
              type="password"
              placeholder="******"
              className="shadow appearance-none border rounded w-full p-2 px-3 focus:outline-none"
              {...register("password", {
                required: "Password required",
                minLength: 6,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {message && (
            <p className="text-red-600 text-xs italic mb-3">{message}</p>
          )}

          <button className="bg-cyan-400 text-white font-bold py-1 px-8 rounded">
            Register
          </button>
        </form>

        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account? Please{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-800">
            Login
          </Link>
        </p>
        {/* {google sign in} */}
        <div className="mt-4">
          <button className="w-full flex flex-wrap gap-1 items-center justify-center mt-4 bg-cyan-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-md">
            <TfiGoogle className="mr-1" />
            Sign up with Google
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
