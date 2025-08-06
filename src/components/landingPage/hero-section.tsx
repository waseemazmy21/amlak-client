import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Home, Users, Award, MapPin } from "lucide-react"

const stats = [
  { number: "50K+", label: "Properties Listed", icon: Home },
  { number: "25K+", label: "Happy Customers", icon: Users },
  { number: "1K+", label: "Expert Agents", icon: Award },
  { number: "100+", label: "Cities Covered", icon: MapPin },
]

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-bg py-12 md:py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/20" />
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-fade-in">
            <div className="space-y-4 md:space-y-6">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium mx-auto lg:mx-0 w-fit bg-primary/10 text-primary border-primary/20"
              >
                🏆 #1 Real Estate Platform
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Find Your
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                  Dream Home
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                Discover extraordinary properties with our AI-powered platform. Connect with verified agents and make
                your dream home a reality.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                asChild
                className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl"
              >
                <Link href="/listings">
                  <Search className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Explore Properties
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-primary/20 hover:bg-primary/5 bg-transparent"
              >
                <Link href="/add-property">List Your Property</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6 md:pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors border border-primary/20">
                      <stat.icon className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden md:block relative animate-slide-in order-first lg:order-last">
            <div className="relative z-10 max-w-md mx-auto lg:max-w-none">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=600&fit=crop"
                alt="Beautiful modern house"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl w-full h-auto border border-primary/10"
                priority
              />
            </div>
            {/* Decorative backgrounds - hidden on mobile for cleaner look */}
            <div className="hidden lg:block absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl -z-10"></div>
            <div className="hidden lg:block absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-tr from-primary/5 to-transparent rounded-2xl -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection