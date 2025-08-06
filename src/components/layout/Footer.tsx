import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                                <Home className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                Amlak
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Your trusted partner in finding the perfect property. We connect buyers, sellers, and agents to make real
                            estate dreams come true.
                        </p>
                        <div className="flex space-x-3">
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/listings"
                                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                                >
                                    Browse Properties
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/add-property"
                                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                                >
                                    List Property
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                    Property Buying
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                    Property Selling
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                    Property Rental
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                    Market Analysis
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                                    Investment Consulting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Stay Updated</h3>
                        <p className="text-muted-foreground text-sm">
                            Subscribe to our newsletter for the latest property listings and market insights.
                        </p>
                        <div className="space-y-2">
                            <Input placeholder="Enter your email" className="bg-background" />
                            <Button className="w-full">Subscribe</Button>
                        </div>
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>info@amlak.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>123 Business Ave, NY 10001</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-muted-foreground">© 2024 Amlak. All rights reserved.</div>
                    <div className="flex space-x-6">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;