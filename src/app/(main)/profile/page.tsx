"use client";
import ProtectedRoute from '@/components/ProtectedRoute';
import useAuth from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <div className="flex justify-center items-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div><strong>Name:</strong> {user?.fullName}</div>
                            <div><strong>Email:</strong> {user?.email}</div>
                            {/* Add more fields as needed */}
                            <Link href="/profile/update">
                                <Button className="mt-4 w-full">Edit Profile</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    );
}