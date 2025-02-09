"use client";

import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/20 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <span className="hidden md:block">myproposal.love</span>
            <Image src="/wlogo.svg" alt="Logo" width={40} height={40} />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/about"
              className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-1"
            >
              {/* <HelpCircle className="w-4 h-4 mr-1" /> */}
              About
            </Link>
            <Link
              href="/features"
              className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-1"
            >
              {/* <StarIcon className="w-4 h-4 mr-1" /> */}
              Features
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <Avatar className="w-8 h-8 border-2 border-rose-100">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User Profile"}
                      />
                      <AvatarFallback>
                        <User className="w-5 h-5 text-rose-500" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {session.user.name || "My Account"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="cursor-pointer flex items-center"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="cursor-pointer flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => signOut({ callbackUrl: "/" })}
                    className="cursor-pointer flex items-center text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link href="/login" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
