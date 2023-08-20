import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto pt-40">
        <h3 className="text-center text-2xl font-medium mb-10">Sign up</h3>
        <div className="flex items-center gap-12 mb-4">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-400 w-full"
          />
        </div>
        <div className="flex items-center gap-5 mb-8">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-400 w-full"
          />
        </div>
        <button
          disabled={isLoading}
          className="w-full bg-blue-500 py-1 rounded-md text-white hover:bg-blue-700 hover:shadow-lg duration-300">
          Sign up
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};
export default Signup;
