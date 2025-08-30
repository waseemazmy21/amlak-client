import Link from "next/link"
import { Button } from "@/components/ui/button"

const CTASection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-primary via-primary to-primary/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/85" />
      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary-foreground">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Join thousands of satisfied customers who found their dream properties through our platform. Start your
            journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="default"
              asChild
              className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white/90 hover:bg-white text-gray-900"
            >
              <Link href="/listings">Start Searching Now</Link>
            </Button>
            <Button
              size="lg"
              variant="default"
              asChild
              className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white/90 hover:bg-white text-gray-900"
            >
              <Link href="/add-property">List Your Property</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection