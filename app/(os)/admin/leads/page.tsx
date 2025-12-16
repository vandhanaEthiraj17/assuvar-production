'use client';

import { Suspense } from 'react';
import Link from "next/link";
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit } from "lucide-react";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card, CardContent } from "@/components/os/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";

// Dummy Data
const leads = [
    { id: 1, name: "Acme Corp", contact: "John Doe", email: "john@acme.com", source: "Website", status: "New", assignedTo: "Alice Smith", lastContact: "2 days ago" },
    { id: 2, name: "Global Tech", contact: "Jane Smith", email: "jane@global.com", source: "Referral", status: "Contacted", assignedTo: "Bob Jones", lastContact: "1 hour ago" },
    { id: 3, name: "Stellar Systems", contact: "Mike Brown", email: "mike@stellar.com", source: "LinkedIn", status: "Qualified", assignedTo: "Alice Smith", lastContact: "5 mins ago" },
    { id: 4, name: "Nebula Inc", contact: "Sarah Wilson", email: "sarah@nebula.com", source: "Cold Call", status: "Negotiation", assignedTo: "Charlie Day", lastContact: "1 week ago" },
    { id: 5, name: "Quantum Soft", contact: "David Lee", email: "david@quantum.com", source: "Website", status: "Won", assignedTo: "Bob Jones", lastContact: "3 days ago" },
];

function LeadsContent() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Leads"
                description="Manage your sales pipeline and track potential opportunities."
            >
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lead
                </Button>
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
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Last Contact</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow key={lead.id} className="cursor-pointer hover:bg-slate-50">
                                <TableCell className="font-medium text-structura-black">
                                    <Link href={`/admin/leads/${lead.id}`} className="hover:underline hover:text-structura-blue block">
                                        {lead.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{lead.contact}</span>
                                        <span className="text-xs text-slate-500">{lead.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{lead.source}</TableCell>
                                <TableCell>
                                    <StatusBadge status={lead.status} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                                            {lead.assignedTo.charAt(0)}
                                        </div>
                                        <span className="text-sm">{lead.assignedTo}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500">{lead.lastContact}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/leads/${lead.id}`}>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
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
