import React from 'react'

import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';


const Hero = () => {
    return (

        < section className="relative py-20 overflow-hidden" >
            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Find Your Dream
                        <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Property
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Discover luxury properties and prime real estate opportunities
                        across the Middle East with Amlak&apos;s premium platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            Explore Properties
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                        >
                            Watch Demo
                        </Button>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-1/3 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-500" />
        </section >
    )
}

export default Hero