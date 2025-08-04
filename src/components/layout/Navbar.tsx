"use client";

import { useState } from "react";
import { Menu, User, Bell, Home, Users, Phone, Info, icons } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "#", icon: <Home className="h-4 w-4" /> },
  { name: "About", href: "#", icon: <Info className="h-4 w-4" /> },
  { name: "Contact", href: "#", icon: <Phone className="h-4 w-4" /> },
  { name: "Agents", href: "#", icon: <Users className="h-4 w-4" /> },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="p-2  bg-indigo-600 rounded-xl shadow-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span
                className="text-2xl font-bold text-indigo-600 "
                style={{ fontFamily: "serif" }}
              >
                Amlak
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {
                links.map(link =>
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all origin-center duration-300 group-hover:w-full"></span>
                  </Link>)
              }
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user && (
              <Link href="/profile" className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-6 w-6 text-gray-600" />
              </Link>
            )}
            {user ?
              <>
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300" />
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-pulse">
                    3
                  </Badge>
                </div>

                < div className="flex items-center space-x-2" >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                </div>
              </>


              :
              (< Link
                href='/auth/login'
                className={cn(buttonVariants({ variant: "destructive", size: "lg" }),
                  "bg-gradient-to-r bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300")}

              >
                login
              </Link>)}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg m-2 rounded-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    {link.icon}
                    <span>{link.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav >
  );
}
