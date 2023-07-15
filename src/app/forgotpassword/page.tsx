"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

export default function forgotpassword() {
  const [data, setData] = React.useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onsubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", data);
      console.log("Email sent successfully", response.data);
    } catch (error: any) {
      console.log("Forgot password failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>
        {loading ? "Processing..." : "Please enter your email to get verified."}
      </h1>
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-coolGray"
        id="email"
        type="text"
        value={data.email}
        onChange={(e) => setData({ email: e.target.value })}
        placeholder="email"
      />
      {!buttonDisabled && (
        <button
          onClick={onsubmit}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Submit
        </button>
      )}

      <Link href="/login">Login page</Link>
    </div>
  );
}
