import React from 'react'

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-600">
            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Find Your Perfect Property?
                </h2>
                <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of satisfied customers and discover your dream home
                    today
                </p>
                <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                    Start Your Search
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </section>
    )
}

export default CTA