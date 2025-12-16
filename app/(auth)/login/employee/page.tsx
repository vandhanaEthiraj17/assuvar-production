'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/Card";
import { Button } from "@/components/os/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

export default function EmployeeLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/login', { email, password });

            if (res.data.role !== 'employee') {
                setError('Access denied. Employee portal only.');
                setIsLoading(false);
                return;
            }

            // Store Token
            Cookies.set('token', res.data.token, { expires: 30 }); // 30 days

            // Redirect
            router.push('/employee/dashboard'); // Prompt says /employee/dashboard
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-structura-border/60 shadow-xl backdrop-blur-sm bg-white/80">
            <CardHeader className="text-center pb-2">
                <CardTitle>Employee Portal</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Sign in to view your tasks</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-structura-black">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="email"
                                placeholder="name@assuvar.com"
                                className="h-10 w-full rounded-lg border border-structura-border pl-10 pr-4 text-sm focus:border-structura-blue focus:outline-none focus:ring-1 focus:ring-structura-blue bg-white"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-structura-black">Password</label>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="h-10 w-full rounded-lg border border-structura-border pl-10 pr-4 text-sm focus:border-structura-blue focus:outline-none focus:ring-1 focus:ring-structura-blue bg-white"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Sign In as Employee
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
