import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import backendURL from "../../apiConfig";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { fetchProfile } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(`${backendURL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      await fetchProfile(); // Fetch the profile after login
      setRedirect(true);
    } else {
      alert("Wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form className="space-y-4" onSubmit={login}>
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              className="form-input mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="form-input mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
