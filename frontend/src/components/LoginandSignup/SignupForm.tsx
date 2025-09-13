import { useState } from "react";
import UseSignup from "@/hooks/Auth/UseSignup";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [showPassword, setShowPassword] = useState(false);

  const { loading, signup } = UseSignup();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await signup(username, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit}>
          <input
            className="mb-4   w-full input input-bordered "
            type="text"
            placeholder="A weird username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="relative mb-4">
            <input
              className="  w-full input input-bordered "
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.634A11.035 11.035 0 0112 4.5c3.312 0 6.393 1.474 8.02 4.134M20.02 15.366A11.035 11.035 0 0112 19.5a11.035 11.035 0 01-8.02-4.134M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.634A11.035 11.035 0 0112 4.5c3.312 0 6.393 1.474 8.02 4.134M20.02 15.366A11.035 11.035 0 0112 19.5a11.035 11.035 0 01-8.02-4.134M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </span>
          </div>
          <div className="relative mb-4">
            <input
              className=" block w-full input input-bordered "
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button
              className="btn btn-accent ml-auto w-1/2 p-2 font-semibold"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
