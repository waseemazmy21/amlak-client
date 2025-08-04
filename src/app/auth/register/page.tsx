'use client';

import { useState } from 'react';
import { set, SubmitHandler, useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { handleError } from '@/lib/utils';
import useAuth from '@/hooks/useAuth';
import { register as registerUser, RegisterRequest } from '@/service/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { setUser } = useAuth();
    const [error, setError] = useState('');
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<RegisterRequest>();
    const router = useRouter()

    const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
        setError('');
        try {
            const res = await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password
            });
            setUser(res.data.data.user)
            router.push('/home')
        } catch (err: any) {
            console.log(err.response.data.errors)
            setError(handleError(err));
        }
    };

    return (
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 w-full max-w-md">
            <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Create Account</CardTitle>
                <p className="text-gray-600">Join Amlak to find your perfect property</p>
            </CardHeader>

            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
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

                    {/* Email Field */}
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

                    {/* Password Fields */}

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

                    {/* Error Message */}
                    {error && <div className="text-red-500 text-center text-sm">{error}</div>}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? 'Creating Account...' : (<><span>Create Account</span><ArrowRight className="ml-2 h-5 w-5" /></>)}
                    </Button>
                </form>

                {/* Sign In Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>

    );
}