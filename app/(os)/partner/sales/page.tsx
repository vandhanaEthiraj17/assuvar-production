'use client';

import { PageHeader } from "@/components/os/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import { DollarSign } from "lucide-react";

const sales = [
    { id: 'ORD-001', customer: 'Acme Corp', amount: '$15,000', commission: '$1,500', status: 'Paid', date: 'Dec 10, 2024' },
    { id: 'ORD-003', customer: 'Stellar Systems', amount: '$8,500', commission: '$850', status: 'Pending', date: 'Dec 12, 2024' },
];

export default function PartnerSalesPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Sales & Commissions"
                description="Track your successful conversions and earnings."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-structura-black text-white border-none">
                    <CardContent className="p-6">
                        <p className="text-slate-400 text-sm font-medium uppercase">Total Commissions Earned</p>
                        <p className="text-3xl font-bold font-display mt-2">$2,350</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-slate-500 text-sm font-medium uppercase">Pending User Payment</p>
                        <p className="text-3xl font-bold font-display mt-2 text-amber-600">$850</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Recent Converted Sales</CardTitle>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Sale Amount</TableHead>
                            <TableHead>Your Commission</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell className="font-medium text-structura-black">{sale.customer}</TableCell>
                                <TableCell>{sale.amount}</TableCell>
                                <TableCell className="font-bold text-green-600">{sale.commission}</TableCell>
                                <TableCell><StatusBadge status={sale.status} /></TableCell>
                                <TableCell className="text-right text-slate-500">{sale.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
