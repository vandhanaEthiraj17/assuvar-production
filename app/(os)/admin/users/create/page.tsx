'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/Card";
import api from '@/lib/axios';

export default function CreateUserPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'employee'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post('/auth/register', formData);
            alert('User invited/created successfully');
            router.push('/admin/users');
        } catch (error: any) {
            console.error(error);
            alert(`Failed to create user: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Invite User"
                description="Create a new account for an employee, partner, or client."
            />

            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <select
                                name="role"
                                className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                                <option value="client">Client</option>
                                <option value="partner">Partner</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                                name="name"
                                required
                                className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone</label>
                            <input
                                name="phone"
                                required
                                className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Set Password (Invite will be sent)</label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="Temporary password"
                                className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isLoading}>
                                Send Invite
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
