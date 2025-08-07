import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
      const result = await signup(username.trim(), password.trim());
      if(!result.success) {
        setErrorMsg(result.message || "☹️ Signup failed");
      } else {
        navigate("/",{replace: true});
      }
  };

  return (
    <div className="min-h-screen flex flex-col space-y-6 items-center justify-center px-4">
      <Header flips={0} gameStarted={false} gameWon={false} />
      <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        {errorMsg && (
          <p className="text-red-600 text-center mb-4 font-medium">{errorMsg}</p>
        )}
        <form onSubmit={submit}>
          <h2 className="text-2xl font-semibold text-center text-ebony mb-6">
            Sign Up
          </h2>
          <label htmlFor="username" className="block text-ebony mb-1 text-lg">
            Username
            <input
              type="text"
              id="username"
              name="username"
              className="ml-1 min-w-[230px] border-2 rounded-md border-gray-100 focus:border-teal-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className="block text-ebony mb-1 text-lg">
            Password
            <input
              type="password"
              id="password"
              name="password"
              className="ml-1 min-w-[235px] border-2 rounded-md border-gray-100 focus:border-teal-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="w-full  text-white py-2 rounded bg-[#A1D6D4] hover:bg-[#41A5A4] focus:ring-[#41A5A4] focus:outline-none focus:ring-2  transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
