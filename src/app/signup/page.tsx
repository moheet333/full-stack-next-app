"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success ", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.messageI);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center p-10 border-b-8 border-t-8 rounded-xl ">
        <h1 className="text-3xl py-5 font-bold">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr />
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-offwihte"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-offwihte"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email address"
        />
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-offwihte"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <p className="text-sm">
          already have a account,{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        {buttonDisabled ? (
          <button
            disabled
            className="p-2 border border-gray-300 rounded-lg m-4 text-gray-500"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
