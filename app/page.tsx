import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4">Society Keeper</h1>
      <p className="text-3xl mb-8">Manage your society with ease</p>
      <div className="flex gap-4">
        <Link
          href="/sign-in"
          className="text-3xl border-amber-50 p-5 border-2 rounded-xl "
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="text-3xl border-amber-50 p-5 border-2 rounded-xl"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
