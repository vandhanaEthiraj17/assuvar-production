'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from "next/link";
import { Plus, Search, Filter, MoreHorizontal, Eye } from "lucide-react";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card } from "@/components/os/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import api from '@/lib/axios';

function LeadsContent() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await api.get('/leads');
            setLeads(res.data);
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Leads"
                description="Manage your sales pipeline and track potential opportunities."
            >
                <Link href="/admin/leads/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lead
                    </Button>
                </Link>
            </PageHeader>

            <Card className="p-0">
                <div className="flex items-center justify-between p-4 border-b border-structura-border bg-white rounded-t-xl">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="h-10 w-full rounded-lg border border-structura-border pl-10 pr-4 text-sm focus:border-structura-blue focus:outline-none focus:ring-1 focus:ring-structura-blue"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm">
                            Export
                        </Button>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Lead Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">Loading...</TableCell>
                            </TableRow>
                        ) : leads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">No leads found.</TableCell>
                            </TableRow>
                        ) : (
                            leads.map((lead) => (
                                <TableRow key={lead._id} className="cursor-pointer hover:bg-slate-50">
                                    <TableCell className="font-medium text-structura-black">
                                        <Link href={`/admin/leads/${lead._id}`} className="hover:underline hover:text-structura-blue block">
                                            {lead.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{lead.phone}</span>
                                            <span className="text-xs text-slate-500">{lead.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{lead.source}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={lead.status} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/leads/${lead._id}`}>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

export default function LeadsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LeadsContent />
        </Suspense>
    );
}
