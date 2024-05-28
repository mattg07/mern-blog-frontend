import React, { useState } from "react";
import backendURL from "../../apiConfig";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

async function register(ev) {
  ev.preventDefault();
  try {
    const response = await fetch(`${backendURL}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      alert('Registration successful');
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    alert(error.message); 
  }
}

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-4">Register</h2>
        <form className="space-y-4" onSubmit={register}>
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={ev => setUsername(ev.target.value)}
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
              onChange={ev => setPassword(ev.target.value)}
              className="form-input mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
