"use client";
import ProfileSidebar from '@/components/profile/profile-sidebar';
import Loading from '@/components/global/loading';
import Error from '@/components/global/error';
import { handleError } from '@/lib/utils';
import ProfileOverview from '@/components/profile/profile-overview';
import useAuth from '@/hooks/useAuth';
import { ProfileTabs } from '@/constants/profile';
import { useState } from 'react';
import { ProfileListings } from '@/components/profile/profile-listings';

export default function ProfilePage() {
    const { user, loading, error } = useAuth()
    const [tab, setTab] = useState<ProfileTabs>('overview')

    if (loading) {
        return <Loading />
    }

    if (error) {
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
                        <ProfileSidebar tab={tab} setTab={setTab} />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {tab === 'overview' && <ProfileOverview />}
                        {tab === 'listings' && <ProfileListings />}
                    </div>
                </div>
            </div>
        </div>
    )
}