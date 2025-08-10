"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "../global/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Plus, Search, User, LogOut, Settings } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import useAuth from "@/hooks/useAuth"
import { useLogout } from "@/hooks/useLogout"

const Header = () => {
  const { user, loading } = useAuth()
  const { logout, error, isPending } = useLogout()

  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu and Logo Container */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu - Always visible on small screens */}
            <div className="md:hidden">
              <MobileMenu />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Amlak
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/listings" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Listings
            </Link>
            <Link
              href="/add-property"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Add Property
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Desktop Search Button */}
            <Button variant="ghost" size="sm" asChild className="hidden lg:flex hover:bg-primary/10 hover:text-primary">
              <Link href="/listings">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>

            {loading ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse shimmer" />
            ) : user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  size="sm"
                  asChild
                  className="hidden lg:flex bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm"
                >
                  <Link href="/add-property">
                    <Plus className="h-4 w-4 mr-2" />
                    List Property
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-primary/10">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarImage src={"/placeholder.svg"} alt={user.fullName} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                          {user.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-card/95 backdrop-blur-sm border-border/50"
                    align="end"
                    forceMount
                  >
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.fullName}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile?tab=settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  size="sm"
                  asChild
                  className="hidden lg:flex bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm"
                >
                  <Link href="/add-property">
                    <Plus className="h-4 w-4 mr-2" />
                    List Property
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;