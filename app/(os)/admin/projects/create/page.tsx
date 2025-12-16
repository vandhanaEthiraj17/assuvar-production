'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/Card";
import api from '@/lib/axios';

function CreateProjectContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const saleId = searchParams.get('saleId');
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post('/projects', {
                saleId,
                name,
                endDate
            });
            router.push('/admin/projects');
        } catch (error) {
            console.error(error);
            alert('Failed to create project');
        } finally {
            setIsLoading(false);
        }
    };

    if (!saleId) return <div>Invalid Sale ID</div>;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Project"
                description="Initialize project from sale."
            />

            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Project Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Deadline (End Date)</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isLoading}>
                                Create Project
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function CreateProjectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateProjectContent />
        </Suspense>
    );
}
