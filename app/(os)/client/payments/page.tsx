'use client';

import { PageHeader } from "@/components/os/ui/PageHeader";
import { Card, CardContent } from "@/components/os/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import { Download } from "lucide-react";
import { Button } from "@/components/os/ui/Button";

const payments = [
    { id: 'INV-001', description: "Project Deposit (50%)", amount: "$7,500.00", status: "Paid", date: "Dec 01, 2024" },
    { id: 'INV-002', description: "Milestone Release 1", amount: "$3,000.00", status: "Pending", date: "Due Dec 20, 2024" },
];

export default function ClientPaymentsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Payments & Invoices"
                description="View payment history and download invoices."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-structura-black text-white">
                    <CardContent className="p-6">
                        <p className="text-slate-400 text-sm font-medium uppercase">Total Paid</p>
                        <p className="text-3xl font-bold font-display mt-2">$7,500.00</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-slate-500 text-sm font-medium uppercase">Outstanding Balance</p>
                        <p className="text-3xl font-bold font-display mt-2 text-structura-blue">$3,000.00</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell className="font-medium text-structura-black">{payment.id}</TableCell>
                                <TableCell>{payment.description}</TableCell>
                                <TableCell className="font-bold">{payment.amount}</TableCell>
                                <TableCell><StatusBadge status={payment.status} /></TableCell>
                                <TableCell className="text-slate-500">{payment.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4 text-slate-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
