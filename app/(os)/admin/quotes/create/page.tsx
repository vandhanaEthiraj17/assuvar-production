'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/Card";
import api from '@/lib/axios';

function CreateQuoteContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        serviceDescription: '',
        amount: '',
        validityDate: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post('/quotes', {
                leadId,
                ...formData,
                amount: Number(formData.amount)
            });
            // Update status? The backend might handle it.
            // Prompt says: "Create Quote... Quote status shown in UI"
            router.push(`/admin/leads/${leadId}`);
        } catch (error) {
            console.error(error);
            alert('Failed to create quote');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (!leadId) return <div>Inavlid Lead ID</div>;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Quotation"
                description="generate a quote for this lead."
            />

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Quote Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Service Description</label>
                            <textarea
                                name="serviceDescription"
                                required
                                className="w-full h-24 rounded-md border border-slate-300 p-3 bg-white"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Amount</label>
                                <input
                                    name="amount"
                                    type="number"
                                    required
                                    className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Validity Date</label>
                                <input
                                    name="validityDate"
                                    type="date"
                                    required
                                    className="w-full h-10 rounded-md border border-slate-300 px-3 bg-white"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isLoading}>
                                Generate Quote
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function CreateQuotePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateQuoteContent />
        </Suspense>
    );
}
