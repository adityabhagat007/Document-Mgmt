"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { account } from "@/appwrite/app";

export default function SignupForm() {
  
  const [formObject, setFormObject] = useState({
    email: "",
    password: "",
    name: "",
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
    
    }, [])
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } =
      e.target as HTMLInputElement;
    setFormObject({
      ...formObject,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
      const data = await res.json();
      if (res.ok) {
        setFormObject({ email: "", password: "", name: "" });
        router.push("/login");
        toast({
          variant: "default",
          title: "Great ,you have created a account",
          description:"Please login to continue"
        });
      }else{
        console.log(res);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data.message,
        });
      }
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
      console.log(error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border-black w-full max-w-md p-8 space-y-6  rounded shadow-xl">
        <h2 className="text-2xl font-bold text-center">SignUp</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Name</Label>
            <Input
              name="name"
              type="text"
              value={formObject.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              name="email"
              type="email"
              value={formObject.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              value={formObject.password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account?
              </a>
            </div>
          </div>
          <div>
            <Button type="submit" variant={"default"} className="w-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
