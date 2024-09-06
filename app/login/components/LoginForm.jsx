"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS } from "@/lib/constants";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </form>
  );
}
