"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function newpassword() {
  const router = useRouter();
  const [verified, setVerified] = React.useState(false);
  const [data, setData] = React.useState({
    password: "",
    token: "",
  });
  const [error, setError] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onsubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/newpassword", data);
      console.log("password changed successfully", response.data);
      setVerified(true);
      router.push("/login");
    } catch (error: any) {
      console.log("Forgot password failed", error.message);
      setError(true);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setData({ ...data, token: urlToken || "" });
  }, []);

  useEffect(() => {
    if (data.password.length > 0 && data.token.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Please enter your new password"}</h1>
      <label htmlFor="email">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-coolGray"
        id="email"
        type="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder="new password"
      />
      {!buttonDisabled && (
        <button
          onClick={onsubmit}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Submit
        </button>
      )}

      {verified && (
        <div>
          <h2 className="text-2xl">Password changed successfully</h2>
          <Link className="text-blue-500 bg-green-500" href="/login">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
