"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Mail, Lock, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<'name' | 'email' | 'password' | 'confirmPassword' | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Basic password strength validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Sign in the user after successful registration
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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
          Create your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="text-rose-600 hover:text-rose-500 font-semibold underline-offset-4 hover:underline transition-all"
          >
            Sign in
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-white/90 backdrop-blur-md px-6 py-10 shadow-2xl shadow-rose-200/50 sm:rounded-2xl border border-rose-100/50">
          <form className="space-y-6" onSubmit={handleRegister}>
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
                htmlFor="name" 
                className={`block text-sm font-medium transition-colors duration-300 ${
                  focused === 'name' ? 'text-rose-600' : 'text-gray-700'
                }`}
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`block w-full rounded-lg border transition-all duration-300 ${
                    focused === 'name' 
                      ? 'border-rose-500 ring-2 ring-rose-200' 
                      : 'border-rose-200 focus:border-rose-500'
                  }`}
                />
                <User className={`absolute right-3 top-2.5 h-5 w-5 transition-colors duration-300 ${
                  focused === 'name' ? 'text-rose-500' : 'text-gray-400'
                }`} />
              </div>
            </div>

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

            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium transition-colors duration-300 ${
                  focused === 'confirmPassword' ? 'text-rose-600' : 'text-gray-700'
                }`}
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className={`block w-full rounded-lg border transition-all duration-300 ${
                    focused === 'confirmPassword' 
                      ? 'border-rose-500 ring-2 ring-rose-200' 
                      : 'border-rose-200 focus:border-rose-500'
                  }`}
                />
                <Lock className={`absolute right-3 top-2.5 h-5 w-5 transition-colors duration-300 ${
                  focused === 'confirmPassword' ? 'text-rose-500' : 'text-gray-400'
                }`} />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white group transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                disabled={loading}
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-rose-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
