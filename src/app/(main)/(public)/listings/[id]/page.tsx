"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FullscreenImageGallery } from "@/components/property-page/image-gallery"
import { useQuery } from "@tanstack/react-query"
import { getPropertyById } from "@/service/property"
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageCircle,

} from "lucide-react"
import Error from "@/components/global/error"
import Loading from "@/components/global/loading"
import { getStatusColor, formatPrice } from "@/lib/utils"
import { featureIcons } from '@/lib/data'

export default function PropertyDetailsPage() {
  const params = useParams()
  const id = params.id as string

  const {
    data: property,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (error || !property) {
    return (
      <Error message={error instanceof Error ? error.message : "The property you're looking for doesn't exist or has been removed."}
        retry={refetch} />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/listings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Link>
        </Button>

        {/* Property Images */}
        <div className="mb-8">
          <FullscreenImageGallery images={property.images} title={property.title} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${getStatusColor(property.status)} border`}>
                      {property.status.replace("-", " ").toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Listed {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {property.location.address}, {property.location.city}, {property.location.state}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex items-center gap-6 text-lg">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-semibold">{property.bedrooms}</span>
                  <span className="text-muted-foreground ml-1">beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-semibold">{property.bathrooms}</span>
                  <span className="text-muted-foreground ml-1">baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-semibold">{property.area.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">m<sup>2</sup></span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-semibold">{property.yearBuilt}</span>
                  <span className="text-muted-foreground ml-1">built</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Features & Amenities</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => {
                  const IconComponent = featureIcons[feature] || Square
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <IconComponent className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Built</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-medium">{property.area.toLocaleString()} m<sup>2</sup></span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bedrooms</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bathrooms</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={`${getStatusColor(property.status)} border text-xs`}>
                      {property.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">{property.user?.fullName.charAt(0).toUpperCase()}</span>
                  </div>
                  <h3 className="font-semibold">{property.user?.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{property.user?.bio}</p>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">
                    <a href={`tel:${property.user?.phone}`} className="w-full flex items-center justify-center" >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <a href={`mailto:${property.user?.email}`} className="w-full flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </div>
  )
}
