'use client';

import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Globe,
    User,
    Edit,
    Trash2,
    FileText
} from 'lucide-react';
import { PageHeader } from '@/components/os/ui/PageHeader';
import { Button } from '@/components/os/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/os/ui/Card';
import { StatusBadge } from '@/components/os/ui/StatusBadge';
import { use, useEffect, useState } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [lead, setLead] = useState<any>(null);
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [leadRes, quotesRes] = await Promise.all([
                api.get(`/leads`), // Fetch all (inefficient but API limited) and find. Or allow get /leads/:id if implemented? 
                // Wait, Controller for getLeads returns all. Controller for updateLeadStatus also uses ID. 
                // Did I implement GET /leads/:id?
                // Looking at my backend code... leadRoutes.js: router.route('/').post(...).get(...)
                // It does NOT have /:id GET.
                // It only has /:id/status PUT.
                // So I MUST fetch all and find. Phase 1 limitation.
                api.get('/quotes')
            ]);

            const foundLead = leadRes.data.find((l: any) => l._id === id);
            setLead(foundLead);

            // Filter quotes for this lead
            setQuotes(quotesRes.data.filter((q: any) => q.leadId?._id === id || q.leadId === id));

        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptQuote = async (quoteId: string) => {
        if (!confirm("Are you sure you want to accept this quote?")) return;
        try {
            await api.put(`/quotes/${quoteId}/status`, { status: "ACCEPTED" });
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Failed to update status");
        }
    }

    if (loading) return <div>Loading...</div>;
    if (!lead) return <div>Lead not found</div>;

    return (
        <div className="space-y-6">
            <PageHeader
                title={lead.name}
                description="Lead Details & History"
            >
                <div className="flex gap-2">
                    <Link href={`/admin/quotes/create?leadId=${id}`}>
                        <Button>
                            <FileText className="mr-2 h-4 w-4" />
                            Create Quote
                        </Button>
                    </Link>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Profile & Contact Info */}
                <div className="space-y-6 lg:col-span-1">

                    {/* Lead Status Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="h-20 w-20 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                                    <Building2 className="h-10 w-10 text-slate-400" />
                                </div>
                                <h2 className="text-xl font-bold font-display text-structura-black">{lead.name}</h2>
                                <p className="text-sm text-slate-500 mt-1">{lead.source}</p>

                                <div className="mt-6 flex gap-2 w-full">
                                    <StatusBadge status={lead.status} className="justify-center w-full py-2 text-sm" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contacts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Contact Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col gap-1 pb-4">
                                <div className="space-y-1">
                                    <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-structura-blue">
                                        <Mail className="h-3 w-3" /> {lead.email}
                                    </a>
                                    <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-structura-blue">
                                        <Phone className="h-3 w-3" /> {lead.phone}
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* RIGHT COLUMN: Activity & Quotes */}
                <div className="space-y-6 lg:col-span-2">

                    {/* Quotes Section */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base">Quotations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {quotes.length === 0 ? (
                                <p className="text-sm text-slate-500">No quotes yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {quotes.map((quote) => (
                                        <div key={quote._id} className="border p-4 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{quote.serviceDescription}</p>
                                                <p className="text-sm text-slate-500">Amount: ${quote.amount}</p>
                                                <StatusBadge status={quote.status} />
                                            </div>
                                            <div>
                                                {quote.status === 'SENT' || quote.status === 'DRAFT' ? (
                                                    <Button size="sm" onClick={() => handleAcceptQuote(quote._id)}>
                                                        Mark Accepted
                                                    </Button>
                                                ) : quote.status === 'ACCEPTED' ? (
                                                    <Link href={`/admin/sales/create?quoteId=${quote._id}`}>
                                                        <Button size="sm" variant="outline">
                                                            Convert to Sale
                                                        </Button>
                                                    </Link>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
