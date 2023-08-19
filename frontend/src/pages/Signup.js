import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
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
        <button className="w-full bg-blue-500 py-1 rounded-md text-white hover:bg-blue-700 hover:shadow-lg duration-300">
          Sign up
        </button>
      </form>
    </div>
  );
};
export default Signup;
