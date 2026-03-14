"use client";

import React from "react";

const Subscriptions = () => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("Current user from Subscriptions:", user?.user);

  const [subscriptionAmount, setSubscriptionAmount] = React.useState<number>(0);
  const [flatType, setFlatType] = React.useState<string>("1BHK");


  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/flats/subscription`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        subscription_fees: subscriptionAmount,
        flat_type: flatType
      })
    });
  };

  return (
    <div className="flex-1 m-4 min-w-full border border-white/10 bg-zinc-950 rounded-2xl p-8 text-white min-h-[calc(100vh-2rem)] flex flex-col gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Subscriptions</h1>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 max-w-xl">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-zinc-400 ml-1">
            Subscription Amount
          </label>
          <input
          onChange={(e) => setSubscriptionAmount(Number(e.target.value))}
            value={subscriptionAmount}
            type="number"
            placeholder="Enter subscription amount"
            className="bg-zinc-900 rounded-xl px-4 py-3 w-full md:w-80
                   text-white placeholder:text-zinc-500 border
                   border-white/10 focus:outline-none 
                   focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-zinc-400 ml-1">
            Flat Type
          </label>
          <select
          onChange={(e) => setFlatType(e.target.value)}
          value={flatType}
            className="bg-zinc-900 rounded-xl px-4 py-3 w-full md:w-80
                         text-white border border-white/10 
                         focus:outline-none focus:ring-2
                         focus:ring-amber-500/50 appearance-none"
          >
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full md:w-80 mt-2 bg-amber-50 text-black font-semibold py-3 rounded-xl hover:bg-amber-400 transition-colors"
        >
          Update Subscription
        </button>
      </form>
    </div>
  );
};

export default Subscriptions;
