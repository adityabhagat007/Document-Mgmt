"use client";

import { account } from "@/appwrite/app";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage: React.FC = () => {
  const [formObject, setFormObject] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
  const checkSession = async () => {
    try {
      const session = await account.get();
      if (session) {
        router.push("/user");
      }
    } catch (e: unknown) {
      console.log("No active session found");
    }
  };

  checkSession();
  
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormObject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await account.createEmailPasswordSession(
        formObject.email,
        formObject.password
      );
      console.log(res, "login");
      if (res) {
        toast({
          title: "Welcome back!",
          description: "Logged in successfully",
        });
        router.push("/user");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: e.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unknown error occurred",
        });
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border-black w-full max-w-md p-8 space-y-6  rounded shadow-xl">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              name="email"
              value={formObject.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={formObject.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <Button type="submit" variant={"default"} className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
