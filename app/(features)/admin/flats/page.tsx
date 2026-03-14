"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/DataTable";
import { FlatData } from "@/types";

export default function Flats() {
  const router = useRouter();
  const [flats, setFlats] = useState<FlatData[]>([]);

  // We still need one useEffect to handle the initial mount (browser-only code)
  useEffect(() => {
    const initializePage = async () => {
      const storedUser = localStorage.getItem("user");
      
      // 1. Auth Guard
      if (!storedUser) {
        return router.replace("/sign-in");
      }

      const { token } = JSON.parse(storedUser);

      // 2. Fetch Data
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/flats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setFlats(data?.data || []);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    initializePage();
  }, [router]);

  const flatColumns = [
    { header: "Flat No", accessor: "flat_no" },
    { header: "Owner", accessor: "full_name" },
    { header: "Type", accessor: "flat_type" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row: FlatData) => (
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs rounded-lg bg-blue-600">Edit</button>
          <button className="px-3 py-1 text-xs rounded-lg bg-red-600">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 m-4 border rounded-2xl border-white/10 bg-zinc-950 flex flex-col gap-4 p-6 text-white">
      <h1 className="text-4xl font-semibold mb-6 tracking-tight">Flats</h1>
      <input
        placeholder="Search flats..."
        className="bg-zinc-900 rounded-xl px-4 py-2 w-full text-white border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <DataTable columns={flatColumns} data={flats} />
    </div>
  );
}