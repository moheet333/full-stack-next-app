"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

export default function verifyemail() {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl p-2">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token received!"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
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
