"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Menu, Home, Search, Plus, User, LogOut, Settings } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useLogout } from "@/hooks/useLogout"
import Loading from "../global/loading"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { user, loading } = useAuth()
  const { logout, error, isPending } = useLogout()


  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
    setOpen(false)
  }

  const closeMenu = () => setOpen(false)

  return (
    <>
      {isPending && <Loading />}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden h-9 w-9 p-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <DialogTitle className="hidden">Mobile Navigation Menu</DialogTitle>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Home className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Amlak
                </span>
              </Link>
            </div>

            {/* User Section */}
            {!loading && user && (
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={"/placeholder.svg"} alt={user.fullName} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                      {user.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex-1 p-6">
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={closeMenu}
                >
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/listings"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={closeMenu}
                >
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <span>Browse Properties</span>
                </Link>
                <Link
                  href="/add-property"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={closeMenu}
                >
                  <Plus className="h-5 w-5 text-muted-foreground" />
                  <span>List Property</span>
                </Link>

                {user && (
                  <>
                    <Separator className="my-4" />
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={closeMenu}
                    >
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/profile?tab=settings"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={closeMenu}
                    >
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      <span>Settings</span>
                    </Link>
                  </>
                )}
              </nav>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border">
              {user ? (
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/login" onClick={closeMenu}>
                      Log In
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/register" onClick={closeMenu}>
                      Create Account
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
