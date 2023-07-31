"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful ", response.data);
      toast.success("Login Successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center p-10 border-b-8 border-t-8 rounded-xl ">
        <h1 className="text-3xl py-5 font-bold">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr />
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-offwhite"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email address"
        />
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-offwhite"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />
        <Link className="text-sm text-blue-500" href="/forgotpassword">
          forgot password?
        </Link>

        <p className="pt-1 pb-2 text-sm">
          don't have a account?{" "}
          <Link href="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
        {buttonDisabled ? (
          <button
            disabled
            className="p-2 border border-gray-300 rounded-lg m-3 text-gray-500"
          >
            Login
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg m-3 focus:outline-none focus:border-gray-600"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
