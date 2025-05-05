import { useState } from "react";
import { login } from "../services/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [loginError, setError] = useState(null);

  const loginHandler = () => {
    const requestData = {
      email,
      password,
    };

    const loginRequest = async () => {
      try {
        const response = await login(requestData);
        if (response.status === 200) {
          setError(null);
          localStorage.setItem("token", response.data.token);
          console.log(response.data);
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.message);
        setTimeout(() => {
          setError(null);
        }, 10000);
      }
    };

    loginRequest();
  };

  return (
    <div className="flex justify-center align-middle h-screen">
      <div className="w-md flex flex-col items-center justify-center">
        <h3 className="font-bold text-indigo-700">workasana</h3>
        <h2 className="text-xl my-2">Log in to your account</h2>
        <p className="text-[9px] text-zinc-600 mb-4">
          Please enter your details.
        </p>
        {loginError && (
          <div
            className={`w-[226px] rounded-sm p-1.5 mb-3 flex justify-between bg-red-200 text-gray-800 border-1 border-red-400 text-xs`}
          >
            <p>{loginError}</p>
          </div>
        )}
        <section className="flex flex-col align-top gap-2 mb-4">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border-1 px-2 pt-0.5 pb-1 rounded-sm border-gray-400 placeholder:text-gray-500 placeholder:text-xs focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </section>
        <section className="flex flex-col align-top gap-2 mb-4">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border-1 px-2 pt-0.5 pb-1 rounded-sm border-gray-400 placeholder:text-gray-500 placeholder:text-xs focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
            type="password"
            name="password"
            placeholder="Password"
          />
        </section>
        <button
          onClick={loginHandler}
          className="w-[226px] text-xs rounded-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 mt-2 shadow-md cursor-pointer"
        >
          Sign in
        </button>
        <div className="text-[10px] mt-8 text-gray-500">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-violet-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
