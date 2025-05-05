import { useState } from "react";
import { signUp } from "../services/auth";

const Signup = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setConfirmPassword] = useState(null);

  const [signupError, setError] = useState(null);
  const [signupSuccess, setSuccess] = useState(null);

  const formHandler = (e) => {
    e.preventDefault();

    const requestData = {
      name,
      email,
      password,
      passwordConfirm,
    };

    const registerUser = async () => {
      try {
        const response = await signUp(requestData);
        if (response.status === 201) {
          setError(null);
          setSuccess(
            "Congratulations, your account has been successfully created!"
          );
          setTimeout(() => {
            setSuccess(null);
          }, 10000);

          const token = response.data.token;
          localStorage.setItem("token", token);
          console.log(response.data.data);
        }
      } catch (error) {
        setSuccess(null);
        setError(error.response.data.message);
        console.log(error.response.data.message);
        setTimeout(() => {
          setError(null);
        }, 10000);
      }
    };

    registerUser();
  };

  return (
    <div className="flex justify-center align-middle h-screen">
      <form
        onSubmit={formHandler}
        className="w-md flex flex-col items-center justify-center"
      >
        <h3 className="font-bold text-indigo-700">workasana</h3>
        <h2 className="text-xl my-2">Create Account</h2>
        <p className="text-[9px] text-zinc-600 mb-4">
          Please enter your details.
        </p>
        {signupError && (
          <div
            className={`w-[226px] rounded-sm p-1.5 mb-3 flex justify-between bg-red-200 text-gray-800 border-1 border-red-400 text-xs`}
          >
            <p>{signupError}</p>
          </div>
        )}
        {signupSuccess && (
          <div
            className={`w-[226px] rounded-sm p-1.5 mb-3 flex justify-between bg-emerald-100 text-green-800 border-1 border-emerald-600 text-xs`}
          >
            <p>{signupSuccess}</p>
          </div>
        )}

        <section className="flex flex-col align-top gap-2 mb-4">
          <label className="text-sm" htmlFor="email">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="border-1 px-2 pt-0.5 pb-1 rounded-sm border-gray-400 placeholder:text-gray-500 placeholder:text-xs focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </section>
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
            required
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
            minLength={8}
            required
          />
        </section>
        <section className="flex flex-col align-top gap-2 mb-4">
          <label className="text-sm" htmlFor="password">
            Confirm Password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-1 px-2 pt-0.5 pb-1 rounded-sm border-gray-400 placeholder:text-gray-500 placeholder:text-xs focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            minLength={8}
            required
          />
        </section>
        <section className="w-1/2 flex align-middle gap-2 mb-3 ms-1.5">
          <input type="checkbox" name="terms" required />
          <label className="text-xs text-gray-500" htmlFor="terms">
            I accept Terms and Conditions
          </label>
        </section>
        <input
          className="w-1/2 text-xs rounded-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 mt-2 shadow-md"
          type="submit"
          value="Create Account"
        />
      </form>
    </div>
  );
};

export default Signup;
