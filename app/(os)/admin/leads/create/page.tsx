'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/Card";
import api from '@/lib/axios';

export default function CreateLeadPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        source: '',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post('/leads', formData);
            router.push('/admin/leads');
        } catch (error: any) {
            console.error(error);
            alert(`Failed to create lead: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Create New Lead"
                description="Enter lead details manually."
            />

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Lead Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
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
                                <label className="text-sm font-medium">Source</label>
                                <input
                                    name="source"
                                    required
                                    placeholder="e.g. Website, Referral"
                                    className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Notes</label>
                            <textarea
                                name="notes"
                                className="w-full h-24 rounded-md border border-slate-300 p-3 bg-white"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isLoading}>
                                Create Lead
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
