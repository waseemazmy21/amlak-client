"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize2, Grid3X3 } from "lucide-react"

interface FullscreenImageGalleryProps {
  images: string[]
  title: string
}

export function FullscreenImageGallery({ images, title }: FullscreenImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const openImage = (index: number) => {
    setSelectedImage(index)
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  if (!images.length) {
    return (
      <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
        <div className="text-center">
          <Grid3X3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No images available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={images[0] || `/placeholder.svg?height=400&width=600&query=property-main`}
              alt={`${title} - Main Image`}
              fill
              className="object-cover cursor-pointer"
              onClick={() => openImage(0)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={openFullscreen}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={index + 1}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
                onClick={() => openImage(index + 1)}
              >
                <Image
                  src={image || `/placeholder.svg?height=200&width=200&query=property-${index + 1}`}
                  alt={`${title} - Image ${index + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold">+{images.length - 5}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={closeFullscreen}>
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeFullscreen}
            >
              <X className="h-6 w-6" />
            </Button>

            {selectedImage !== null && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <Image
                  src={images[selectedImage] || `/placeholder.svg?height=800&width=1200&query=property-fullscreen`}
                  alt={`${title} - Image ${selectedImage + 1}`}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                  {selectedImage + 1} / {images.length}
                </div>

                {/* Thumbnail Navigation */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                  <div className="flex gap-2 max-w-md overflow-x-auto">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative w-16 h-16 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <Image
                          src={image || `/placeholder.svg?height=64&width=64&query=thumb-${index}`}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
