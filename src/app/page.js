"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "./_context/authContext";

export default function Home() {
  const router = useRouter();
  const { token, loading, user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {/*<p className="text-3xl">Main page</p>*/}
    </div>
  );
}
