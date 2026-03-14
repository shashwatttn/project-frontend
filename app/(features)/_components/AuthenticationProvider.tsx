"use client";

import React, { useEffect, useState } from "react";
import MySidebar from "@/components/MySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {

//   const router = useRouter();
  
  const [user,setUser] = useState(null);
  debugger;
  const [parsedUser, setParsedUser] = useState(null); 
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userfromStorage  = localStorage.getItem("user");
    setUser(userfromStorage);
    console.log("User from localStorage:", parsedUser);

    const token = parsedUser?.token;
    // console.log("token :", token);
    // const userRole = parsedUser?.user?.role;
    // console.log("not of user==>", !parsedUser);
    // console.log("not of token==>", !token);
    // console.log("userRole==>", userRole);
    // console.log("typeof userRole==>", typeof userRole);
    setParsedUser(parsedUser);
    setToken(token);
    // setUserRole(userRole);
  }, []);

  if (!parsedUser) {
    // router.replace("/sign-in");
    window.location.href = "/sign-in";
    //   return
  }

  if (parsedUser?.user?.role === "admin") {
    window.location.href = "/admin/dashboard";
//     router.replace("/admin/dashboard");
//     // return
  }

  if (parsedUser?.user?.role === "resident") {
    window.location.href = "/resident/dashboard";
    // return;
  }

  //   useEffect(() => {
  //     const user = localStorage.getItem("user");
  //     const parsedUser = JSON.parse(user);
  //     console.log("User from localStorage:",typeof user);

  //     const token = parsedUser?.user?.token;
  //     const userRole = parsedUser?.user?.role;

  //     if(!parsedUser || !token) {
  //         router.replace("/sign-in");
  //     }

  //     if (userRole === "admin") {
  //       router.replace("/admin/dashboard");
  //     }

  //     if (userRole === "resident") {
  //       router.replace("/resident/dashboard");
  //     }

  //     setRole(userRole);
  //     setLoading(false);
  //   }, [router]);

  //   if (loading) return null;

  return (
    <SidebarProvider>
      <div className="flex">
        <MySidebar role={parsedUser?.user?.role} />
        <div className="w-full">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default AuthenticationProvider;
