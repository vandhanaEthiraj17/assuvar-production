'use client';

import {
    FileText,
    Send,
    CheckCircle,
    Download,
    Printer,
    MoreHorizontal
} from 'lucide-react';
import { PageHeader } from '@/components/os/ui/PageHeader';
import { Button } from '@/components/os/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/os/ui/Card';
import { StatusBadge } from '@/components/os/ui/StatusBadge';
import { QuoteLineItems } from '@/components/os/sales/QuoteLineItems';
import { PaymentTimeline } from '@/components/os/sales/PaymentTimeline';
import { use } from 'react';

// Dummy Data
const saleData = {
    id: 'SO-2024-889',
    customer: "Stellar Systems",
    date: "Nov 28, 2024",
    status: "Accepted", // Quote -> Accepted -> Invoiced -> Paid
    subtotal: 20000,
    tax: 2000,
    total: 22000,
    items: [
        { id: '1', description: 'Enterprise License - Annual', quantity: 1, unitPrice: 15000, total: 15000 },
        { id: '2', description: 'Implementation Services', quantity: 40, unitPrice: 125, total: 5000 }
    ]
};

const payments = [
    { label: 'Deposit (50%)', amount: '$11,000', dueDate: 'Nov 28, 2024', status: 'paid' as const, paidDate: 'Nov 29, 2024' },
    { label: 'Final Payment', amount: '$11,000', dueDate: 'Dec 28, 2024', status: 'pending' as const },
];

export default function SaleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const isQuote = saleData.status === 'Sent' || saleData.status === 'Draft';

    return (
        <div className="space-y-6">
            <PageHeader
                title={isQuote ? `Quote ${id}` : `Order ${id}`}
                description={`Customer: ${saleData.customer} • Date: ${saleData.date}`}
            >
                <div className="flex gap-2">
                    {!isQuote && (
                        <StatusBadge status={saleData.status} className="h-9 px-4 text-sm" />
                    )}
                    <Button variant="outline">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                    {isQuote && (
                        <Button>
                            <Send className="mr-2 h-4 w-4" />
                            Send Quote
                        </Button>
                    )}
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Quote/Order Document */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="min-h-[600px] border-t-4 border-t-structura-blue">
                        <CardContent className="p-8 space-y-8">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-structura-black">Assuvar</h2>
                                    <p className="text-slate-500 text-sm mt-1">123 Tech Park, Innovation City</p>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">{isQuote ? 'Quote' : 'Invoice'}</h3>
                                    <p className="text-structura-black font-medium mt-1">#{id}</p>
                                </div>
                            </div>

                            {/* Bill To */}
                            <div className="grid grid-cols-2 gap-8 pt-6">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Bill To</p>
                                    <p className="font-bold text-structura-black">{saleData.customer}</p>
                                    <p className="text-sm text-slate-600">789 Business Rd, Corp Town</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex justify-end gap-8">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Date</p>
                                            <p className="font-medium text-structura-black">{saleData.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Amount Due</p>
                                            <p className="font-medium text-structura-black">${saleData.total.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Line Items */}
                            <div className="pt-4">
                                <QuoteLineItems items={saleData.items} />
                            </div>

                            {/* Footer / Notes */}
                            <div className="pt-8 border-t border-slate-100">
                                <p className="text-sm text-slate-500">
                                    <strong>Notes:</strong> Thank you for your business. Please process payment within 30 days.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Actions & status */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Payment Timeline (Only active if not draft) */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Payment Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PaymentTimeline milestones={payments} />
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <Send className="mr-2 h-4 w-4" />
                                Email Invoice
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="mr-2 h-4 w-4" />
                                View Contract
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50">
                                <MoreHorizontal className="mr-2 h-4 w-4" />
                                Cancel Order
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
