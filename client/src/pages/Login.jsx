import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { api } from "../services/api";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { saveToken } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", data);
      saveToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-[calc(100vh_-_56px)] w-full">
      <h1 className="text-teal-500 text-5xl my-10 text-center italic font-serif">
        E-Transact
      </h1>
      <div className="bg-white max-w-xl mx-auto p-10">
        <h3 className="text-center text-3xl mb-10">Login</h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 outline-none p-1 text-gray-600 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 outline-none p-1 text-gray-600 focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            className="border-2 border-teal-500 text-teal-500 py-2 w-full font-bold hover:bg-teal-500 hover:text-white duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
