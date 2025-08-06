"use client";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';

export type UpdateProfileRequest = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
};

export default function UpdateProfilePage() {
    const { user, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<UpdateProfileRequest>({
        defaultValues: {
            fullName: user?.fullName || '',
            email: user?.email || '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit: SubmitHandler<UpdateProfileRequest> = async (data) => {
        setError('');
        try {
            // setUser({ ...user, ...data });
            router.push('/home/profile');
        } catch (err: any) {
            setError('Failed to update profile.');
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex justify-center items-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Update Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Enter your name"
                                        {...register('fullName', { required: 'Name is required' })}
                                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message as string}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register('email', { required: 'Email is required' })}
                                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create password"
                                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                        className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-red-500 text-xs">{errors.password.message as string}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm password"
                                        {...register('confirmPassword', {
                                            required: 'Please confirm your password',
                                            validate: (value) => value === watch('password') || 'Passwords do not match',
                                        })}
                                        className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message as string}</span>}
                            </div>
                            {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? 'Updating...' : (<><span>Update</span><ArrowRight className="ml-2 h-5 w-5" /></>)}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    );
}