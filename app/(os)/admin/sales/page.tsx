'use client';

import Link from "next/link";
import { Plus, Search, Filter, FileText, CheckCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card } from "@/components/os/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";

// Dummy Data
const sales = [
    { id: 'Q-2024-001', customer: "Acme Corp", date: "Dec 12, 2024", value: "$12,500", status: "Sent", type: "Quote" },
    { id: 'Q-2024-002', customer: "Global Tech", date: "Dec 10, 2024", value: "$4,200", status: "Accepted", type: "Quote" },
    { id: 'SO-2024-890', customer: "Nebula Inc", date: "Dec 05, 2024", value: "$8,500", status: "Invoiced", type: "Order" },
    { id: 'SO-2024-889', customer: "Stellar Systems", date: "Nov 28, 2024", value: "$22,000", status: "Paid", type: "Order" },
];

export default function SalesPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Sales & Quotes"
                description="Manage your revenue pipeline from quote to cash."
            >
                <Link href="/admin/sales/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Quote
                    </Button>
                </Link>
            </PageHeader>

            <Card className="p-0">
                <div className="flex items-center justify-between p-4 border-b border-structura-border bg-white rounded-t-xl">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search quotes or orders..."
                            className="h-10 w-full rounded-lg border border-structura-border pl-10 pr-4 text-sm focus:border-structura-blue focus:outline-none focus:ring-1 focus:ring-structura-blue"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Reference ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.map((item) => (
                            <TableRow key={item.id} className="cursor-pointer hover:bg-slate-50">
                                <TableCell className="font-medium text-structura-blue">
                                    <Link href={`/admin/sales/${item.id}`}>
                                        {item.id}
                                    </Link>
                                </TableCell>
                                <TableCell className="font-medium text-structura-black">{item.customer}</TableCell>
                                <TableCell className="text-slate-500">{item.date}</TableCell>
                                <TableCell>
                                    <span className="flex items-center gap-2 text-sm text-slate-600">
                                        {item.type === 'Quote' ? <FileText className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                        {item.type}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={item.status} />
                                </TableCell>
                                <TableCell className="text-right font-bold text-structura-black">{item.value}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/sales/${item.id}`}>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
