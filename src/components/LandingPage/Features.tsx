import React from 'react'

import {
    Search,
    MapPin,
    Shield,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: Search,
        title: "Smart Search",
        description:
            "Find your perfect property with our advanced filtering system",
    },
    {
        icon: MapPin,
        title: "Prime Locations",
        description: "Discover properties in the most sought-after neighborhoods",
    },
    {
        icon: Shield,
        title: "Secure Transactions",
        description: "Your investments are protected with our verified listings",
    },
];

const Features = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Why Choose <span className="text-blue-600">Amlak</span>?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the future of real estate with our cutting-edge
                        platform designed for modern property seekers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <CardContent className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features