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
      <div className="flex flex-col items-center justify-center p-10 border-b-8 border-t-8 rounded-xl">
        <h1 className="text-lg py-5 font-bold">
          {loading ? "Processing..." : "Enter the valid email address"}
        </h1>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-coolGray"
          id="email"
          type="text"
          value={data.email}
          onChange={(e) => setData({ email: e.target.value })}
          placeholder="email"
        />

        <p className="pb-3 text-sm">
          go back?{" "}
          <Link href="/login" className="text-blue-500">
            login
          </Link>
        </p>
        {buttonDisabled ? (
          <button
            disabled
            className="p-2  border border-gray-300 rounded-lg mb-4 text-gray-500"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={onsubmit}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Submit
          </button>
        )}
      </div>
      <div className="mt-6 px-4 text-md font-semibold text-gray-900 dark:text-white">
        <ul className="max-w-md space-y-2 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>The above email address will be verified for a valid user</li>
          <li>After verification you will get a email</li>
          <li>Click on the link or copy and paste the url</li>
        </ul>
      </div>
    </div>
  );
}
