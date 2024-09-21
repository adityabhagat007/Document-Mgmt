"use client";

import { account } from "@/appwrite/app";
import { ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Error from "next/error";


export default function SignupForm() {
  const [formObject, setFormObject] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { toast } = useToast();
  const router = useRouter();

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
      await account.create(
        ID.unique(),
        formObject.email,
        formObject.password,
        formObject.name
      );
      setFormObject({ email: "", password: "", name: "" });
      router.push("/login");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
      } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-xl">
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
