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

export const LoginPage = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col items-center justify-center">
        <Card className="w-[95%] md:w-[500px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Log Into Your Account</CardTitle>
            <CardDescription>
              Don't have an account?{' '}
              <Link href="/signup" className="underline hover:font-semibold">
                Sign up
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* <div className="grid gap-6">
            <Button variant="outline">
              Github
            </Button>
          </div> */}
            {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Log In</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
