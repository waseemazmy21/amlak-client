import React from 'react'

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
    {
        name: "Ahmed Al-Rashid",
        role: "Property Investor",
        content:
            "Amlak helped me find the perfect investment property in Dubai. Their service is exceptional!",
        rating: 5,
    },
    {
        name: "Sarah Mohammed",
        role: "First-time Buyer",
        content:
            "The team at Amlak made buying my first home stress-free and enjoyable. Highly recommended!",
        rating: 5,
    },
    {
        name: "Omar Hassan",
        role: "Real Estate Developer",
        content:
            "Professional, reliable, and results-driven. Amlak is my go-to platform for all property needs.",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        What Our Clients Say
                    </h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Join thousands of satisfied customers who found their perfect
                        properties with Amlak
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <CardContent className="p-8">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 text-yellow-400 fill-current"
                                        />
                                    ))}
                                </div>
                                <p className="text-white mb-6 leading-relaxed italic">
                                    {testimonial.content}
                                </p>
                                <div>
                                    <div className="font-semibold text-white">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-blue-200 text-sm">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials