'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/Card";
import { Button } from "@/components/os/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

export default function ClientLoginPage() {
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

            if (res.data.role !== 'client') {
                setError('Access denied. Client portal only.');
                setIsLoading(false);
                return;
            }

            Cookies.set('token', res.data.token, { expires: 30, path: '/' });
            router.push('/client');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-structura-border/60 shadow-xl backdrop-blur-sm bg-white/80">
            <CardHeader className="text-center pb-2">
                <CardTitle>Client Portal</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Manage your services.</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded">{error}</div>}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="email"
                                placeholder="client@example.com"
                                className="h-10 w-full rounded-lg border border-structura-border pl-10 pr-4 text-sm"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="h-10 w-full rounded-lg border border-structura-border pl-10 pr-4 text-sm"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        Sign In as Client
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
