"use client";
import ProfileSidebar from '@/components/profile/profile-sidebar';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/service/auth';
import Loading from '@/components/global/loading';
import Error from '@/components/global/error';
import { User } from '@/lib/types';
import { handleError } from '@/lib/utils';
import ProfileOverview from '@/components/profile/profile-overview';

export default function ProfilePage() {
    const { data: user, isLoading, error, isError } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await getUser()
            return res.data.data.user as User
        }
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <Error
            message={handleError(error)}
            retry={() => window.location.reload()}
        />
    }

    if (!user) {
        return <Error
            message={"User NOt Found!"}
        />
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                    <p className="text-muted-foreground">Manage your account settings and view your properties</p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <ProfileSidebar user={user} />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <ProfileOverview user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}