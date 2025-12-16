'use client';

import { useState } from 'react';
import { Save, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/os/ui/PageHeader';
import { Button } from '@/components/os/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/os/ui/Card';
import { QuoteLineItems, LineItem } from '@/components/os/sales/QuoteLineItems';

export default function CreateQuotePage() {
    const [items, setItems] = useState<LineItem[]>([
        { id: '1', description: 'Consultation Fee', quantity: 1, unitPrice: 150, total: 150 }
    ]);
    const [customer, setCustomer] = useState('');

    const handleSave = () => {
        // Save logic placeholder
        console.log("Saving quote...", { customer, items });
        // Redirect logic would go here
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <Link href="/admin/sales" className="text-slate-500 hover:text-structura-black">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold font-display text-structura-black">New Quote</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Quote Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Client Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Customer / Lead</label>
                                <select
                                    className="w-full h-10 rounded-lg border border-structura-border bg-white px-3 text-sm focus:border-structura-blue focus:ring-1 focus:ring-structura-blue"
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                >
                                    <option value="">Select a customer...</option>
                                    <option value="acme">Acme Corp</option>
                                    <option value="global">Global Tech</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Quote Date</label>
                                    <input type="date" className="w-full h-10 rounded-lg border border-structura-border px-3 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Valid Until</label>
                                    <input type="date" className="w-full h-10 rounded-lg border border-structura-border px-3 text-sm" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Line Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <QuoteLineItems
                                items={items}
                                isEditable={true}
                                onItemsChange={setItems}
                                currency="$"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Summary & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Subtotal</span>
                                <span className="font-medium text-structura-black">$150.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Tax (10%)</span>
                                <span className="font-medium text-structura-black">$15.00</span>
                            </div>
                            <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                                <span className="font-bold text-structura-black">Total</span>
                                <span className="text-xl font-bold text-structura-blue">$165.00</span>
                            </div>

                            <div className="pt-4 space-y-3">
                                <Button className="w-full" onClick={handleSave}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save & Create
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Preview PDF
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
