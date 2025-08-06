import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Home, TrendingUp, Shield } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "AI-powered search with advanced filters to find your perfect property instantly.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Home,
    title: "Premium Listings",
    description: "Curated collection of verified properties from trusted agents and sellers.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Market Analytics",
    description: "Real-time market insights and price predictions powered by data science.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Bank-level security with encrypted transactions and verified identities.",
    color: "from-orange-500 to-red-500",
  },
]

const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Features
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">Why Choose Amlak?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of real estate with our cutting-edge platform designed for modern property seekers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-3xl transition-all duration-300 border border-border shadow  "
            >
              <CardContent className="p-6 md:p-8 text-center">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection