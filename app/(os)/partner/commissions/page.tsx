'use client';

import { PageHeader } from "@/components/os/ui/PageHeader";
import { Card, CardContent } from "@/components/os/ui/Card";
import { Button } from "@/components/os/ui/Button";
import { Download } from "lucide-react";

export default function PartnerCommissionsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Commission Statements"
                description="View and download your monthly commission payouts."
            />

            <div className="grid gap-4">
                {[
                    { month: 'November 2024', status: 'Paid', amount: '$1,200', date: 'Dec 01, 2024' },
                    { month: 'October 2024', status: 'Paid', amount: '$950', date: 'Nov 01, 2024' },
                ].map((statement, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-structura-black">{statement.month}</h3>
                                <p className="text-sm text-slate-500">Paid on {statement.date}</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="font-bold text-structura-black">{statement.amount}</span>
                                <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                    {statement.status}
                                </div>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    PDF
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
