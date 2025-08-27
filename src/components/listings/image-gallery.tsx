"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openFullscreen = (index: number) => {
    setSelectedImage(index)
  }

  const closeFullscreen = () => {
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
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative cursor-pointer overflow-hidden rounded-lg ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
            onClick={() => openFullscreen(index)}
          >
            <Image
              src={image || `/placeholder.svg?height=300&width=400&query=property-${index}`}
              alt={`${title} - Image ${index + 1}`}
              width={400}
              height={300}
              className={`object-cover w-full transition-transform hover:scale-105 ${
                index === 0 ? "h-64 md:h-full" : "h-48"
              }`}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeFullscreen}>
        <DialogContent className="max-w-4xl w-full h-full max-h-[90vh] p-0">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeFullscreen}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={prevImage}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={nextImage}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              <Image
                src={images[selectedImage] || `/placeholder.svg?height=600&width=800&query=property-fullscreen`}
                alt={`${title} - Image ${selectedImage + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
