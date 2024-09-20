import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function SignupForm() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center">SignUp</h2>
      <form className="space-y-6">
      <div>
          <Label htmlFor="email">Name</Label>
          <Input />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" />
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