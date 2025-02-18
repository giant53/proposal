"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Lock, Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);

  useEffect(() => {
    if (session?.user) {
      setIsRedirecting(true);
      const redirectTimer = setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [session, router]);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Redirecting screen when user is already logged in
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl shadow-rose-200/50 p-10 text-center max-w-md w-full z-10 border border-rose-100/50"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto w-28 h-28 bg-rose-100/50 rounded-full flex items-center justify-center mb-6 border-4 border-rose-200/50"
          >
            <Image src="/wlogo.svg" alt="Heart" width={80} height={80} className="p-2" />
          </motion.div>

          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
            Welcome Back, {session?.user.name?.split(' ')[0] || 'Lover'}!
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            Redirecting to your dashboard...
          </p>

          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'linear' }}
            className="h-1 bg-gradient-to-r from-rose-500 to-pink-600"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex flex-col items-center justify-center pb-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.3, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Heart className="text-rose-200 w-6 h-6" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto w-24 h-24 bg-rose-100/50 rounded-full flex items-center justify-center border-4 border-rose-200/50"
        >
          <Image src="/wlogo.svg" alt="Heart" width={80} height={80} className="p-2" />
        </motion.div>
        <h2 className="mt-6 text-center text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          New to myproposal.love?{" "}
          <Link 
            href="/register" 
            className="text-rose-600 hover:text-rose-500 font-semibold underline-offset-4 hover:underline transition-all"
          >
            Create an account
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-white/90 backdrop-blur-md px-6 py-10 shadow-2xl shadow-rose-200/50 sm:rounded-2xl border border-rose-100/50 space-y-6">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full border-rose-200 hover:bg-rose-50 text-rose-600 hover:text-rose-700 group transition-all duration-300 ease-in-out transform hover:scale-[1.02] border-2"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-rose-100" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or sign in with email
              </span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleEmailLogin}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium transition-colors duration-300 ${
                  focused === 'email' ? 'text-rose-600' : 'text-gray-700'
                }`}
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`block w-full rounded-lg border transition-all duration-300 ${
                    focused === 'email' 
                      ? 'border-rose-500 ring-2 ring-rose-200' 
                      : 'border-rose-200 focus:border-rose-500'
                  }`}
                />
                <Mail className={`absolute right-3 top-2.5 h-5 w-5 transition-colors duration-300 ${
                  focused === 'email' ? 'text-rose-500' : 'text-gray-400'
                }`} />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium transition-colors duration-300 ${
                  focused === 'password' ? 'text-rose-600' : 'text-gray-700'
                }`}
              >
                Password
              </label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`block w-full rounded-lg border transition-all duration-300 ${
                    focused === 'password' 
                      ? 'border-rose-500 ring-2 ring-rose-200' 
                      : 'border-rose-200 focus:border-rose-500'
                  }`}
                />
                <Lock className={`absolute right-3 top-2.5 h-5 w-5 transition-colors duration-300 ${
                  focused === 'password' ? 'text-rose-500' : 'text-gray-400'
                }`} />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="text-rose-600 hover:text-rose-500 font-semibold underline-offset-4 hover:underline transition-all"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white group transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                disabled={loading}
              >
                Sign in
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
