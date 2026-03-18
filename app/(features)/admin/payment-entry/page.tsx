"use client";
import React, { useState } from "react";

const RecordPayment = () => {
  // Separate individual states
  const [flatNo, setFlatNo] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const stored = localStorage.getItem("user");
      const token = stored ? JSON.parse(stored).token : null;

      // Constructing the payload from individual states
      const payload = {
        flat_no: flatNo,
        amount: amount,
        month: month,
        mode_of_payment: modeOfPayment
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/record-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(`✅ Payment recorded for Flat ${flatNo}`);
        // Resetting all individual states
        setFlatNo("");
        setAmount("");
        setMonth("");
        setModeOfPayment("upi");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to record payment");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 m-4 border border-white/10 bg-zinc-950 rounded-2xl p-8 text-white min-h-[calc(100vh-2rem)] flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold tracking-tight">Record Payment</h1>
        <p className="text-zinc-500">Log a manual payment for a specific flat.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Flat Number State */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">Flat Number</label>
          <input
            required
            type="text"
            placeholder="e.g. A-101"
            value={flatNo}
            onChange={(e) => setFlatNo(e.target.value)}
            className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>

        {/* Amount State */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">Amount (₹)</label>
          <input
            required
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>

        {/* Month State */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">Billing Month</label>
          <select
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled className="text-zinc-500">Select Month</option>
            {months.map((m) => (
              <option key={m} value={m} className="bg-zinc-900 text-white">{m}</option>
            ))}
          </select>
        </div>

        {/* Payment Mode State */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">Payment Mode</label>
          <div className="flex gap-2 p-1 bg-zinc-900 border border-white/10 rounded-xl">
            {['cash', 'upi', 'bank_transfer'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setModeOfPayment(mode)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                  modeOfPayment === mode 
                  ? "bg-amber-500 text-zinc-950 shadow-inner" 
                  : "hover:bg-white/5 text-zinc-400"
                }`}
              >
                {mode.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-fit px-12 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 disabled:opacity-50 transition-all shadow-xl active:scale-95"
          >
            {isSubmitting ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordPayment;