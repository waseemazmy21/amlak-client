"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Home, Plus, Trash2, ExternalLink } from "lucide-react"
import { useState } from "react"
import { formatPrice, formatDate, handleError } from "@/lib/utils"
import { useMutation, useQuery } from "@tanstack/react-query"
import useAuth from "@/hooks/useAuth"
import { deletePropertyById, getPropertyByUserId } from "@/service/property"
import Error from "@/components/global/error"
import Loading from "../global/loading"
import { PropertyPagination } from "../listings/property-pagination"
import { toast } from "sonner"


export function ProfileListings() {
    const { user } = useAuth()
    const [currentPage, setCurrentPage] = useState(1)

    const { data, isLoading, error } = useQuery({
        queryKey: ['userProperties', currentPage],
        queryFn: () => getPropertyByUserId(user!._id, currentPage)
    })

    const { mutateAsync: deleteProperty, isPending: deletePropertyPending } = useMutation({
        mutationFn: deletePropertyById,
        onSuccess: () => {
            toast.success("Property deleted successfully")
        },
        onError: (error) => {
            toast.error(handleError(error))
        }
    })

    const handleDelete = (propertyId: string) => {
        deleteProperty(propertyId)
    }

    if (!data || error) {
        return <Error message={handleError(error)} />
    }

    if (isLoading || deletePropertyPending) {
        return <Loading />
    }

    if (!user) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        My Property Listings
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">{data.properties.length} properties</Badge>
                        <Button size="sm" asChild>
                            <Link href="/add-property">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Property
                            </Link>
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {data.properties.length > 0 ? (
                    <div className="space-y-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Property</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Listed Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.properties.map((property) => (
                                    <TableRow key={property._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-12 w-16 rounded-md overflow-hidden bg-muted">
                                                    {property.images.length > 0 ? <Image
                                                        src={property.images[0]}
                                                        alt={property.title}
                                                        className="h-full w-full object-cover"
                                                        width={48}
                                                        height={48}
                                                    /> :
                                                        <span className="h-full w-full object-cover flex items-center justify-center text-xs text-muted-foreground">No Image</span>}

                                                </div>
                                                <div>
                                                    <div className="font-medium">{property.title}</div>
                                                    <div className="text-sm text-muted-foreground">{property.location.address} - {property.location.city}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="capitalize">
                                                {property.propertyType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{formatPrice(property.price)}</TableCell>
                                        <TableCell className="text-muted-foreground">{formatDate(property.createdAt)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-end gap-2">
                                                {/* View in Public Listings */}
                                                <Button size="sm" variant="outline" asChild className="h-8 px-2 bg-transparent">
                                                    <Link href={`/listings/${property._id}`}>
                                                        <ExternalLink className="h-3 w-3" />
                                                        <span className="sr-only">View in listings</span>
                                                    </Link>
                                                </Button>

                                                {/* Delete Property */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 px-2 text-destructive hover:text-destructive bg-transparent"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            <span className="sr-only">Delete property</span>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Property</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete &ldquo;{property.title}&rdquo;? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(property._id)}
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <PropertyPagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={setCurrentPage} totalItems={data.totalItems} itemsPerPage={data.limit} />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Home className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="font-semibold mb-2">No properties listed yet</h3>
                        <p className="text-muted-foreground mb-4">Start by listing your first property to reach potential buyers</p>
                        <Button asChild>
                            <Link href="/add-property">
                                <Plus className="h-4 w-4 mr-2" />
                                List Your First Property
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
