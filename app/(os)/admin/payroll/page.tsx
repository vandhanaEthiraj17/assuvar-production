'use client';

import { useState } from 'react';
import { DollarSign, Download, Calendar } from 'lucide-react';
import { PageHeader } from '@/components/os/ui/PageHeader';
import { Button } from '@/components/os/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/os/ui/Card';
import { PayrollTable, PayrollEntry } from '@/components/os/payroll/PayrollTable';

// Dummy Data
const initialPayroll: PayrollEntry[] = [
    { id: '1', employee: "Alice Smith", role: "Senior Dev", eligibleAmount: "$3,000", heldAmount: "$0", status: "approved", month: "Dec 2024" },
    { id: '2', employee: "Bob Jones", role: "Designer", eligibleAmount: "$4,500", heldAmount: "$1,000", status: "pending", month: "Dec 2024" },
    { id: '3', employee: "Charlie Day", role: "Developer", eligibleAmount: "$2,500", heldAmount: "$2,500", status: "on_hold", month: "Dec 2024" },
];

export default function PayrollPage() {
    const [payrollData, setPayrollData] = useState<PayrollEntry[]>(initialPayroll);

    const handleAction = (id: string, action: 'pay' | 'approve') => {
        console.log(`Payroll action: ${action} for ${id}`);

        setPayrollData(prev => prev.map(entry => {
            if (entry.id === id) {
                if (action === 'pay') return { ...entry, status: 'paid' };
                if (action === 'approve') return { ...entry, status: 'approved' };
            }
            return entry;
        }));
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Payroll"
                description="Manage employee compensation and project payouts."
            >
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Dec 2024
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-structura-black text-white border-none">
                    <CardContent className="p-6">
                        <p className="text-slate-400 text-sm font-medium uppercase">Total Payout Pending</p>
                        <p className="text-3xl font-bold font-display mt-2">$7,500</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-slate-500 text-sm font-medium uppercase">Approved to Pay</p>
                        <p className="text-3xl font-bold font-display mt-2 text-green-600">$3,000</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-slate-500 text-sm font-medium uppercase">On Hold (Milestones)</p>
                        <p className="text-3xl font-bold font-display mt-2 text-amber-600">$3,500</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">December 2024 Run</CardTitle>
                </CardHeader>
                <CardContent>
                    <PayrollTable
                        entries={payrollData}
                        onAction={handleAction}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
