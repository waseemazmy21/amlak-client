import React from 'react'
import Link from 'next/link'
import { Home, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
    // Links data
    const quickLinks = [
        { label: 'Properties', href: '/properties' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Agents', href: '/agents' },
    ];
    const servicesLinks = [
        { label: 'Buy Property', href: '/buy' },
        { label: 'Rent Property', href: '/rent' },
        { label: 'Property Management', href: '/management' },
        { label: 'Investment', href: '/investment' },
    ];
    const contactInfo = [
        { icon: <Mail className="inline mr-2 h-5 w-5" />, text: 'info@amlak.com' },
        { icon: <Phone className="inline mr-2 h-5 w-5" />, text: '+20 155 711 9734' },
        { icon: <MapPin className="inline mr-2 h-5 w-5" />, text: 'Cairo, Egypt' },
    ];

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Home className="h-8 w-8 text-yellow-400" />
                            <span className="text-2xl font-bold">Amlak</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Your trusted partner in finding premium real estate properties
                            across the Middle East.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            {quickLinks.map(link => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-gray-400">
                            {servicesLinks.map(link => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-gray-400">
                            {contactInfo.map((item, idx) => (
                                <li key={idx} className="flex items-center">
                                    {item.icon}
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Amlak Properties. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer