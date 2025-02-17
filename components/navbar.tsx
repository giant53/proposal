"use client";

import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Settings,
  User,
  Menu,
  Home,
  Star,
  HelpCircle,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { motion } from "framer-motion";

export function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileNavItems = [
    { 
      href: "/", 
      label: "Home", 
      icon: Home,
      className: "text-rose-600 hover:bg-rose-50"
    },
    { 
      href: "/about", 
      label: "About", 
      icon: HelpCircle,
      className: "text-gray-700 hover:bg-gray-50"
    },
    { 
      href: "/features", 
      label: "Features", 
      icon: Star,
      className: "text-amber-600 hover:bg-amber-50"
    },
  ];

  return (
    <>
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

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                href="/about"
                className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-1"
              >
                About
              </Link>
              <Link
                href="/features"
                className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-1"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-1"
              >
                Pricing
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

              {/* Mobile Menu Trigger */}
              <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="w-6 h-6 text-rose-600" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-[90vh] bg-white/95 backdrop-blur-xl">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-xl font-bold text-rose-600">
                          <Image src="/wlogo.svg" alt="Logo" width={40} height={40} />
                          <span>myproposal.love</span>
                        </div>
                      </SheetTitle>
                    </SheetHeader>

                    {/* Mobile Navigation Items */}
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                          opacity: 1,
                          transition: { 
                            delayChildren: 0.2,
                            staggerChildren: 0.1 
                          }
                        }
                      }}
                      className="space-y-2"
                    >
                      {mobileNavItems.map((item) => (
                        <motion.div
                          key={item.href}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                              flex items-center space-x-3 
                              w-full p-3 rounded-xl 
                              transition-all duration-300 
                              ${item.className}
                            `}
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="text-base font-medium">{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}

                      {/* Mobile User Actions */}
                      {session?.user ? (
                        <>
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 }
                            }}
                            className="border-t pt-4 mt-4"
                          >
                            <div className="flex items-center space-x-3 mb-4">
                              <Avatar className="w-10 h-10 border-2 border-rose-100">
                                <AvatarImage
                                  src={session.user.image || undefined}
                                  alt={session.user.name || "User Profile"}
                                />
                                <AvatarFallback>
                                  <User className="w-6 h-6 text-rose-500" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-base font-semibold text-gray-800">
                                  {session.user.name || "My Account"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {session.user.email}
                                </p>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Link
                                href="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-3 w-full p-3 rounded-xl text-gray-700 hover:bg-gray-50"
                              >
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="text-base font-medium">Dashboard</span>
                              </Link>
                              <Link
                                href="/settings"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-3 w-full p-3 rounded-xl text-gray-700 hover:bg-gray-50"
                              >
                                <Settings className="w-5 h-5" />
                                <span className="text-base font-medium">Settings</span>
                              </Link>
                              <Button
                                variant="destructive"
                                className="w-full mt-4"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  signOut({ callbackUrl: "/" });
                                }}
                              >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                              </Button>
                            </div>
                          </motion.div>
                        </>
                      ) : (
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          className="mt-4"
                        >
                          <Button 
                            asChild 
                            variant="default" 
                            className="w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Link href="/login" className="flex items-center justify-center">
                              <LogIn className="mr-2 h-4 w-4" />
                              Sign In
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
