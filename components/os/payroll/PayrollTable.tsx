import { cn } from "@/lib/utils";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import { Button } from "@/components/os/ui/Button";
import { DollarSign } from "lucide-react";

export interface PayrollEntry {
    id: string;
    employee: string;
    role: string;
    eligibleAmount: string;
    heldAmount: string;
    status: 'approved' | 'paid' | 'on_hold' | 'pending';
    month: string;
}

interface PayrollTableProps {
    entries: PayrollEntry[];
    onAction?: (id: string, action: 'pay' | 'approve') => void;
}

export function PayrollTable({ entries, onAction }: PayrollTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Eligible Amount</TableHead>
                    <TableHead className="text-right text-amber-600">Held Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {entries.map((entry) => (
                    <TableRow key={entry.id}>
                        <TableCell className="font-medium text-structura-black">{entry.employee}</TableCell>
                        <TableCell className="text-slate-500">{entry.role}</TableCell>
                        <TableCell className="text-right font-bold text-structura-black">{entry.eligibleAmount}</TableCell>
                        <TableCell className="text-right text-amber-600">{entry.heldAmount}</TableCell>
                        <TableCell>
                            <StatusBadge status={entry.status.replace('_', ' ')} />
                        </TableCell>
                        <TableCell className="text-right">
                            {entry.status === 'approved' && (
                                <Button size="sm" onClick={() => onAction?.(entry.id, 'pay')}>
                                    <DollarSign className="mr-2 h-3 w-3" />
                                    Mark Paid
                                </Button>
                            )}
                            {entry.status === 'pending' && (
                                <Button size="sm" variant="outline" onClick={() => onAction?.(entry.id, 'approve')}>
                                    Approve Run
                                </Button>
                            )}
                            {entry.status === 'paid' && (
                                <span className="text-xs text-slate-400">Paid out</span>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
