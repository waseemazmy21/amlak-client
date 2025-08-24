"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
    images: File[];
    onImagesChange: (images: File[]) => void;
    maxImages?: number;
    existingImages?: string[];
}

export function ImageUpload({ images, onImagesChange, maxImages = 10, existingImages = [] }: ImageUploadProps) {
    const [previews, setPreviews] = useState<string[]>([])

    useEffect(() => {
        const objectUrls = images.map((file) => URL.createObjectURL(file))
        setPreviews(objectUrls)

        // cleanup to avoid memory leaks
        return () => objectUrls.forEach((url) => URL.revokeObjectURL(url))
    }, [images])

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newImages = [...images, ...acceptedFiles].slice(0, maxImages)
            onImagesChange(newImages)
        },
        [images, maxImages, onImagesChange],
    )

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        onImagesChange(newImages)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        maxFiles: maxImages - images.length,
        disabled: images.length >= maxImages,
    })

    return (
        <div className="space-y-4">
            {images.length < maxImages && (
                <Card>
                    <CardContent className="p-6">
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 "
                                } hover:border-primary hover:bg-secondary`}
                        >
                            <input {...getInputProps()} />
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />

                            <div>
                                <p className="text-gray-600 mb-2">Drag & drop images here, or click to select</p>
                                <p className="text-sm text-gray-400">
                                    {images.length} / {maxImages} images uploaded
                                </p>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            )}

            {(previews.length > 0) && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {existingImages.map((image, index) => (
                        <div key={`existing-${index}`} className="relative group">
                            <div className="aspect-square relative overflow-hidden rounded-lg border">
                                <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`Existing image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Existing</div>
                        </div>
                    ))}

                    {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                            <div className="aspect-square relative overflow-hidden rounded-lg border">
                                <Image src={preview || "/placeholder.svg"} alt={`Preview ${index + 1}`} fill className="object-cover" />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {images.length === 0 && existingImages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No images uploaded yet</p>
                </div>
            )}
        </div>
    )
}
