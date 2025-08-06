'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { handleError } from '@/lib/utils';
import useAuth from '@/hooks/useAuth';
import { login, LoginRequest } from '@/service/auth';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>();
    const router = useRouter()

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        setError('');
        try {
            const res = await login(data);
            setUser(res.data.data.user)
            router.push('/home')
        } catch (err: any) {
            setError(handleError(err));
        }
    };

    return (
        <Card className="bg-white shadow-2xl border-0 w-full max-w-md">
            <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</CardTitle>
                <p className="text-gray-600">Login in to your account to continue</p>
            </CardHeader>

            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                {...register('password', { required: 'Password is required' })}
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

                    {/* Error Message */}
                    {error && <div className="text-red-500 text-center text-sm">{error}</div>}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-primary hover:bg-primary/90  text-white font-semibold shadow-lg hover:shadow-xl transform"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logining In...' : (<><span>Login In</span><ArrowRight className="ml-2 h-5 w-5" /></>)}
                    </Button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary font-medium">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}