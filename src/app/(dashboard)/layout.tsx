"use client";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "../components/sidebar";
import { useEffect } from "react";
import { account } from "@/appwrite/app";
import { useRouter } from "next/navigation";


const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e: unknown) {
        router.push("/login");
      }
    };

    checkSession();
  }, []);

  return (
    <div className="flex h-screen">
      <Toaster />
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex-1 w-3/4 mt-7 ml-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
