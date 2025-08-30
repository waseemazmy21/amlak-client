import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Property } from "@/types/property"
import { Bed, Bath, Square, MapPin } from "lucide-react"
import { getStatusColor } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }


  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 card-enhanced border-border border py-0">
      <div className="relative">
        <Link href={`/listings/${property._id}`}>
          <div className="relative h-48 md:h-64 w-full overflow-hidden">
            {
              property.images.length > 0 ?

                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                /> :
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                  no image
                </div>
            }
          </div>
        </Link>

        <Badge className={`absolute top-3 left-3 ${getStatusColor(property.status)} border text-xs font-medium bg-white/20`}>
          {property.status.replace("-", " ").toUpperCase()}
        </Badge>

        {/* <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 backdrop-blur-sm border border-white/20"
        >
          <Heart className="h-4 w-4" />
        </Button> */}
      </div>

      <CardContent className="p-4 md:p-6">
        <Link href={`/listings/${property._id}`}>
          <div className="space-y-3 md:space-y-4">
            <div>
              <h3 className="font-semibold text-base md:text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">
                  {property.location.address}, {property.location.city}
                </span>
              </div>
            </div>

            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {formatPrice(property.price)}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center bg-muted/50 rounded-full px-2 py-1">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center bg-muted/50 rounded-full px-2 py-1">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center bg-muted/50 rounded-full px-2 py-1">
                  <Square className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">{property.area.toLocaleString()}</span>
                  <span className="sm:hidden">{property.area}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
