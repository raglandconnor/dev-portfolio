import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Navbar from "../components/Navbar";
import LoginForm from "./components/LoginForm";

export default async function LoginPage() {
  return (
    <div className="bg-black">
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col items-center justify-center">
        <Card className="w-[95%] md:w-[500px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Log Into Your Account</CardTitle>
            <CardDescription>
              Don&apos;t have an account?{" "}
              <Link href="/signup/" className="underline hover:font-semibold">
                Sign up
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <LoginForm />
          </CardContent>
          <CardFooter>
            {/* Change onClick to form submission */}
            <Button className="w-full" type="submit" form="login-form">
              Log In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
