"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/constants";

export default function SignUpForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = "First name is required";
    if (!user.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Email is invalid";
    if (!user.password) newErrors.password = "Password is required";
    else if (user.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        if (Array.isArray(data.detail)) {
          const errorMessages = data.detail.reduce((acc, err) => {
            acc[err.loc[1]] = err.msg;
            return acc;
          }, {});
          setErrors(errorMessages);
        } else {
          setErrors({ general: data.detail || "Something went wrong" });
        }
        return;
      }

      setUser({ firstName: "", lastName: "", email: "", password: "" });
      setAccountSuccess(true);
    } catch (error) {
      setErrors({ general: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black">
      {!accountSuccess ? (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
          <Card className="w-[95%] md:w-[500px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign Up for an Account</CardTitle>
              {/* <CardDescription>
              Already have an account?{' '}
              <Link href="/login" className="underline hover:font-semibold">
                Log In
              </Link>
            </CardDescription> */}
            </CardHeader>
            <CardContent className="grid gap-4">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </CardContent>

            <CardFooter>
              {errors && (
                <p className="text-red-500 text-sm">
                  {errors.general ||
                    errors.firstName ||
                    errors.lastName ||
                    errors.email ||
                    errors.password}
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-screen pt-24">
          <p className="text-2xl">Account Created Successfully</p>
          <p className="mt-2">Expect to recieve an email on release</p>
          <Link
            href="/"
            className="underline hover:font-semibold text-muted-foreground text-sm mt-8"
          >
            Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
