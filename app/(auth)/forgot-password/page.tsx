'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/Card";
import { Button } from "@/components/os/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 1500);
    };

    if (isSent) {
        return (
            <Card className="border-structura-border/60 shadow-xl backdrop-blur-sm bg-white/80">
                <CardContent className="pt-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-structura-black mb-2">Check your inbox</h3>
                    <p className="text-sm text-slate-500 mb-6">
                        We've sent a password recovery link to your email address. It may take a few minutes to arrive.
                    </p>
                    <Link href="/login">
                        <Button variant="outline" className="w-full">
                            Back to Login
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-structura-border/60 shadow-xl backdrop-blur-sm bg-white/80">
            <CardHeader className="text-center pb-2">
                <CardTitle>Reset Password</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Enter your email to receive recovery instructions</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-structura-black">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="h-10 w-full rounded-lg border border-structura-border pl-10 pr-4 text-sm focus:border-structura-blue focus:outline-none focus:ring-1 focus:ring-structura-blue bg-white"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Send Recovery Link
                    </Button>

                    <div className="text-center">
                        <Link href="/login" className="inline-flex items-center text-xs text-slate-500 hover:text-structura-black transition-colors">
                            <ArrowLeft className="mr-1 h-3 w-3" />
                            Back to Login
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
