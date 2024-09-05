'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      });

      const res = await fetch(
        `https://dev-portfolio-v5tg.onrender.com/signup/?${queryParams.toString()}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (Array.isArray(data.detail)) {
          const errorMessages = data.detail.map((err) => err.msg).join(', ');
          setError(errorMessages);
        } else {
          setError(data.detail || 'Something went wrong');
        }
        setLoading(false);
        return;
      }

      console.log('Signed up successfully');
    } catch (error) {
      setError('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="bg-black">
      <Navbar />
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
            {error && <p className="text-red-500">{error}</p>}{' '}
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
