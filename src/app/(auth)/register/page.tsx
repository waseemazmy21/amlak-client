'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { handleError } from '@/lib/utils';
import useAuth from '@/hooks/useAuth';
import { register as registerUser } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { RegisterFormData, registerSchema } from '@/lib/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';


export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { setUser } = useAuth();
    const [error, setError] = useState('');
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });
    const router = useRouter()

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        setError('');
        try {
            const res = await registerUser(data);
            console.log(res.data)
            setUser(res.data.data.user)
            router.push('/home')
        } catch (err: unknown) {
            setError(handleError(err));
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <Card className="border-0 w-full shadow-none">
                <CardHeader className="text-center pb-6 flex flex-col items-center ">
                    {/* Header */}
                    <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                            <Home className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            RealEstate
                        </span>
                    </Link>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Create Account</CardTitle>
                    <p className="text-muted-foreground">Join our platform to find your dream property</p>                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className='grid md:grid-cols-2 gap-4'>
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
                                        {...register("fullName")}
                                        className="pl-10 h-12"
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
                                        className="pl-10 h-12"
                                    />
                                </div>
                                {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input id="phone" placeholder="+1557119734" className="pl-10 h-12" {...register("phone")} />
                                </div>
                                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                            </div>

                            {/* Empty div for layout*/}
                            <div></div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio (Optional)</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us a bit about yourself..."
                                rows={3}
                                {...register("bio")}
                            />
                            {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
                        </div>


                        <div className="grid md:grid-cols-2 gap-4">
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
                                        {...register('password')}
                                        className="pl-10 h-12"
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
                                        {...register('confirmPassowrd', {
                                            required: 'Please confirm your password',
                                            validate: (value) => value === watch('password') || 'Passwords do not match',
                                        })}
                                        className="pl-10 h-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassowrd && <span className="text-red-500 text-xs">{errors.confirmPassowrd.message as string}</span>}
                            </div>

                        </div>

                        {/* Form Error Message */}
                        {error && <div className="text-red-500 text-center text-sm">{error}</div>}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? 'Creating Account...' : (<><span>Create Account</span><ArrowRight className="ml-2 h-5 w-5" /></>)}
                        </Button>
                    </form>

                    {/* Sign In Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:text-primary/90 font-medium">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}